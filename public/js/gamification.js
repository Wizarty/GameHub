// GameHub Gamification: Levels, XP, Leaderboard & Achievements (NEXT SESSION Engine)
class GameHubGamification {
  constructor() {
    this.achievements = [];
    this.playerAchievements = new Set();
    this.currentLbCategory = 'xp';
    this.achFilter = 'all';

    this.playerStats = {
      xp: 0,
      level: 1,
      levelInfo: null,
      scores: {}
    };
  }

  async init() {
    this.setupListeners();
    await this.fetchAchievements().catch(e => console.warn('fetchAchievements error:', e));
    this.fetchAndRenderLeaderboard(this.currentLbCategory);

    // Listen to Socket events
    if (window.hubSocket && window.hubSocket.on) {
      window.hubSocket.on('player:ready', ({ player }) => {
        if (player) {
          this.updatePlayerStats(player);
        }
      });

      window.hubSocket.on('player:stats_update', (data) => {
        this.updatePlayerStats(data);
      });

      window.hubSocket.on('player:level_up', (data) => {
        this.showLevelUpCelebration(data.level, data.xp, data.levelInfo);
      });

      window.hubSocket.on('achievement:unlocked', (ach) => {
        this.showAchievementCelebration(ach);
        this.playerAchievements.add(ach.id);
        this.renderPlayerStatsUI();
      });
    }

    window.addEventListener('languageChanged', () => {
      this.renderPlayerStatsUI();
      this.fetchAndRenderLeaderboard(this.currentLbCategory);
      if (!document.getElementById('achievementsModal')?.classList.contains('hidden')) {
        this.renderAchievementsModal();
      }
    });

    // Listen to game events inside iframes
    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'GAMEHUB_GAME_OVER') {
        this.submitGameScore(e.data.gameId, e.data.score || 0, e.data);
      }
    });
  }

  async fetchAchievements() {
    try {
      const res = await fetch('/api/achievements');
      const data = await res.json();
      if (data.success) {
        this.achievements = data.achievements;
        this.renderFeaturedAchievements();
      }
    } catch (e) {
      console.error('Error fetching achievements:', e);
    }
  }

  setupListeners() {
    // Leaderboard filter buttons
    const lbFilters = document.querySelectorAll('.lb-filter-btn');
    lbFilters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        lbFilters.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentLbCategory = e.currentTarget.dataset.lb || 'xp';
        this.fetchAndRenderLeaderboard(this.currentLbCategory);
      });
    });

    // Achievements filter buttons
    const achFilterBtns = document.querySelectorAll('.ach-filter-btn');
    achFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        achFilterBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.achFilter = e.currentTarget.dataset.filter || 'all';
        this.renderAchievementsModal();
      });
    });

    // Open Achievements modal triggers
    ['btnHeroAchievements', 'navAchievements', 'mobNavAchievements', 'btnViewAllAch'].forEach(btnId => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('click', () => this.openAchievementsModal());
      }
    });
  }

  updatePlayerStats(data) {
    if (!data) return;
    this.playerStats.xp = typeof data.xp === 'number' ? data.xp : this.playerStats.xp;
    this.playerStats.level = data.level || (data.levelInfo ? data.levelInfo.level : this.playerStats.level);
    this.playerStats.levelInfo = data.levelInfo || this.playerStats.levelInfo;

    if (data.achievements && Array.isArray(data.achievements)) {
      this.playerAchievements = new Set(data.achievements);
    }
    if (data.scores) {
      this.playerStats.scores = data.scores;
    }

    this.renderPlayerStatsUI();
  }

  renderPlayerStatsUI() {
    const lvl = this.playerStats.level || 1;
    const xp = this.playerStats.xp || 0;
    const lvlTitle = window.i18n ? window.i18n.getLevelTitle(lvl) : `Rank ${lvl}`;

    // Header level badge
    const headerLvlBadge = document.getElementById('headerPlayerLevelBadge');
    if (headerLvlBadge) {
      headerLvlBadge.innerText = `Lv.${lvl}`;
    }

    // Hero banner / Progress section level badges
    const heroLvlBadge = document.getElementById('heroLevelBadge');
    if (heroLvlBadge) {
      heroLvlBadge.innerText = `${window.i18n.t('hero.level_tag', { level: lvl })} · ${lvlTitle}`;
    }

    const progressLvlBadge = document.getElementById('progressUserLevelBadge');
    if (progressLvlBadge) {
      progressLvlBadge.innerText = `Lv.${lvl} · ${lvlTitle}`;
    }

    // XP Progress Bars
    const xpBars = [
      document.getElementById('heroXpProgressBar'),
      document.getElementById('progressXpProgressBar')
    ];
    const xpTexts = [
      document.getElementById('heroXpText'),
      document.getElementById('progressXpText')
    ];

    if (this.playerStats.levelInfo) {
      const li = this.playerStats.levelInfo;
      xpBars.forEach(b => { if (b) b.style.width = `${Math.max(4, li.progressPercent)}%`; });
      xpTexts.forEach(t => { if (t) t.innerText = `${li.xpInCurrentLevel} / ${li.xpNeededForLevel} XP (${li.progressPercent}%)`; });
    } else {
      xpBars.forEach(b => { if (b) b.style.width = '10%'; });
      xpTexts.forEach(t => { if (t) t.innerText = `${xp} XP`; });
    }

    // Achievements counter badge in Progress section
    const achCountBadge = document.getElementById('progressAchCount');
    if (achCountBadge) {
      achCountBadge.innerText = `${this.playerAchievements.size} / ${this.achievements.length || 14}`;
    }

    this.renderFeaturedAchievements();
  }

  renderFeaturedAchievements() {
    const box = document.getElementById('featuredAchievementsGrid');
    if (!box) return;
    box.innerHTML = '';
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    const featured = this.achievements.slice(0, 4);
    featured.forEach(ach => {
      const isUnlocked = this.playerAchievements.has(ach.id);
      const title = lang === 'ru' ? ach.title_ru : ach.title_en;
      const desc = lang === 'ru' ? ach.desc_ru : ach.desc_en;

      const item = document.createElement('div');
      item.className = `featured-ach-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      item.innerHTML = `
        <div class="ach-mini-icon">${ach.icon}</div>
        <div class="ach-mini-info">
          <div class="ach-mini-title">${title}</div>
          <div class="ach-mini-desc">${desc}</div>
        </div>
        <div class="ach-mini-right">
          <span class="ach-mini-xp">+${ach.xp} XP</span>
          <span class="ach-mini-status">${isUnlocked ? '✓' : '🔒'}</span>
        </div>
      `;
      box.appendChild(item);
    });
  }

  async submitGameScore(gameId, score, metadata = {}) {
    const player = window.hubSocket?.player;
    if (!player) return;

    try {
      const res = await fetch('/api/player/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: player.id,
          gameId,
          score,
          metadata
        })
      });
      const data = await res.json();
      if (data.success) {
        if (data.levelInfo) {
          this.updatePlayerStats({ xp: data.levelInfo.xp, level: data.levelInfo.level, levelInfo: data.levelInfo });
        }
        if (data.xpGained > 0) {
          window.app.showSimpleToast(`+${data.xpGained} XP earned from ${gameId}!`, 'success');
        }
      }
    } catch (e) {
      console.error('Error submitting score:', e);
    }
  }

  showLevelUpCelebration(level, xp, levelInfo) {
    const lvlTitle = window.i18n ? window.i18n.getLevelTitle(level) : `Rank ${level}`;
    const modal = document.getElementById('levelUpModal');
    if (modal) {
      document.getElementById('lvlUpNumber').innerText = level;
      document.getElementById('lvlUpTitle').innerText = lvlTitle;
      modal.classList.remove('hidden');
    }

    if (window.hubSocket?.playNotificationSound) window.hubSocket.playNotificationSound('invite');
    if (window.app?.showSimpleToast) window.app.showSimpleToast(window.i18n.t('toast.level_up', { level, title: lvlTitle }), 'success');
  }

  showAchievementCelebration(ach) {
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const title = lang === 'ru' ? ach.title_ru : ach.title_en;

    if (window.hubSocket?.playNotificationSound) window.hubSocket.playNotificationSound('invite');
    if (window.app?.showSimpleToast) window.app.showSimpleToast(window.i18n.t('toast.achievement_unlocked', { title, xp: ach.xp }), 'success');
  }

  async fetchAndRenderLeaderboard(category = 'xp') {
    const container = document.getElementById('leaderboardList');
    const podiumBox = document.getElementById('leaderboardPodium');
    if (!container) return;

    container.innerHTML = `<div class="lb-loading">Loading rankings...</div>`;

    try {
      const res = await fetch(`/api/leaderboard?category=${category}`);
      const data = await res.json();
      if (!data.success || !data.leaderboard || data.leaderboard.length === 0) {
        container.innerHTML = `<div class="lb-empty">${window.i18n.t('leaderboard.empty')}</div>`;
        if (podiumBox) podiumBox.innerHTML = '';
        return;
      }

      const list = data.leaderboard;
      const top3 = list.slice(0, 3);

      // Render Top 3 Podium
      this.renderPodium(top3, category);

      // Render Ranking Table
      container.innerHTML = '';
      const table = document.createElement('div');
      table.className = 'lb-table';

      table.innerHTML = `
        <div class="lb-row lb-header-row">
          <div class="lb-col-rank">${window.i18n.t('leaderboard.col_rank')}</div>
          <div class="lb-col-player">${window.i18n.t('leaderboard.col_player')}</div>
          <div class="lb-col-level">${window.i18n.t('leaderboard.col_level')}</div>
          <div class="lb-col-score">${category === 'xp' ? 'Total XP' : 'High Score'}</div>
          <div class="lb-col-ach">${window.i18n.t('leaderboard.col_achievements')}</div>
          <div class="lb-col-action">${window.i18n.t('leaderboard.col_action')}</div>
        </div>
      `;

      list.forEach((p, idx) => {
        const row = document.createElement('div');
        row.className = `lb-row ${idx < 3 ? 'lb-top-row' : ''}`;

        let rankBadge = `${idx + 1}`;
        if (idx === 0) rankBadge = '1';
        else if (idx === 1) rankBadge = '2';
        else if (idx === 2) rankBadge = '3';

        const avatarSvg = typeof getAvatarSvg === 'function' ? getAvatarSvg(p.avatar) : '';
        const myId = window.hubSocket?.player ? window.hubSocket.player.id : null;
        const isSelf = p.id === myId;
        const scoreVal = category === 'xp' ? `${p.xp} XP` : `${p.score} pts`;

        row.innerHTML = `
          <div class="lb-col-rank">
            <span class="lb-rank-tag rank-${idx + 1}">${rankBadge}</span>
          </div>
          <div class="lb-col-player">
            <div class="lb-player-cell">
              <div class="lb-avatar">${avatarSvg}</div>
              <div class="lb-info">
                <span class="lb-nick">${p.nickname} ${isSelf ? `(${window.i18n.t('social.you')})` : ''}</span>
                <span class="lb-id">${p.id}</span>
              </div>
            </div>
          </div>
          <div class="lb-col-level">
            <span class="lb-level-badge">Lv.${p.level}</span>
          </div>
          <div class="lb-col-score">
            <span class="lb-score-val">${scoreVal}</span>
          </div>
          <div class="lb-col-ach">
            <span class="lb-ach-count">${p.achievementsCount}</span>
          </div>
          <div class="lb-col-action">
            ${!isSelf ? `
              <button class="btn-lb-action" onclick="window.gameHubCatalog.openInviteModalForPlayer('${p.id}')">
                <span>${window.i18n.t('leaderboard.challenge_btn')}</span>
              </button>
            ` : '<span class="lb-self-dash">—</span>'}
          </div>
        `;

        table.appendChild(row);
      });

      container.appendChild(table);

    } catch (e) {
      console.error(e);
      container.innerHTML = `<div class="lb-error">Failed to load leaderboard.</div>`;
    }
  }

  renderPodium(top3, category) {
    const podiumBox = document.getElementById('leaderboardPodium');
    if (!podiumBox) return;
    podiumBox.innerHTML = '';

    if (top3.length === 0) return;

    // Rearrange visually: 2nd place on left, 1st place in center (tallest), 3rd place on right
    const order = [];
    if (top3[1]) order.push({ data: top3[1], place: 2, class: 'place-2' });
    if (top3[0]) order.push({ data: top3[0], place: 1, class: 'place-1' });
    if (top3[2]) order.push({ data: top3[2], place: 3, class: 'place-3' });

    order.forEach(item => {
      const p = item.data;
      const scoreVal = category === 'xp' ? `${p.xp} XP` : `${p.score} pts`;
      const card = document.createElement('div');
      card.className = `podium-card ${item.class}`;

      card.innerHTML = `
        <div class="podium-rank-marker">0${item.place}</div>
        <div class="podium-avatar">
          ${typeof getAvatarSvg === 'function' ? getAvatarSvg(p.avatar) : ''}
        </div>
        <div class="podium-name">${p.nickname}</div>
        <div class="podium-id">${p.id}</div>
        <div class="podium-score">${scoreVal}</div>
        <div class="podium-level">Level ${p.level}</div>
      `;

      podiumBox.appendChild(card);
    });
  }

  openAchievementsModal() {
    this.renderAchievementsModal();
    document.getElementById('achievementsModal')?.classList.remove('hidden');
  }

  renderAchievementsModal() {
    const grid = document.getElementById('achievementsGrid');
    const summaryEl = document.getElementById('achievementsSummary');
    if (!grid) return;
    grid.innerHTML = '';

    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const total = this.achievements.length;
    const unlockedCount = this.playerAchievements.size;
    const percent = total > 0 ? Math.floor((unlockedCount / total) * 100) : 0;

    if (summaryEl) {
      summaryEl.innerText = window.i18n.t('achievements.progress_summary', { count: unlockedCount, total, percent });
    }

    const filtered = this.achievements.filter(ach => {
      const isUnlocked = this.playerAchievements.has(ach.id);
      if (this.achFilter === 'unlocked') return isUnlocked;
      if (this.achFilter === 'locked') return !isUnlocked;
      return true;
    });

    filtered.forEach(ach => {
      const isUnlocked = this.playerAchievements.has(ach.id);
      const title = lang === 'ru' ? ach.title_ru : ach.title_en;
      const desc = lang === 'ru' ? ach.desc_ru : ach.desc_en;

      const card = document.createElement('div');
      card.className = `ach-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      card.innerHTML = `
        <div class="ach-icon-box">
          <span class="ach-icon">${ach.icon}</span>
        </div>
        <div class="ach-content">
          <div class="ach-top-line">
            <h4 class="ach-title">${title}</h4>
            <span class="ach-xp-tag">+${ach.xp} XP</span>
          </div>
          <p class="ach-desc">${desc}</p>
          <div class="ach-status">
            ${isUnlocked 
              ? `<span class="ach-unlocked-badge">${window.i18n.t('achievements.status_unlocked')}</span>` 
              : `<span class="ach-locked-badge">${window.i18n.t('achievements.status_locked')}</span>`}
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  }
}

window.gameHubGamification = new GameHubGamification();
