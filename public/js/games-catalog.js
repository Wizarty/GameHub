// GameHub Games Catalog & In-Hub Player Manager (with i18n support)
class GameHubCatalog {
  constructor() {
    this.games = [];
    this.filteredGames = [];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.activeGame = null;

    this.gridContainer = null;
    this.viewportWrapper = null;
    this.gameIframe = null;
  }

  async init() {
    this.gridContainer = document.getElementById('gamesGrid');
    this.viewportWrapper = document.getElementById('gameViewportWrapper');
    this.gameIframe = document.getElementById('gameIframe');

    await this.fetchGames();
    this.setupListeners();
    this.setupInGameControls();

    // Re-render when language changes
    window.addEventListener('languageChanged', () => {
      this.applyFilter();
    });

    // Listen for new games added via Socket.io
    window.hubSocket.on('hub:game_added', (newGame) => {
      this.games.unshift(newGame);
      this.applyFilter();
    });

    window.hubSocket.on('hub:game_removed', ({ id }) => {
      this.games = this.games.filter(g => g.id !== id);
      this.applyFilter();
    });

    // Start session if invite accepted
    window.hubSocket.on('game:start_session', (session) => {
      this.launchGameById(session.gameId, session.partner);
    });

    // PostMessage communication with games
    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'GAMEHUB_GAME_OVER') {
        console.log('Game reported Game Over:', e.data);
      }
    });
  }

  async fetchGames() {
    try {
      const res = await fetch('/api/games');
      const data = await res.json();
      if (data.success) {
        this.games = data.games;
        this.applyFilter();
      }
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }

  setupListeners() {
    // Category pill buttons
    const pills = document.querySelectorAll('.pill-btn');
    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        pills.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.dataset.category || 'all';
        this.applyFilter();
      });
    });

    // Search input
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.applyFilter();
      });
    }

    // Add game form submit
    const addGameForm = document.getElementById('addGameForm');
    if (addGameForm) {
      addGameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitNewGame();
      });
    }

    // Invite friend modal submit
    const inviteForm = document.getElementById('inviteFriendForm');
    if (inviteForm) {
      inviteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitGameInvite();
      });
    }
  }

  setupInGameControls() {
    const btnExit = document.getElementById('btnExitGame');
    if (btnExit) {
      btnExit.addEventListener('click', () => this.exitCurrentGame());
    }

    const btnFullscreen = document.getElementById('btnGameFullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          this.viewportWrapper.requestFullscreen().catch(err => console.log(err));
        } else {
          document.exitFullscreen().catch(err => console.log(err));
        }
      });
    }

    const btnInGameChat = document.getElementById('btnToggleInGameChat');
    const drawer = document.getElementById('inGameChatDrawer');
    if (btnInGameChat && drawer) {
      btnInGameChat.addEventListener('click', () => {
        drawer.classList.toggle('open');
        btnInGameChat.classList.toggle('active-btn');
      });
    }

    const btnInGameInvite = document.getElementById('btnInGameInvite');
    if (btnInGameInvite) {
      btnInGameInvite.addEventListener('click', () => {
        if (this.activeGame) {
          this.openInviteModalForGame(this.activeGame);
        }
      });
    }
  }

  applyFilter() {
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    this.filteredGames = this.games.filter(game => {
      let matchesCat = true;
      const gameCat = (lang === 'ru' ? (game.category_ru || game.category) : (game.category_en || game.category)).toLowerCase();

      if (this.currentCategory === 'multiplayer') {
        matchesCat = game.multiplayer === true;
      } else if (this.currentCategory === 'github') {
        matchesCat = !!game.githubUrl;
      } else if (this.currentCategory === 'puzzle' || this.currentCategory === 'головоломка') {
        matchesCat = gameCat.includes('puzzle') || gameCat.includes('головоломка');
      } else if (this.currentCategory === 'arcade' || this.currentCategory === 'аркада') {
        matchesCat = gameCat.includes('arcade') || gameCat.includes('аркада');
      } else if (this.currentCategory !== 'all') {
        matchesCat = gameCat.includes(this.currentCategory.toLowerCase());
      }

      let matchesSearch = true;
      if (this.searchQuery) {
        const title = (lang === 'ru' ? (game.title_ru || game.title) : (game.title_en || game.title)).toLowerCase();
        const desc = (lang === 'ru' ? (game.description_ru || game.description) : (game.description_en || game.description)).toLowerCase();
        const tags = (lang === 'ru' ? (game.tags_ru || game.tags) : (game.tags_en || game.tags)) || [];

        matchesSearch = title.includes(this.searchQuery) ||
          desc.includes(this.searchQuery) ||
          tags.some(t => t.toLowerCase().includes(this.searchQuery));
      }

      return matchesCat && matchesSearch;
    });

    this.renderCatalog();
  }

  renderCatalog() {
    if (!this.gridContainer) return;
    this.gridContainer.innerHTML = '';
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    if (this.filteredGames.length === 0) {
      this.gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #94a3b8;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🕹️</div>
          <h3>${window.i18n.t('catalog.no_games_title')}</h3>
          <p style="margin-top: 6px;">${window.i18n.t('catalog.no_games_desc')}</p>
        </div>
      `;
      return;
    }

    this.filteredGames.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      if (game.color) {
        card.style.setProperty('--card-accent', game.color);
        card.style.setProperty('--card-glow', `${game.color}33`);
      }

      let githubBadge = '';
      if (game.githubUrl) {
        githubBadge = `
          <a href="${game.githubUrl}" target="_blank" rel="noopener noreferrer" class="badge-tag badge-github" title="GitHub Repository">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg> GitHub
          </a>
        `;
      }

      let multiBadge = game.multiplayer 
        ? `<span class="badge-tag badge-multiplayer">PvP / Co-op</span>` 
        : '';

      let rawBadge = game.badge || '';
      let badgeLabel = rawBadge;
      if (rawBadge === 'Hot' || rawBadge === 'Хит') badgeLabel = window.i18n.t('catalog.hit_badge');
      else if (rawBadge === 'PvP Duel' || rawBadge === 'ПВП Дуэль') badgeLabel = window.i18n.t('catalog.pvp_badge');
      else if (rawBadge === 'New' || rawBadge === 'Новинка') badgeLabel = window.i18n.t('catalog.new_badge');

      let hotBadge = badgeLabel 
        ? `<span class="badge-tag badge-hot">${badgeLabel}</span>` 
        : '';

      const gameTitle = lang === 'ru' ? (game.title_ru || game.title) : (game.title_en || game.title);
      const gameDesc = lang === 'ru' ? (game.description_ru || game.description) : (game.description_en || game.description);
      const gameTags = (lang === 'ru' ? (game.tags_ru || game.tags) : (game.tags_en || game.tags)) || [];

      let tagsHtml = gameTags.map(t => `<span class="tag-item">#${t}</span>`).join('');

      card.innerHTML = `
        <div class="game-card-header">
          <div class="game-icon-box" style="color: ${game.color || 'var(--neon-cyan)'};">
            ${game.icon || '🎮'}
          </div>
          <div class="game-badges">
            ${hotBadge}
            ${multiBadge}
            ${githubBadge}
          </div>
        </div>

        <h3 class="game-title">${gameTitle}</h3>
        <p class="game-desc">${gameDesc}</p>

        <div class="game-tags">
          ${tagsHtml}
        </div>

        <div class="game-card-actions">
          <button class="btn-play" onclick="window.gameHubCatalog.launchGame('${game.id}')">
            <span>▶</span> <span>${window.i18n.t('catalog.play')}</span>
          </button>
          <button class="btn-invite-card" onclick="window.gameHubCatalog.openInviteModalForGame('${game.id}')">
            <span>🎮</span> <span>${window.i18n.t('catalog.invite')}</span>
          </button>
        </div>
      `;

      this.gridContainer.appendChild(card);
    });
  }

  launchGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (!game) return;

    this.activeGame = game;
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const gameTitle = lang === 'ru' ? (game.title_ru || game.title) : (game.title_en || game.title);
    document.getElementById('currentGameTitle').innerText = gameTitle;

    // Set iframe source
    this.gameIframe.src = game.path;

    // Show viewport wrapper
    this.viewportWrapper.classList.remove('hidden');

    // Update player status on server
    window.hubSocket.updateStatus('in_game', gameTitle);

    // Send player profile into iframe once loaded
    this.gameIframe.onload = () => {
      try {
        if (window.hubSocket.player) {
          this.gameIframe.contentWindow.postMessage({
            type: 'GAMEHUB_INIT_PLAYER',
            player: window.hubSocket.player,
            nickname: window.hubSocket.player.nickname,
            id: window.hubSocket.player.id,
            lang: lang
          }, '*');
        }
      } catch (e) {}
    };
  }

  launchGameById(gameId, partner = null) {
    this.launchGame(gameId);
    if (partner) {
      console.log(`Starting multiplayer game session with partner ${partner.nickname} (${partner.id})`);
    }
  }

  exitCurrentGame() {
    this.viewportWrapper.classList.add('hidden');
    this.gameIframe.src = 'about:blank';
    this.activeGame = null;

    // Close in-game drawer if open
    document.getElementById('inGameChatDrawer').classList.remove('open');
    document.getElementById('btnToggleInGameChat').classList.remove('active-btn');

    // Restore status to online
    window.hubSocket.updateStatus('online');
  }

  openInviteModalForGame(gameId) {
    const game = typeof gameId === 'string' ? this.games.find(g => g.id === gameId) : gameId;
    if (!game) return;

    const modal = document.getElementById('inviteModal');
    const gameSelect = document.getElementById('inviteGameSelect');
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    gameSelect.innerHTML = this.games.map(g => {
      const title = lang === 'ru' ? (g.title_ru || g.title) : (g.title_en || g.title);
      return `<option value="${g.id}" ${g.id === game.id ? 'selected' : ''}>${title}</option>`;
    }).join('');

    modal.classList.remove('hidden');
  }

  openInviteModalForPlayer(playerId) {
    const modal = document.getElementById('inviteModal');
    const targetInput = document.getElementById('invitePlayerIdInput');
    const gameSelect = document.getElementById('inviteGameSelect');
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    targetInput.value = playerId;

    gameSelect.innerHTML = this.games.map(g => {
      const title = lang === 'ru' ? (g.title_ru || g.title) : (g.title_en || g.title);
      return `<option value="${g.id}">${title}</option>`;
    }).join('');

    modal.classList.remove('hidden');
  }

  submitGameInvite() {
    const targetId = document.getElementById('invitePlayerIdInput').value.trim();
    const gameId = document.getElementById('inviteGameSelect').value;
    const customMsg = document.getElementById('inviteCustomMsgInput').value.trim();

    if (!targetId) {
      alert(window.i18n.t('invite.target_id_placeholder'));
      return;
    }

    const game = this.games.find(g => g.id === gameId);
    if (!game) return;

    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const gameTitle = lang === 'ru' ? (game.title_ru || game.title) : (game.title_en || game.title);

    window.hubSocket.sendGameInvite(targetId, game.id, gameTitle, customMsg, (res) => {
      if (res && res.success) {
        alert(window.i18n.t('invite.sent_success', { game: gameTitle, id: targetId }));
        document.getElementById('inviteModal').classList.add('hidden');
      } else {
        alert(res ? res.error : 'Failed to send invite');
      }
    });
  }

  async submitNewGame() {
    const title = document.getElementById('addGameTitle').value.trim();
    const category = document.getElementById('addGameCategory').value;
    const gamePath = document.getElementById('addGamePath').value.trim();
    const description = document.getElementById('addGameDesc').value.trim();
    const tags = document.getElementById('addGameTags').value.trim();
    const githubUrl = document.getElementById('addGameGithub').value.trim();
    const author = document.getElementById('addGameAuthor').value.trim();
    const multiplayer = document.getElementById('addGameMultiplayer').checked;
    const icon = document.getElementById('addGameIcon').value.trim() || '🎮';
    const color = document.getElementById('addGameColor').value || '#00f0ff';

    if (!title || !gamePath) {
      alert('Please fill in required fields: Game Title and Path/URL!');
      return;
    }

    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          path: gamePath,
          description,
          tags,
          githubUrl,
          author,
          multiplayer,
          icon,
          color
        })
      });

      const data = await res.json();
      if (data.success) {
        alert(window.i18n.t('add_game.success', { title }));
        document.getElementById('addGameModal').classList.add('hidden');
        document.getElementById('addGameForm').reset();
        await this.fetchGames();
      } else {
        alert(data.error || 'Error adding game');
      }
    } catch (err) {
      console.error(err);
      alert('Network error adding game');
    }
  }
}

window.gameHubCatalog = new GameHubCatalog();
