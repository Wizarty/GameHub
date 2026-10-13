// GameHub Main Controller & UI Orchestration (NEXT SESSION Engine)
class GameHubApp {
  constructor() {
    this.selectedAvatar = 'avatar-cyber-samurai';
    this.toastContainer = null;
    this.activeSection = 'discover';
  }

  init() {
    this.toastContainer = document.getElementById('toastContainer');

    // 1. Initialize i18n first
    if (window.i18n && window.i18n.updateDOM) {
      window.i18n.updateDOM();
    }

    // 2. Setup Core UI Listeners (Navigation, Language, Modals, Esc key)
    this.setupLanguageSwitcher();
    this.setupNavigation();
    this.setupProfileModals();
    this.setupSearchById();
    this.setupKeyboardShortcuts();
    this.setupScrollSpy();
    this.handleUrlParams();

    // 3. Initialize Independent Submodules Safely
    try {
      if (window.hubSocket && window.hubSocket.init) window.hubSocket.init();
    } catch (err) {
      console.warn('hubSocket init error:', err);
    }

    try {
      if (window.gameHubChat && window.gameHubChat.init) window.gameHubChat.init();
    } catch (err) {
      console.warn('gameHubChat init error:', err);
    }

    try {
      if (window.gameHubCatalog && window.gameHubCatalog.init) window.gameHubCatalog.init();
    } catch (err) {
      console.warn('gameHubCatalog init error:', err);
    }

    try {
      if (window.gameHubGamification && window.gameHubGamification.init) window.gameHubGamification.init();
    } catch (err) {
      console.warn('gameHubGamification init error:', err);
    }

    // 4. Listen for Socket events
    if (window.hubSocket && window.hubSocket.on) {
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
    }

    window.addEventListener('languageChanged', () => {
      this.updateAvatarTooltips();
      const p = window.hubSocket ? window.hubSocket.player : null;
      this.updateHeaderProfile(p);
    });

    // Check if user is already logged in:
    // IMPORTANT: As per design requirements, do NOT block guests with mandatory modal on initial visit!
    const saved = window.hubSocket && window.hubSocket.getSavedProfile ? window.hubSocket.getSavedProfile() : null;
    if (saved && saved.nickname) {
      this.updateHeaderProfile(saved);
    } else {
      this.updateHeaderProfile(null);
    }
  }

  setupLanguageSwitcher() {
    const btnToggle = document.getElementById('btnLangToggle');
    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        if (window.i18n && window.i18n.toggleLanguage) {
          window.i18n.toggleLanguage();
        }
      });
    }
  }

  setupNavigation() {
    const navCatalog = document.getElementById('navCatalog');
    const navChat = document.getElementById('navChat');
    const navPlayers = document.getElementById('navPlayers');
    const navLeaderboard = document.getElementById('navLeaderboard');
    const navAchievements = document.getElementById('navAchievements');
    const navCreators = document.getElementById('navCreators');

    // Mobile Bottom Nav items
    const mobNavCatalog = document.getElementById('mobNavCatalog');
    const mobNavChat = document.getElementById('mobNavChat');
    const mobNavLeaderboard = document.getElementById('mobNavLeaderboard');
    const mobNavAchievements = document.getElementById('mobNavAchievements');

    const scrollToSection = (sectionId) => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (navCatalog) navCatalog.addEventListener('click', () => scrollToSection('discover'));
    if (navChat) navChat.addEventListener('click', () => scrollToSection('connect'));
    if (navPlayers) navPlayers.addEventListener('click', () => scrollToSection('connect'));
    if (navLeaderboard) navLeaderboard.addEventListener('click', () => scrollToSection('progress'));
    if (navCreators) navCreators.addEventListener('click', () => scrollToSection('build'));

    if (navAchievements) navAchievements.addEventListener('click', () => {
      if (window.gameHubGamification && window.gameHubGamification.openAchievementsModal) {
        window.gameHubGamification.openAchievementsModal();
      } else {
        document.getElementById('achievementsModal')?.classList.remove('hidden');
      }
    });

    if (mobNavCatalog) mobNavCatalog.addEventListener('click', () => scrollToSection('discover'));
    if (mobNavChat) mobNavChat.addEventListener('click', () => scrollToSection('connect'));
    if (mobNavLeaderboard) mobNavLeaderboard.addEventListener('click', () => scrollToSection('progress'));
    if (mobNavAchievements) mobNavAchievements.addEventListener('click', () => {
      if (window.gameHubGamification && window.gameHubGamification.openAchievementsModal) {
        window.gameHubGamification.openAchievementsModal();
      } else {
        document.getElementById('achievementsModal')?.classList.remove('hidden');
      }
    });

    // Logo click returns to top
    const logo = document.querySelector('.logo-group');
    if (logo) logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Add game button in header & build section
    const btnAddGame = document.getElementById('btnAddGameHeader');
    if (btnAddGame) {
      btnAddGame.addEventListener('click', () => {
        document.getElementById('addGameModal')?.classList.remove('hidden');
      });
    }

    const btnAddGameSection = document.getElementById('btnAddGameSection');
    if (btnAddGameSection) {
      btnAddGameSection.addEventListener('click', () => {
        document.getElementById('addGameModal')?.classList.remove('hidden');
      });
    }

    // Modal close buttons
    document.querySelectorAll('.modal-close-btn, .btn-modal-cancel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.add('hidden');
      });
    });

    // Clicking modal overlay backdrop closes modal
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.add('hidden');
        }
      });
    });

    // Copy my ID button
    const btnCopyMyId = document.getElementById('btnCopyMyId');
    if (btnCopyMyId) {
      btnCopyMyId.addEventListener('click', () => {
        const myId = window.hubSocket && window.hubSocket.player ? window.hubSocket.player.id : null;
        if (myId) {
          navigator.clipboard.writeText(myId).then(() => {
            this.showSimpleToast(window.i18n.t('hero.copied_toast', { id: myId }), 'success');
          });
        } else {
          this.openOnboardingModal();
        }
      });
    }

    // Guest CTA button in progress section
    const btnCreateProfile = document.getElementById('btnCreateProfileProgress');
    if (btnCreateProfile) {
      btnCreateProfile.addEventListener('click', () => this.openOnboardingModal());
    }
  }

  setupScrollSpy() {
    const sections = ['discover', 'connect', 'progress', 'build'];
    const navMap = {
      'discover': ['navCatalog', 'mobNavCatalog'],
      'connect': ['navChat', 'mobNavChat'],
      'progress': ['navLeaderboard', 'mobNavLeaderboard'],
      'build': ['navCreators']
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-btn, .mob-nav-btn').forEach(b => b.classList.remove('active'));
          const ids = navMap[id] || [];
          ids.forEach(btnId => {
            document.getElementById(btnId)?.classList.add('active');
          });
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(sId => {
      const el = document.getElementById(sId);
      if (el) observer.observe(el);
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close modals
        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));

        // Close in-game drawer if open
        if (window.gameHubChat && window.gameHubChat.inGameDrawer && window.gameHubChat.inGameDrawer.classList.contains('open')) {
          window.gameHubChat.closeInGameDrawer();
        }
      }
    });
  }

  setupProfileModals() {
    this.renderAvatarPicker('onboardingAvatarGrid');
    this.renderAvatarPicker('editAvatarGrid');

    const randomNicks = ['Vanguard', 'HexRunner', 'NovaStrike', 'QuantumBlade', 'CipherGhost', 'AeroDrift', 'NeonPhantom', 'ZeroVector', 'PulseKnight', 'GridWalker'];
    const btnRandNick = document.getElementById('btnRandomNick');
    if (btnRandNick) {
      btnRandNick.addEventListener('click', () => {
        const nick = randomNicks[Math.floor(Math.random() * randomNicks.length)] + '_' + Math.floor(Math.random() * 99);
        const input = document.getElementById('onboardNickname');
        if (input) input.value = nick;
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
            document.getElementById('onboardingModal')?.classList.add('hidden');
            this.updateHeaderProfile(res.player);
            this.showSimpleToast(`Welcome, ${res.player.nickname}! ID: ${res.player.id}`, 'success');
          }
        });
      });
    }

    const headerProfileBadge = document.getElementById('headerProfileBadge');
    if (headerProfileBadge) {
      headerProfileBadge.addEventListener('click', () => {
        const p = window.hubSocket ? window.hubSocket.player : null;
        if (!p || !p.nickname) {
          this.openOnboardingModal();
          return;
        }
        const editNick = document.getElementById('editNickname');
        if (editNick) editNick.value = p.nickname;
        this.selectAvatar(p.avatar || 'avatar-cyber-samurai', 'editAvatarGrid');
        document.getElementById('editProfileModal')?.classList.remove('hidden');
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
            document.getElementById('editProfileModal')?.classList.add('hidden');
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

    if (typeof AVATARS === 'undefined') return;

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
    if (typeof getAvatarName !== 'function') return;

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
    const nameEl = document.getElementById('headerPlayerName');
    const idEl = document.getElementById('headerPlayerId');
    const avatarEl = document.getElementById('headerPlayerAvatar');
    const lvlEl = document.getElementById('headerPlayerLevelBadge');
    const guestBtn = document.getElementById('headerGuestBtn');
    const userBadge = document.getElementById('headerProfileBadge');

    const progressCardGuest = document.getElementById('progressGuestBox');
    const progressCardUser = document.getElementById('progressUserBox');

    if (player && player.nickname) {
      if (guestBtn) guestBtn.classList.add('hidden');
      if (userBadge) userBadge.classList.remove('hidden');

      if (nameEl) nameEl.innerText = player.nickname;
      if (idEl) idEl.innerText = player.id;
      if (lvlEl) lvlEl.innerText = `Lv.${player.level || 1}`;
      if (avatarEl && typeof getAvatarSvg === 'function') {
        avatarEl.innerHTML = getAvatarSvg(player.avatar);
      }

      const heroIdEl = document.getElementById('heroMyId');
      if (heroIdEl) heroIdEl.innerText = player.id;

      if (progressCardGuest) progressCardGuest.classList.add('hidden');
      if (progressCardUser) progressCardUser.classList.remove('hidden');
    } else {
      // Guest state
      if (guestBtn) guestBtn.classList.remove('hidden');
      if (userBadge) userBadge.classList.add('hidden');

      const heroIdEl = document.getElementById('heroMyId');
      if (heroIdEl) heroIdEl.innerText = '#GH-????';

      if (progressCardGuest) progressCardGuest.classList.remove('hidden');
      if (progressCardUser) progressCardUser.classList.add('hidden');
    }
  }

  setupSearchById() {
    const searchInputs = [
      document.getElementById('headerSearchIdInput'),
      document.getElementById('connectSearchInput')
    ];

    searchInputs.forEach(input => {
      if (!input) return;
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = input.value.trim().toUpperCase();
          if (!val) return;

          let cleanId = val;
          if (!cleanId.startsWith('GH-') && !cleanId.startsWith('#GH-')) {
            cleanId = 'GH-' + cleanId.replace('#', '');
          } else {
            cleanId = cleanId.replace('#', '');
          }

          this.showPlayerCard(cleanId);
          input.value = '';
        }
      });
    });

    const btnConnectSearch = document.getElementById('btnConnectSearch');
    if (btnConnectSearch) {
      btnConnectSearch.addEventListener('click', () => {
        const input = document.getElementById('connectSearchInput');
        if (!input) return;
        const val = input.value.trim().toUpperCase();
        if (!val) return;
        let cleanId = val.replace('#', '');
        if (!cleanId.startsWith('GH-')) cleanId = 'GH-' + cleanId;
        this.showPlayerCard(cleanId);
        input.value = '';
      });
    }
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

      if (!modal) return;

      if (data.success) {
        const p = data.player;
        if (avatarBox) avatarBox.innerHTML = typeof getAvatarSvg === 'function' ? getAvatarSvg(p.avatar) : '';
        if (nickBox) nickBox.innerText = p.nickname;
        if (idBox) idBox.innerText = p.id;
        const lvlBadge = document.getElementById('playerCardLevelBadge');
        if (lvlBadge) lvlBadge.innerText = `Lv.${p.level || 1}`;

        let statusText = p.status === 'in_game'
          ? `Playing: ${p.currentGame}`
          : (p.status === 'online' ? window.i18n.t('social.status_online') : window.i18n.t('social.status_offline'));
        if (statusBox) statusBox.innerText = statusText;

        if (btnChat) {
          btnChat.onclick = () => {
            modal.classList.add('hidden');
            document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
            if (window.gameHubChat && window.gameHubChat.openDirectChat) {
              window.gameHubChat.openDirectChat(p.id, p.nickname);
            }
          };
        }

        if (btnInvite) {
          btnInvite.onclick = () => {
            modal.classList.add('hidden');
            window.gameHubCatalog.openInviteModalForPlayer(p.id);
          };
        }

        modal.classList.remove('hidden');
      } else {
        if (avatarBox) avatarBox.innerHTML = typeof getAvatarSvg === 'function' ? getAvatarSvg('avatar-neon-hacker') : '';
        if (nickBox) nickBox.innerText = 'Player ' + playerId;
        if (idBox) idBox.innerText = playerId;
        if (statusBox) statusBox.innerText = window.i18n.t('social.status_offline');

        if (btnChat) {
          btnChat.onclick = () => {
            modal.classList.add('hidden');
            document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
            if (window.gameHubChat && window.gameHubChat.openDirectChat) {
              window.gameHubChat.openDirectChat(playerId);
            }
          };
        }

        if (btnInvite) {
          btnInvite.onclick = () => {
            modal.classList.add('hidden');
            window.gameHubCatalog.openInviteModalForPlayer(playerId);
          };
        }

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

    const avatarSvg = typeof getAvatarSvg === 'function' ? getAvatarSvg(invite.from ? invite.from.avatar : 'avatar-cyber-samurai') : '';

    toast.innerHTML = `
      <div class="toast-top">
        <div class="toast-avatar">
          ${avatarSvg}
        </div>
        <div class="toast-details">
          <div class="toast-from-name">${invite.from.nickname} (${invite.from.id})</div>
          <div class="toast-game-line">${window.i18n.t('toast.invite_body', { game: invite.gameTitle })}</div>
          ${invite.message ? `<div class="toast-msg-quote">«${invite.message}»</div>` : ''}
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
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `simple-toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
      <span class="toast-text">${text}</span>
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

function initGameHub() {
  if (!window.app) {
    window.app = new GameHubApp();
    window.app.init();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGameHub);
} else {
  initGameHub();
}
