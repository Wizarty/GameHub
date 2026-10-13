// GameHub Social & Chat Manager (with i18n support, In-Game Overlay, & @Mention Direct Messaging)
class GameHubChat {
  constructor() {
    this.activeTab = 'global';
    this.openTabs = new Set(['global']);
    this.chatHistories = new Map();
    this.unreadCounts = new Map();
    this.playersMap = new Map();
    this.cachedPlayersList = [];

    // Main Chat Elements
    this.chatContainer = null;
    this.tabsContainer = null;
    this.inputField = null;
    this.playersContainer = null;
    this.chatMentionDropdown = null;

    // In-Game Overlay Chat Elements
    this.inGameDrawer = null;
    this.inGameMessagesContainer = null;
    this.inGameTabsContainer = null;
    this.inGameInputField = null;
    this.inGameSendBtn = null;
    this.inGameCloseBtn = null;
    this.inGameBadge = null;
    this.inGameToggleBtn = null;
    this.inGameMentionDropdown = null;
    this.inGameUnreadCount = 0;

    // Mention state
    this.filteredMentionPlayers = [];
    this.mentionHighlightedIndex = 0;
  }

  init() {
    this.chatContainer = document.getElementById('chatMessagesContainer');
    this.tabsContainer = document.getElementById('chatTabsBar');
    this.inputField = document.getElementById('chatInputField');
    this.playersContainer = document.getElementById('onlinePlayersList');
    this.chatMentionDropdown = document.getElementById('chatMentionDropdown');

    this.inGameDrawer = document.getElementById('inGameChatDrawer');
    this.inGameMessagesContainer = document.getElementById('inGameChatMessages');
    this.inGameTabsContainer = document.getElementById('inGameChatTabs');
    this.inGameInputField = document.getElementById('inGameChatInput');
    this.inGameSendBtn = document.getElementById('btnSendInGameChat');
    this.inGameCloseBtn = document.getElementById('btnCloseInGameChat');
    this.inGameBadge = document.getElementById('inGameChatBadge');
    this.inGameToggleBtn = document.getElementById('btnToggleInGameChat');
    this.inGameMentionDropdown = document.getElementById('inGameMentionDropdown');

    this.chatHistories.set('global', []);

    // Setup main chat input listeners
    if (this.inputField) {
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          // If mention dropdown is not open, send message
          if (this.chatMentionDropdown && this.chatMentionDropdown.classList.contains('hidden')) {
            e.preventDefault();
            this.sendMessage();
          }
        }
      });
    }

    const sendBtn = document.getElementById('btnChatSend');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }

    const quickInviteBtn = document.getElementById('btnQuickInviteTool');
    if (quickInviteBtn) {
      quickInviteBtn.addEventListener('click', () => {
        if (this.activeTab === 'global') {
          alert(window.i18n.t('invite.select_target_alert'));
        } else {
          window.gameHubCatalog.openInviteModalForPlayer(this.activeTab);
        }
      });
    }

    // Setup in-game overlay input listeners
    if (this.inGameInputField) {
      const stopProp = (e) => e.stopPropagation();
      this.inGameInputField.addEventListener('keydown', (e) => {
        stopProp(e);
        if (e.key === 'Enter') {
          if (this.inGameMentionDropdown && this.inGameMentionDropdown.classList.contains('hidden')) {
            e.preventDefault();
            this.sendInGameMessage();
          }
        } else if (e.key === 'Escape') {
          if (this.inGameMentionDropdown && !this.inGameMentionDropdown.classList.contains('hidden')) {
            e.preventDefault();
            this.inGameMentionDropdown.classList.add('hidden');
          } else {
            e.preventDefault();
            this.closeInGameDrawer();
          }
        }
      });
      this.inGameInputField.addEventListener('keyup', stopProp);
      this.inGameInputField.addEventListener('keypress', stopProp);
    }

    if (this.inGameSendBtn) {
      this.inGameSendBtn.onclick = (e) => {
        if (e) e.preventDefault();
        this.sendInGameMessage();
      };
    }

    // Toggle button in HUD
    this.inGameToggleBtn = document.getElementById('btnToggleInGameChat');
    if (this.inGameToggleBtn) {
      this.inGameToggleBtn.onclick = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        this.toggleInGameDrawer();
      };
    }

    // Close button in drawer header
    this.inGameCloseBtn = document.getElementById('btnCloseInGameChat');
    if (this.inGameCloseBtn) {
      this.inGameCloseBtn.onclick = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        this.closeInGameDrawer();
      };
    }

    // Global keyboard listener (Escape to close, F2 or ` to toggle)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isInGameDrawerOpen()) {
        this.closeInGameDrawer();
      } else if (e.key === 'F2' || e.key === '`') {
        const vp = document.getElementById('gameViewportWrapper');
        if (vp && !vp.classList.contains('hidden') && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
          e.preventDefault();
          this.toggleInGameDrawer();
        }
      }
    });

    // Pre-populate players cache for @mentions
    this.loadFallbackPlayers();

    // Setup @mention autocompletion on both inputs
    if (this.inputField && this.chatMentionDropdown) {
      this.setupMentionAutocomplete(this.inputField, this.chatMentionDropdown);
    }
    if (this.inGameInputField && this.inGameMentionDropdown) {
      this.setupMentionAutocomplete(this.inGameInputField, this.inGameMentionDropdown);
    }

    // Connect to Socket events
    window.hubSocket.on('chat:global', (msg) => {
      this.addMessageToHistory('global', msg);
    });

    window.hubSocket.on('chat:private', (msg) => {
      const partnerId = msg.sender.id;
      this.ensureTab(partnerId, msg.sender.nickname);
      this.addMessageToHistory(partnerId, msg);
    });

    window.hubSocket.on('chat:private_sent', (msg) => {
      const partnerId = msg.recipientId;
      this.ensureTab(partnerId);
      this.addMessageToHistory(partnerId, msg);
    });

    window.hubSocket.on('players:update', (playersList) => {
      this.cachedPlayersList = playersList;
      this.updateOnlinePlayers(playersList);
    });

    window.hubSocket.on('player:ready', ({ recentChat }) => {
      if (recentChat && Array.isArray(recentChat)) {
        this.chatHistories.set('global', recentChat);
        if (this.activeTab === 'global') {
          this.renderMessages();
          this.renderInGameMessages();
        }
      }
    });

    window.addEventListener('languageChanged', () => {
      this.renderTabs();
      this.renderMessages();
      this.renderInGameTabs();
      this.renderInGameMessages();
      if (this.cachedPlayersList.length > 0) {
        this.updateOnlinePlayers(this.cachedPlayersList);
      }
      this.updateInputPlaceholder();
      this.updateInGameInputPlaceholder();
    });

    this.renderTabs();
    this.renderInGameTabs();
    this.updateInputPlaceholder();
    this.updateInGameInputPlaceholder();
  }

  // @Mention Autocomplete Implementation
  setupMentionAutocomplete(inputEl, dropdownEl) {
    if (!inputEl || !dropdownEl) return;

    inputEl.addEventListener('input', () => {
      const val = inputEl.value;
      const cursorPos = inputEl.selectionStart || val.length;
      const textBeforeCursor = val.slice(0, cursorPos);
      const match = textBeforeCursor.match(/@([^\s]*)$/);

      if (match) {
        const query = match[1].toLowerCase();
        const myId = window.hubSocket.player ? window.hubSocket.player.id : null;

        const matchedPlayers = this.cachedPlayersList.filter(p => {
          if (p.id === myId) return false;
          if (!query) return true;
          return p.nickname.toLowerCase().includes(query) || p.id.toLowerCase().includes(query);
        });

        this.filteredMentionPlayers = matchedPlayers;
        this.mentionHighlightedIndex = 0;

        if (matchedPlayers.length > 0) {
          dropdownEl.innerHTML = `
            <div class="chat-mention-header">
              <span>💬 ${window.i18n ? window.i18n.t('social.mention_header') : 'Direct Message (@Player)'}</span>
            </div>
            <div class="chat-mention-list">
              ${matchedPlayers.map((p, idx) => `
                <div class="chat-mention-item ${idx === 0 ? 'active' : ''}" data-player-id="${p.id}" data-index="${idx}">
                  <div class="mention-left">
                    <div class="mention-avatar-small">${getAvatarSvg(p.avatar)}</div>
                    <div class="mention-meta">
                      <span class="mention-nick">${this.escapeHtml(p.nickname)}</span>
                      <span class="mention-id">${p.id}</span>
                    </div>
                  </div>
                  <span class="mention-action-hint">DM ↵</span>
                </div>
              `).join('')}
            </div>
          `;

          dropdownEl.querySelectorAll('.chat-mention-item').forEach(item => {
            item.addEventListener('mousedown', (e) => {
              e.preventDefault();
              e.stopPropagation();
              const pId = item.dataset.playerId;
              const target = this.playersMap.get(pId) || this.cachedPlayersList.find(p => p.id === pId);
              if (target) {
                this.selectMentionPlayer(target, inputEl, dropdownEl, match[0], match.index);
              }
            });
            item.addEventListener('mouseenter', () => {
              dropdownEl.querySelectorAll('.chat-mention-item').forEach(i => i.classList.remove('active'));
              item.classList.add('active');
              this.mentionHighlightedIndex = parseInt(item.dataset.index, 10);
            });
          });

          dropdownEl.classList.remove('hidden');
        } else {
          dropdownEl.innerHTML = `
            <div class="chat-mention-empty">
              <span>${window.i18n ? window.i18n.t('social.no_players_found') : 'No players found'}</span>
            </div>
          `;
          dropdownEl.classList.remove('hidden');
        }
      } else {
        dropdownEl.classList.add('hidden');
      }
    });

    inputEl.addEventListener('keydown', (e) => {
      if (!dropdownEl.classList.contains('hidden')) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          e.stopPropagation();
          this.navigateMention(dropdownEl, 1);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopPropagation();
          this.navigateMention(dropdownEl, -1);
          return;
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          if (this.filteredMentionPlayers && this.filteredMentionPlayers[this.mentionHighlightedIndex]) {
            e.preventDefault();
            e.stopPropagation();
            const val = inputEl.value;
            const cursorPos = inputEl.selectionStart || val.length;
            const match = val.slice(0, cursorPos).match(/@([^\s]*)$/);
            this.selectMentionPlayer(
              this.filteredMentionPlayers[this.mentionHighlightedIndex],
              inputEl,
              dropdownEl,
              match ? match[0] : null,
              match ? match.index : null
            );
            return;
          }
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          dropdownEl.classList.add('hidden');
          return;
        }
      }
    });

    inputEl.addEventListener('blur', () => {
      setTimeout(() => {
        dropdownEl.classList.add('hidden');
      }, 220);
    });
  }

  navigateMention(dropdownEl, delta) {
    const items = dropdownEl.querySelectorAll('.chat-mention-item');
    if (items.length === 0) return;
    items.forEach(i => i.classList.remove('active'));
    this.mentionHighlightedIndex = (this.mentionHighlightedIndex + delta + items.length) % items.length;
    const activeItem = items[this.mentionHighlightedIndex];
    if (activeItem) {
      activeItem.classList.add('active');
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  }

  selectMentionPlayer(player, inputEl, dropdownEl, matchStr, matchIdx) {
    dropdownEl.classList.add('hidden');
    
    // Switch to direct private chat tab with this player!
    this.openDirectChat(player.id, player.nickname);

    // Clean up the @query from input
    const val = inputEl.value;
    if (typeof matchIdx === 'number' && matchStr) {
      const before = val.slice(0, matchIdx);
      const after = val.slice(matchIdx + matchStr.length);
      inputEl.value = (before + after).trim();
    } else {
      inputEl.value = '';
    }

    // Focus input for immediate direct messaging
    setTimeout(() => {
      inputEl.focus();
    }, 60);
  }

  ensureTab(playerId, nickname = null) {
    if (!this.openTabs.has(playerId)) {
      this.openTabs.add(playerId);
      if (!this.chatHistories.has(playerId)) {
        this.chatHistories.set(playerId, []);
      }
      this.renderTabs();
      this.renderInGameTabs();
    }
  }

  openDirectChat(playerId, nickname = null) {
    this.ensureTab(playerId, nickname);
    this.switchTab(playerId);
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    this.unreadCounts.set(tabId, 0);
    this.renderTabs();
    this.renderMessages();
    this.renderInGameTabs();
    this.renderInGameMessages();
    this.updateInputPlaceholder();
    this.updateInGameInputPlaceholder();
  }

  updateInputPlaceholder(shouldFocus = false) {
    if (!this.inputField) return;
    this.inputField.placeholder = this.activeTab === 'global' 
      ? window.i18n.t('social.input_placeholder_global')
      : window.i18n.t('social.input_placeholder_dm', { id: this.activeTab });
    if (shouldFocus) {
      this.inputField.focus();
    }
  }

  updateInGameInputPlaceholder() {
    if (!this.inGameInputField) return;
    this.inGameInputField.placeholder = this.activeTab === 'global' 
      ? window.i18n.t('social.input_placeholder_global')
      : window.i18n.t('social.input_placeholder_dm', { id: this.activeTab });
  }

  closeTab(tabId, event) {
    if (event) event.stopPropagation();
    if (tabId === 'global') return;

    this.openTabs.delete(tabId);
    if (this.activeTab === tabId) {
      this.switchTab('global');
    } else {
      this.renderTabs();
      this.renderInGameTabs();
    }
  }

  renderTabs() {
    if (!this.tabsContainer) return;
    this.tabsContainer.innerHTML = '';

    this.openTabs.forEach(tabId => {
      const btn = document.createElement('button');
      btn.className = `chat-tab chat-tab-btn ${this.activeTab === tabId ? 'active' : ''}`;

      let title = tabId === 'global' ? window.i18n.t('social.global_tab') : `@${tabId}`;
      const unread = this.unreadCounts.get(tabId) || 0;

      let unreadBadge = '';
      if (unread > 0) {
        unreadBadge = `<span class="badge-counter">${unread}</span>`;
      }

      let closeBtn = '';
      if (tabId !== 'global') {
        closeBtn = `<span class="chat-tab-close" title="Close">✕</span>`;
      }

      btn.innerHTML = `<span>${title}</span> ${unreadBadge} ${closeBtn}`;

      btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('chat-tab-close')) {
          this.closeTab(tabId, e);
        } else {
          this.switchTab(tabId);
        }
      });

      this.tabsContainer.appendChild(btn);
    });
  }

  renderInGameTabs() {
    this.inGameTabsContainer = document.getElementById('inGameChatTabs');
    if (!this.inGameTabsContainer) return;
    this.inGameTabsContainer.innerHTML = '';

    this.openTabs.forEach(tabId => {
      const btn = document.createElement('button');
      btn.className = `chat-tab ingame-chat-tab-btn ${this.activeTab === tabId ? 'active' : ''}`;

      let title = tabId === 'global' ? window.i18n.t('social.global_tab') : `@${tabId}`;
      const unread = this.unreadCounts.get(tabId) || 0;

      let unreadBadge = '';
      if (unread > 0) {
        unreadBadge = `<span class="badge-counter">${unread}</span>`;
      }

      let closeBtn = '';
      if (tabId !== 'global') {
        closeBtn = `<span class="chat-tab-close" title="Close">✕</span>`;
      }

      btn.innerHTML = `<span>${title}</span> ${unreadBadge} ${closeBtn}`;

      btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('chat-tab-close')) {
          this.closeTab(tabId, e);
        } else {
          this.switchTab(tabId);
        }
      });

      this.inGameTabsContainer.appendChild(btn);
    });
  }

  addMessageToHistory(tabId, msg) {
    if (!this.chatHistories.has(tabId)) {
      this.chatHistories.set(tabId, []);
    }
    this.chatHistories.get(tabId).push(msg);

    if (this.activeTab === tabId) {
      if (this.chatContainer) {
        this.appendSingleMessage(msg, this.chatContainer);
        this.scrollToBottom(this.chatContainer);
      }

      const inGameMsgContainer = this.inGameMessagesContainer || document.getElementById('inGameChatMessages');
      if (inGameMsgContainer) {
        this.appendSingleMessage(msg, inGameMsgContainer);
        this.scrollToBottom(inGameMsgContainer);
      }
    } else {
      const currentUnread = this.unreadCounts.get(tabId) || 0;
      this.unreadCounts.set(tabId, currentUnread + 1);
      this.renderTabs();
      this.renderInGameTabs();
    }

    // In-game unread counter if game is active and drawer is closed
    const viewport = document.getElementById('gameViewportWrapper');
    const isGameActive = viewport && !viewport.classList.contains('hidden');
    if (isGameActive && !this.isInGameDrawerOpen()) {
      this.inGameUnreadCount++;
      this.updateInGameUnreadBadge();
    }
  }

  renderMessages() {
    if (!this.chatContainer) return;
    this.chatContainer.innerHTML = '';

    const history = this.chatHistories.get(this.activeTab) || [];
    if (history.length === 0) {
      const emptyNote = document.createElement('div');
      emptyNote.className = 'chat-system-message';
      emptyNote.innerText = this.activeTab === 'global' 
        ? window.i18n.t('social.welcome_global') 
        : window.i18n.t('social.dm_intro', { id: this.activeTab });
      this.chatContainer.appendChild(emptyNote);
    } else {
      history.forEach(msg => this.appendSingleMessage(msg, this.chatContainer));
    }
    this.scrollToBottom(this.chatContainer);
  }

  renderInGameMessages() {
    this.inGameMessagesContainer = document.getElementById('inGameChatMessages');
    if (!this.inGameMessagesContainer) return;
    this.inGameMessagesContainer.innerHTML = '';

    const history = this.chatHistories.get(this.activeTab) || [];
    if (history.length === 0) {
      const emptyNote = document.createElement('div');
      emptyNote.className = 'chat-system-message';
      emptyNote.innerText = this.activeTab === 'global' 
        ? window.i18n.t('social.welcome_global') 
        : window.i18n.t('social.dm_intro', { id: this.activeTab });
      this.inGameMessagesContainer.appendChild(emptyNote);
    } else {
      history.forEach(msg => this.appendSingleMessage(msg, this.inGameMessagesContainer));
    }
    this.scrollToBottom(this.inGameMessagesContainer);
  }

  appendSingleMessage(msg, targetContainer = this.chatContainer) {
    if (!targetContainer) return;

    if (msg.type === 'system') {
      const sysDiv = document.createElement('div');
      sysDiv.className = 'chat-system-message';
      sysDiv.innerText = msg.text;
      targetContainer.appendChild(sysDiv);
      return;
    }

    const myId = window.hubSocket.player ? window.hubSocket.player.id : null;
    const isMine = msg.sender && msg.sender.id === myId;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isMine ? 'mine' : ''}`;

    const timeStr = msg.timestamp 
      ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : '';

    const avatarSvg = getAvatarSvg(msg.sender ? msg.sender.avatar : 'avatar-cyber-samurai');

    let inviteWidget = '';
    if (msg.inviteData) {
      inviteWidget = `
        <div class="chat-game-invite-card">
          <div class="chat-invite-title">
            ${window.i18n.t('social.invite_in_chat', { game: `<span class="chat-invite-game-name">${msg.inviteData.gameTitle}</span>` })}
          </div>
          <div style="font-size:0.85rem; color:#94a3b8;">
            ${msg.inviteData.message || ''}
          </div>
          ${!isMine ? `
            <div class="chat-invite-actions">
              <button class="btn-invite-accept" onclick="window.hubSocket.respondToInvite('${msg.inviteData.inviteId}', true)">${window.i18n.t('social.accept_and_play')}</button>
            </div>
          ` : `<div style="font-size:0.75rem; color:var(--neon-cyan);">${window.i18n.t('social.invite_sent_tag')}</div>`}
        </div>
      `;
    }

    bubble.innerHTML = `
      <div class="chat-bubble-avatar">
        ${avatarSvg}
      </div>
      <div class="chat-bubble-content">
        <div class="chat-bubble-header">
          <span class="chat-sender-name">${msg.sender ? msg.sender.nickname : 'Guest'}</span>
          <span class="chat-sender-id">${msg.sender ? msg.sender.id : ''}</span>
          <span class="chat-time">${timeStr}</span>
        </div>
        <div class="chat-bubble-body">
          ${this.escapeHtml(msg.text)}
          ${inviteWidget}
        </div>
      </div>
    `;

    targetContainer.appendChild(bubble);
  }

  sendMessage() {
    if (!this.inputField) return;
    const text = this.inputField.value.trim();
    if (!text) return;

    if (this.activeTab === 'global') {
      window.hubSocket.sendGlobalMessage(text);
    } else {
      window.hubSocket.sendPrivateMessage(this.activeTab, text);
    }

    this.inputField.value = '';
    this.inputField.focus();
  }

  async loadFallbackPlayers() {
    try {
      const res = await fetch('/api/players/online');
      const data = await res.json();
      if (data && data.success && Array.isArray(data.players) && data.players.length > 0) {
        this.cachedPlayersList = data.players;
        data.players.forEach(p => this.playersMap.set(p.id, p));
        return;
      }
    } catch (e) {}

    try {
      const res = await fetch('/api/leaderboard?category=xp');
      const data = await res.json();
      if (data && data.success && Array.isArray(data.leaderboard)) {
        this.cachedPlayersList = data.leaderboard;
        data.leaderboard.forEach(p => this.playersMap.set(p.id, p));
      }
    } catch (e) {}
  }

  sendInGameMessage() {
    this.inGameInputField = document.getElementById('inGameChatInput');
    if (!this.inGameInputField) return;
    const text = this.inGameInputField.value.trim();
    if (!text) return;

    if (this.activeTab === 'global') {
      window.hubSocket.sendGlobalMessage(text);
    } else {
      window.hubSocket.sendPrivateMessage(this.activeTab, text);
    }

    this.inGameInputField.value = '';
    this.inGameInputField.focus();
  }

  // In-Game Drawer Controls
  isInGameDrawerOpen() {
    const drawer = this.inGameDrawer || document.getElementById('inGameChatDrawer');
    return drawer ? drawer.classList.contains('open') : false;
  }

  toggleInGameDrawer(forceState) {
    this.inGameDrawer = document.getElementById('inGameChatDrawer');
    this.inGameToggleBtn = document.getElementById('btnToggleInGameChat');

    const isOpen = this.isInGameDrawerOpen();
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !isOpen;
    if (shouldOpen) {
      this.openInGameDrawer();
    } else {
      this.closeInGameDrawer();
    }
  }

  openInGameDrawer() {
    this.inGameDrawer = document.getElementById('inGameChatDrawer');
    this.inGameToggleBtn = document.getElementById('btnToggleInGameChat');
    this.inGameInputField = document.getElementById('inGameChatInput');
    this.inGameMessagesContainer = document.getElementById('inGameChatMessages');
    this.inGameTabsContainer = document.getElementById('inGameChatTabs');
    this.inGameMentionDropdown = document.getElementById('inGameMentionDropdown');

    if (!this.inGameDrawer) return;

    this.inGameDrawer.classList.add('open');
    if (this.inGameToggleBtn) {
      this.inGameToggleBtn.classList.add('active-btn');
    }
    this.resetInGameUnreadBadge();
    this.renderInGameTabs();
    this.renderInGameMessages();
    this.updateInGameInputPlaceholder();
    setTimeout(() => {
      if (this.inGameInputField) {
        this.inGameInputField.focus();
      }
    }, 100);
  }

  closeInGameDrawer() {
    this.inGameDrawer = document.getElementById('inGameChatDrawer');
    this.inGameToggleBtn = document.getElementById('btnToggleInGameChat');
    this.inGameMentionDropdown = document.getElementById('inGameMentionDropdown');

    if (!this.inGameDrawer) return;

    this.inGameDrawer.classList.remove('open');
    if (this.inGameToggleBtn) {
      this.inGameToggleBtn.classList.remove('active-btn');
    }
    if (this.inGameMentionDropdown) {
      this.inGameMentionDropdown.classList.add('hidden');
    }
    const iframe = document.getElementById('gameIframe');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.focus();
      } catch (e) {}
    }
  }

  updateInGameUnreadBadge() {
    if (!this.inGameBadge) {
      this.inGameBadge = document.getElementById('inGameChatBadge');
    }
    if (!this.inGameBadge) return;
    if (this.inGameUnreadCount > 0) {
      this.inGameBadge.textContent = this.inGameUnreadCount > 9 ? '9+' : this.inGameUnreadCount;
      this.inGameBadge.classList.remove('hidden');
    } else {
      this.inGameBadge.classList.add('hidden');
    }
  }

  resetInGameUnreadBadge() {
    this.inGameUnreadCount = 0;
    this.updateInGameUnreadBadge();
  }

  scrollToBottom(container = this.chatContainer) {
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  updateOnlinePlayers(playersList) {
    if (!this.playersContainer) return;
    this.playersContainer.innerHTML = '';

    const myId = window.hubSocket.player ? window.hubSocket.player.id : null;
    const onlineBadge = document.getElementById('onlineCountBadge');
    if (onlineBadge) {
      onlineBadge.innerText = playersList.length;
    }
    const mobileBadge = document.getElementById('mobileOnlineBadge');
    if (mobileBadge) {
      mobileBadge.innerText = playersList.length;
    }

    playersList.forEach(p => {
      this.playersMap.set(p.id, p);
      const isSelf = p.id === myId;

      const item = document.createElement('div');
      item.className = `player-item ${isSelf ? 'self-item' : ''}`;

      let statusClass = 'status-online';
      let statusDesc = window.i18n.t('social.status_online');

      if (p.status === 'in_game') {
        statusClass = 'status-ingame';
        statusDesc = window.i18n.t('social.status_ingame', { game: p.currentGame || 'Game' });
      } else if (p.status === 'away') {
        statusClass = 'status-away';
        statusDesc = window.i18n.t('social.status_away');
      }

      const avatarSvg = getAvatarSvg(p.avatar);

      item.innerHTML = `
        <div class="player-left">
          <div class="player-avatar-small">
            ${avatarSvg}
            <span class="status-dot ${statusClass}"></span>
          </div>
          <div class="player-meta">
            <span class="player-nick">${this.escapeHtml(p.nickname)} ${isSelf ? window.i18n.t('social.you') : ''}</span>
            <span class="player-id-sub">${p.id}</span>
            <span class="player-status-activity">${statusDesc}</span>
          </div>
        </div>
        ${!isSelf ? `
          <div style="display:flex; gap:6px;">
            <button class="player-quick-btn" title="${window.i18n.t('social.card_chat')}" onclick="window.gameHubChat.openDirectChat('${p.id}', '${p.nickname}')">💬</button>
            <button class="player-quick-btn" title="${window.i18n.t('social.card_invite')}" onclick="window.gameHubCatalog.openInviteModalForPlayer('${p.id}')">🎮</button>
          </div>
        ` : ''}
      `;

      item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('player-quick-btn')) {
          window.app.showPlayerCard(p.id);
        }
      });

      this.playersContainer.appendChild(item);
    });
  }

  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
}

window.gameHubChat = new GameHubChat();
