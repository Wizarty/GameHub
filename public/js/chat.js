// GameHub Social & Chat Manager (with i18n support & In-Game Overlay)
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

    // In-Game Overlay Chat Elements
    this.inGameDrawer = null;
    this.inGameMessagesContainer = null;
    this.inGameTabsContainer = null;
    this.inGameInputField = null;
    this.inGameSendBtn = null;
    this.inGameCloseBtn = null;
    this.inGameBadge = null;
    this.inGameToggleBtn = null;
    this.inGameUnreadCount = 0;
  }

  init() {
    this.chatContainer = document.getElementById('chatMessagesContainer');
    this.tabsContainer = document.getElementById('chatTabsBar');
    this.inputField = document.getElementById('chatInputField');
    this.playersContainer = document.getElementById('onlinePlayersList');

    this.inGameDrawer = document.getElementById('inGameChatDrawer');
    this.inGameMessagesContainer = document.getElementById('inGameChatMessages');
    this.inGameTabsContainer = document.getElementById('inGameChatTabs');
    this.inGameInputField = document.getElementById('inGameChatInput');
    this.inGameSendBtn = document.getElementById('btnSendInGameChat');
    this.inGameCloseBtn = document.getElementById('btnCloseInGameChat');
    this.inGameBadge = document.getElementById('inGameChatBadge');
    this.inGameToggleBtn = document.getElementById('btnToggleInGameChat');

    this.chatHistories.set('global', []);

    // Setup main chat input listeners
    if (this.inputField) {
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.sendMessage();
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
          e.preventDefault();
          this.sendInGameMessage();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.closeInGameDrawer();
        }
      });
      this.inGameInputField.addEventListener('keyup', stopProp);
      this.inGameInputField.addEventListener('keypress', stopProp);
    }

    if (this.inGameSendBtn) {
      this.inGameSendBtn.addEventListener('click', () => this.sendInGameMessage());
    }

    if (this.inGameCloseBtn) {
      this.inGameCloseBtn.addEventListener('click', () => this.closeInGameDrawer());
    }

    // Global Escape key to close drawer if open
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isInGameDrawerOpen()) {
        this.closeInGameDrawer();
      }
    });

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

  updateInputPlaceholder() {
    if (!this.inputField) return;
    this.inputField.placeholder = this.activeTab === 'global' 
      ? window.i18n.t('social.input_placeholder_global')
      : window.i18n.t('social.input_placeholder_dm', { id: this.activeTab });
    this.inputField.focus();
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
      btn.className = `chat-tab-btn ${this.activeTab === tabId ? 'active' : ''}`;

      let title = tabId === 'global' ? window.i18n.t('social.global_tab') : `👤 ${tabId}`;
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
    if (!this.inGameTabsContainer) return;
    this.inGameTabsContainer.innerHTML = '';

    this.openTabs.forEach(tabId => {
      const btn = document.createElement('button');
      btn.className = `ingame-chat-tab-btn ${this.activeTab === tabId ? 'active' : ''}`;

      let title = tabId === 'global' ? window.i18n.t('social.global_tab') : `👤 ${tabId}`;
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
      this.appendSingleMessage(msg, this.chatContainer);
      this.scrollToBottom(this.chatContainer);

      this.appendSingleMessage(msg, this.inGameMessagesContainer);
      this.scrollToBottom(this.inGameMessagesContainer);
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

  sendInGameMessage() {
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
    return this.inGameDrawer && this.inGameDrawer.classList.contains('open');
  }

  toggleInGameDrawer(forceState) {
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !this.isInGameDrawerOpen();
    if (shouldOpen) {
      this.openInGameDrawer();
    } else {
      this.closeInGameDrawer();
    }
  }

  openInGameDrawer() {
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
    }, 120);
  }

  closeInGameDrawer() {
    if (!this.inGameDrawer) return;
    this.inGameDrawer.classList.remove('open');
    if (this.inGameToggleBtn) {
      this.inGameToggleBtn.classList.remove('active-btn');
    }
    const iframe = document.getElementById('gameIframe');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.focus();
      } catch (e) {}
    }
  }

  updateInGameUnreadBadge() {
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
            <span class="player-nick">${p.nickname} ${isSelf ? window.i18n.t('social.you') : ''}</span>
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
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
}

window.gameHubChat = new GameHubChat();
