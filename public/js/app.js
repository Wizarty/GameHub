// GameHub Main Controller & UI Orchestration (with i18n & Mobile navigation)
class GameHubApp {
  constructor() {
    this.selectedAvatar = 'avatar-cyber-samurai';
    this.toastContainer = null;
  }

  init() {
    this.toastContainer = document.getElementById('toastContainer');

    // 1. Initialize i18n first
    window.i18n.updateDOM();

    // 2. Setup Language Switcher
    this.setupLanguageSwitcher();

    // 3. Initialize Modules
    window.hubSocket.init();
    window.gameHubChat.init();
    window.gameHubCatalog.init();
    window.gameHubGamification.init();

    // 4. Setup Navigation (Desktop & Mobile)
    this.setupNavigation();

    // 5. Setup Onboarding & Profile Modal
    this.setupProfileModals();

    // 6. Setup Global Search by ID
    this.setupSearchById();

    // 7. Setup URL parameters handlers
    this.handleUrlParams();

    // 8. Listen for Socket events
    window.hubSocket.on('player:ready', ({ player }) => {
      this.updateHeaderProfile(player);
    });

    window.hubSocket.on('game:invite_received', (invite) => {
      this.showInviteToast(invite);
    });

    window.hubSocket.on('game:invite_response', (resp) => {
      if (resp.accepted) {
        this.showSimpleToast(window.i18n.t('toast.invite_accepted_by_other', { nick: resp.fromNickname, game: resp.gameTitle }), 'success');
      } else {
        this.showSimpleToast(window.i18n.t('toast.invite_declined_by_other', { nick: resp.fromNickname }), 'info');
      }
    });

    window.addEventListener('languageChanged', () => {
      this.updateAvatarTooltips();
    });

    // Check if user is already logged in
    const saved = window.hubSocket.getSavedProfile();
    if (!saved || !saved.nickname) {
      this.openOnboardingModal();
    } else {
      this.updateHeaderProfile(saved);
    }
  }

  setupLanguageSwitcher() {
    const btnToggle = document.getElementById('btnLangToggle');
    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        window.i18n.toggleLanguage();
      });
    }
  }

  setupNavigation() {
    const navCatalog = document.getElementById('navCatalog');
    const navChat = document.getElementById('navChat');
    const navPlayers = document.getElementById('navPlayers');
    const navLeaderboard = document.getElementById('navLeaderboard');

    // Mobile Bottom Nav items
    const mobNavCatalog = document.getElementById('mobNavCatalog');
    const mobNavChat = document.getElementById('mobNavChat');
    const mobNavPlayers = document.getElementById('mobNavPlayers');
    const mobNavLeaderboard = document.getElementById('mobNavLeaderboard');
    const mobNavAddGame = document.getElementById('mobNavAddGame');

    const viewCatalog = document.getElementById('viewCatalog');
    const viewSocial = document.getElementById('viewSocial');
    const viewLeaderboard = document.getElementById('viewLeaderboard');

    const switchView = (target) => {
      [navCatalog, navChat, navPlayers, navLeaderboard].forEach(b => b && b.classList.remove('active'));
      [mobNavCatalog, mobNavChat, mobNavPlayers, mobNavLeaderboard].forEach(b => b && b.classList.remove('active'));

      if (target === 'catalog') {
        if (navCatalog) navCatalog.classList.add('active');
        if (mobNavCatalog) mobNavCatalog.classList.add('active');
        viewCatalog.classList.remove('hidden');
        viewSocial.classList.add('hidden');
        if (viewLeaderboard) viewLeaderboard.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'chat' || target === 'players') {
        if (target === 'chat') {
          if (navChat) navChat.classList.add('active');
          if (mobNavChat) mobNavChat.classList.add('active');
        } else {
          if (navPlayers) navPlayers.classList.add('active');
          if (mobNavPlayers) mobNavPlayers.classList.add('active');
        }
        viewCatalog.classList.add('hidden');
        viewSocial.classList.remove('hidden');
        if (viewLeaderboard) viewLeaderboard.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'leaderboard') {
        if (navLeaderboard) navLeaderboard.classList.add('active');
        if (mobNavLeaderboard) mobNavLeaderboard.classList.add('active');
        viewCatalog.classList.add('hidden');
        viewSocial.classList.add('hidden');
        if (viewLeaderboard) {
          viewLeaderboard.classList.remove('hidden');
          window.gameHubGamification.fetchAndRenderLeaderboard(window.gameHubGamification.currentLbCategory);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (navCatalog) navCatalog.addEventListener('click', () => switchView('catalog'));
    if (navChat) navChat.addEventListener('click', () => switchView('chat'));
    if (navPlayers) navPlayers.addEventListener('click', () => switchView('players'));
    if (navLeaderboard) navLeaderboard.addEventListener('click', () => switchView('leaderboard'));

    if (mobNavCatalog) mobNavCatalog.addEventListener('click', () => switchView('catalog'));
    if (mobNavChat) mobNavChat.addEventListener('click', () => switchView('chat'));
    if (mobNavPlayers) mobNavPlayers.addEventListener('click', () => switchView('players'));
    if (mobNavLeaderboard) mobNavLeaderboard.addEventListener('click', () => switchView('leaderboard'));
    if (mobNavAddGame) mobNavAddGame.addEventListener('click', () => {
      document.getElementById('addGameModal').classList.remove('hidden');
    });

    // Logo click returns to catalog
    const logo = document.querySelector('.logo-group');
    if (logo) logo.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('catalog');
    });

    // Add game button in header
    const btnAddGame = document.getElementById('btnAddGameHeader');
    if (btnAddGame) {
      btnAddGame.addEventListener('click', () => {
        document.getElementById('addGameModal').classList.remove('hidden');
      });
    }

    // Modal close buttons
    document.querySelectorAll('.modal-close-btn, .btn-modal-cancel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.add('hidden');
      });
    });

    // Copy my ID button in hero
    const btnCopyMyId = document.getElementById('btnCopyMyId');
    if (btnCopyMyId) {
      btnCopyMyId.addEventListener('click', () => {
        const myId = window.hubSocket.player ? window.hubSocket.player.id : null;
        if (myId) {
          navigator.clipboard.writeText(myId).then(() => {
            this.showSimpleToast(window.i18n.t('hero.copied_toast', { id: myId }), 'success');
          });
        }
      });
    }
  }

  setupProfileModals() {
    this.renderAvatarPicker('onboardingAvatarGrid');
    this.renderAvatarPicker('editAvatarGrid');

    const randomNicks = ['CyberNinja', 'NeonViper', 'PixelKnight', 'QuantumBlade', 'GhostRunner', 'RetroPilot', 'ShadowZero', 'AeroDrifter', 'NovaGamer', 'HyperByte', 'MatrixStriker', 'EchoPhantom'];
    const btnRandNick = document.getElementById('btnRandomNick');
    if (btnRandNick) {
      btnRandNick.addEventListener('click', () => {
        const nick = randomNicks[Math.floor(Math.random() * randomNicks.length)] + '_' + Math.floor(Math.random() * 99);
        document.getElementById('onboardNickname').value = nick;
      });
    }

    const onboardForm = document.getElementById('onboardForm');
    if (onboardForm) {
      onboardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nickname = document.getElementById('onboardNickname').value.trim();
        if (!nickname) return;

        window.hubSocket.login(nickname, this.selectedAvatar, null, (res) => {
          if (res && res.success) {
            document.getElementById('onboardingModal').classList.add('hidden');
            this.updateHeaderProfile(res.player);
            this.showSimpleToast(`Welcome, ${res.player.nickname}! ID: ${res.player.id}`, 'success');
          }
        });
      });
    }

    const headerProfileBadge = document.getElementById('headerProfileBadge');
    if (headerProfileBadge) {
      headerProfileBadge.addEventListener('click', () => {
        const p = window.hubSocket.player;
        if (!p) return;
        document.getElementById('editNickname').value = p.nickname;
        this.selectAvatar(p.avatar || 'avatar-cyber-samurai', 'editAvatarGrid');
        document.getElementById('editProfileModal').classList.remove('hidden');
      });
    }

    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
      editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nickname = document.getElementById('editNickname').value.trim();
        if (!nickname) return;
        const currentId = window.hubSocket.player ? window.hubSocket.player.id : null;

        window.hubSocket.login(nickname, this.selectedAvatar, currentId, (res) => {
          if (res && res.success) {
            document.getElementById('editProfileModal').classList.add('hidden');
            this.updateHeaderProfile(res.player);
            this.showSimpleToast(window.i18n.t('profile.saved_toast'), 'success');
          }
        });
      });
    }
  }

  renderAvatarPicker(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    AVATARS.forEach(av => {
      const opt = document.createElement('div');
      opt.className = `avatar-opt ${av.id === this.selectedAvatar ? 'selected' : ''}`;
      opt.dataset.avatarId = av.id;
      opt.title = getAvatarName(av.id, lang);
      opt.innerHTML = av.svg;

      opt.addEventListener('click', () => {
        this.selectAvatar(av.id, gridId);
      });

      grid.appendChild(opt);
    });
  }

  updateAvatarTooltips() {
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    document.querySelectorAll('.avatar-opt').forEach(opt => {
      const id = opt.dataset.avatarId;
      if (id) {
        opt.title = getAvatarName(id, lang);
      }
    });
  }

  selectAvatar(avatarId, gridId = null) {
    this.selectedAvatar = avatarId;
    const targetGrids = gridId 
      ? [document.getElementById(gridId)] 
      : [document.getElementById('onboardingAvatarGrid'), document.getElementById('editAvatarGrid')];
    targetGrids.forEach(g => {
      if (!g) return;
      g.querySelectorAll('.avatar-opt').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.avatarId === avatarId);
      });
    });
  }

  openOnboardingModal() {
    const modal = document.getElementById('onboardingModal');
    if (modal) modal.classList.remove('hidden');
  }

  updateHeaderProfile(player) {
    if (!player) return;
    const nameEl = document.getElementById('headerPlayerName');
    const idEl = document.getElementById('headerPlayerId');
    const avatarEl = document.getElementById('headerPlayerAvatar');
    const heroIdEl = document.getElementById('heroMyId');

    if (nameEl) nameEl.innerText = player.nickname;
    if (idEl) idEl.innerText = player.id;
    if (heroIdEl) heroIdEl.innerText = player.id;
    if (avatarEl) avatarEl.innerHTML = getAvatarSvg(player.avatar);
  }

  setupSearchById() {
    const searchInput = document.getElementById('headerSearchIdInput');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = searchInput.value.trim().toUpperCase();
        if (!val) return;

        let cleanId = val;
        if (!cleanId.startsWith('GH-') && !cleanId.startsWith('#GH-')) {
          cleanId = 'GH-' + cleanId.replace('#', '');
        } else {
          cleanId = cleanId.replace('#', '');
        }

        this.showPlayerCard(cleanId);
        searchInput.value = '';
      }
    });
  }

  async showPlayerCard(playerId) {
    try {
      const res = await fetch(`/api/players/${playerId}`);
      const data = await res.json();

      const modal = document.getElementById('playerCardModal');
      const avatarBox = document.getElementById('playerCardAvatar');
      const nickBox = document.getElementById('playerCardNick');
      const idBox = document.getElementById('playerCardId');
      const statusBox = document.getElementById('playerCardStatus');
      const btnChat = document.getElementById('btnPlayerCardChat');
      const btnInvite = document.getElementById('btnPlayerCardInvite');

      if (data.success) {
        const p = data.player;
        avatarBox.innerHTML = getAvatarSvg(p.avatar);
        nickBox.innerText = p.nickname;
        idBox.innerText = p.id;
        const lvlBadge = document.getElementById('playerCardLevelBadge');
        if (lvlBadge) lvlBadge.innerText = `Lv.${p.level || 1}`;

        let statusText = p.status === 'in_game' 
          ? `🎮 ${window.i18n.t('social.status_ingame', { game: p.currentGame })}` 
          : (p.status === 'online' ? `🟢 ${window.i18n.t('social.status_online')}` : `⚪ ${window.i18n.t('social.status_offline')}`);
        statusBox.innerText = statusText;

        btnChat.onclick = () => {
          modal.classList.add('hidden');
          document.getElementById('navChat').click();
          window.gameHubChat.openDirectChat(p.id, p.nickname);
        };

        btnInvite.onclick = () => {
          modal.classList.add('hidden');
          window.gameHubCatalog.openInviteModalForPlayer(p.id);
        };

        modal.classList.remove('hidden');
      } else {
        avatarBox.innerHTML = getAvatarSvg('avatar-neon-hacker');
        nickBox.innerText = 'Player ' + playerId;
        idBox.innerText = playerId;
        statusBox.innerText = `⚪ ${window.i18n.t('social.status_offline')}`;

        btnChat.onclick = () => {
          modal.classList.add('hidden');
          document.getElementById('navChat').click();
          window.gameHubChat.openDirectChat(playerId);
        };

        btnInvite.onclick = () => {
          modal.classList.add('hidden');
          window.gameHubCatalog.openInviteModalForPlayer(playerId);
        };

        modal.classList.remove('hidden');
      }
    } catch (e) {
      console.error(e);
    }
  }

  showInviteToast(invite) {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'invite-toast';

    const avatarSvg = getAvatarSvg(invite.from ? invite.from.avatar : 'avatar-cyber-samurai');

    toast.innerHTML = `
      <div class="toast-top">
        <div class="toast-avatar">
          ${avatarSvg}
        </div>
        <div class="toast-details">
          <div class="toast-from-name">🎮 ${invite.from.nickname} (${invite.from.id})</div>
          <div class="toast-game-line">${window.i18n.t('toast.invite_body', { game: invite.gameTitle })}</div>
          ${invite.message ? `<div style="font-size:0.8rem; color:#94a3b8; margin-top:2px;">«${invite.message}»</div>` : ''}
        </div>
      </div>
      <div class="toast-actions">
        <button class="btn-toast-accept" id="toastAccept-${invite.inviteId}">${window.i18n.t('toast.accept')}</button>
        <button class="btn-toast-decline" id="toastDecline-${invite.inviteId}">${window.i18n.t('toast.decline')}</button>
      </div>
    `;

    this.toastContainer.appendChild(toast);

    document.getElementById(`toastAccept-${invite.inviteId}`).onclick = () => {
      window.hubSocket.respondToInvite(invite.inviteId, true);
      toast.remove();
    };

    document.getElementById(`toastDecline-${invite.inviteId}`).onclick = () => {
      window.hubSocket.respondToInvite(invite.inviteId, false);
      toast.remove();
    };

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 25000);
  }

  showSimpleToast(text, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'invite-toast';
    toast.style.borderColor = type === 'success' ? 'var(--neon-green)' : 'var(--neon-cyan)';
    toast.innerHTML = `
      <div style="font-size:0.92rem; color:#fff; display:flex; align-items:center; gap:8px;">
        <span>${type === 'success' ? '✅' : 'ℹ️'}</span>
        <span>${text}</span>
      </div>
    `;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 4500);
  }

  handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const inviteUser = params.get('invite_user') || params.get('chat_with');
    const playGame = params.get('play');

    if (inviteUser) {
      setTimeout(() => {
        this.showPlayerCard(inviteUser);
      }, 500);
    }

    if (playGame) {
      setTimeout(() => {
        window.gameHubCatalog.launchGame(playGame);
      }, 600);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new GameHubApp();
  window.app.init();
});
