// GameHub Internationalization (i18n) Engine with Gamification, Leaderboards & Achievements
const TRANSLATIONS = {
  en: {
    // Navigation & Header
    "nav.catalog": "Game Catalog",
    "nav.chat": "Chat & Lounge",
    "nav.players": "Players",
    "nav.leaderboard": "Leaderboard",
    "nav.achievements": "Achievements",
    "header.search_placeholder": "Search by ID (#GH-XXXX)...",
    "header.add_game": "Add Game",
    "header.player_default": "Player",

    // Hero Banner
    "hero.title": "Cyber Platform for Your Games",
    "hero.subtitle": "Play HTML5 games, chat in real-time, level up your profile, and compete on the global leaderboard!",
    "hero.my_id_label": "Your Unique ID",
    "hero.copy_id": "Copy ID for Friends",
    "hero.copied_toast": "ID {id} copied to clipboard! Share it with friends.",
    "hero.level_tag": "Level {level}",

    // Catalog & Filters
    "catalog.all": "All Games",
    "catalog.puzzles": "Puzzles",
    "catalog.arcades": "Arcades",
    "catalog.multiplayer": "PvP / Multiplayer",
    "catalog.github": "GitHub Projects",
    "catalog.search_placeholder": "Search by title or tags...",
    "catalog.no_games_title": "No games found",
    "catalog.no_games_desc": "Try changing the filter or add a new game from GitHub!",
    "catalog.play": "Play",
    "catalog.invite": "Invite",
    "catalog.hit_badge": "Hot",
    "catalog.pvp_badge": "PvP Duel",
    "catalog.new_badge": "New",

    // In-Game HUD & Viewport
    "game.back_to_hub": "Back to Hub",
    "game.invite_by_id": "Invite by ID",
    "game.ingame_chat": "In-Game Chat",
    "game.fullscreen": "Fullscreen",
    "game.drawer_title": "In-Game Chat",
    "game.drawer_desc": "Chat with friends and accept game invites without closing your current game!",
    "game.close_chat": "Close Chat",
    "game.open_full_chat": "Open Full Chat",

    // Social & Chat
    "social.online_players": "Online Players",
    "social.global_lounge": "Global Lounge",
    "social.global_tab": "💬 Global Lounge",
    "social.input_placeholder_global": "Message in Global Lounge...",
    "social.input_placeholder_dm": "Private message for {id}...",
    "social.quick_invite_tooltip": "Invite companion to game",
    "social.send_tooltip": "Send message",
    "social.status_online": "Online",
    "social.status_ingame": "Playing: {game}",
    "social.status_away": "Away",
    "social.status_offline": "Offline",
    "social.you": "(You)",
    "social.welcome_global": "Welcome to GameHub Global Lounge! Chat, earn XP, and find gaming partners.",
    "social.dm_intro": "This is the start of your direct conversation with {id}. Messages arrive instantly.",
    "social.card_chat": "Message",
    "social.card_invite": "Invite",
    "social.invite_in_chat": "🎮 Game Invitation: {game}",
    "social.accept_and_play": "Accept & Play",
    "social.invite_sent_tag": "Invitation sent",

    // Leaderboard Section
    "leaderboard.title": "Cyber Hall of Fame",
    "leaderboard.subtitle": "Climb ranks, earn XP from matches and achievements, and secure top spots in games!",
    "leaderboard.filter_xp": "🏆 Total XP & Levels",
    "leaderboard.filter_poly": "⚔️ PolyBattler 3D",
    "leaderboard.filter_chess": "♟️ 3D Chess",
    "leaderboard.filter_alchemist": "🧪 Phantom Alchemist",
    "leaderboard.filter_snake": "🐍 Cyber Snake High Scores",
    "leaderboard.filter_pong": "🏓 Cyber Pong Wins",
    "leaderboard.filter_matrix": "🧱 Matrix Fall Lines",
    "leaderboard.col_rank": "Rank",
    "leaderboard.col_player": "Player",
    "leaderboard.col_level": "Level",
    "leaderboard.col_score": "Score / XP",
    "leaderboard.col_achievements": "Badges",
    "leaderboard.col_action": "Action",
    "leaderboard.challenge_btn": "Challenge",
    "leaderboard.empty": "No scores recorded yet. Be the first to set a record!",

    // Achievements Section & Modal
    "achievements.modal_title": "Cyber Achievements",
    "achievements.progress_summary": "Unlocked {count} of {total} ({percent}%)",
    "achievements.filter_all": "All Badges",
    "achievements.filter_unlocked": "Unlocked",
    "achievements.filter_locked": "Locked",
    "achievements.status_unlocked": "Unlocked ✓",
    "achievements.status_locked": "Locked 🔒",
    "achievements.reward_xp": "+{xp} XP",

    // Level Titles
    "level.title_1": "Novice",
    "level.title_2": "Apprentice",
    "level.title_3": "Cyber Runner",
    "level.title_4": "Neon Specialist",
    "level.title_5": "Matrix Veteran",
    "level.title_6": "Cyber Champion",
    "level.title_7": "Grid Master",
    "level.title_8": "Grandmaster",
    "level.title_9": "Cyber Legend",
    "level.title_10": "Transhuman God",

    // Onboarding Modal
    "onboard.title": "Welcome to GameHub!",
    "onboard.desc": "Choose your gaming nickname and avatar. You will be automatically assigned a unique ID for instant search, leveling, and multiplayer invites.",
    "onboard.nickname_label": "Your Nickname:",
    "onboard.nickname_placeholder": "Enter nickname...",
    "onboard.random_btn": "🎲 Random",
    "onboard.avatar_label": "Choose Avatar:",
    "onboard.tip": "💡 <b>How it works:</b> Earn XP by playing games, messaging in lounge, and challenging friends by ID (e.g. <code>#GH-48F1</code>)!",
    "onboard.submit": "Enter GameHub 🚀",

    // Edit Profile Modal
    "profile.title": "Edit Profile",
    "profile.nickname_label": "Nickname:",
    "profile.avatar_label": "Change Avatar:",
    "profile.cancel": "Cancel",
    "profile.save": "Save Changes",
    "profile.saved_toast": "Profile updated successfully!",

    // Add Game Modal
    "add_game.title": "Add Game from GitHub",
    "add_game.guide_title": "📦 How to connect a game repository:",
    "add_game.guide_step1": "1. Clone or download any HTML5 web game from GitHub into <code>public/games/your-game-name/</code>.",
    "add_game.guide_step2": "2. Or provide a direct live link to GitHub Pages (e.g. <code>https://user.github.io/game/</code>).",
    "add_game.guide_step3": "3. Fill in this form — the game will immediately appear in the GameHub catalog!",
    "add_game.name_label": "Game Title *",
    "add_game.name_placeholder": "e.g. Cyber Drift",
    "add_game.category_label": "Category *",
    "add_game.cat_arcade": "Arcade",
    "add_game.cat_puzzle": "Puzzle",
    "add_game.cat_action": "Action",
    "add_game.cat_racing": "Racing",
    "add_game.cat_rpg": "RPG",
    "add_game.cat_strategy": "Strategy",
    "add_game.path_label": "Game Path or URL *",
    "add_game.path_placeholder": "e.g. /games/cyber-drift/index.html or URL",
    "add_game.github_label": "GitHub Repository URL (Optional)",
    "add_game.desc_label": "Description",
    "add_game.desc_placeholder": "Short summary of gameplay mechanics...",
    "add_game.tags_label": "Tags (comma-separated)",
    "add_game.tags_placeholder": "Retro, 2D, Pixels",
    "add_game.author_label": "Author / Credit",
    "add_game.icon_label": "Icon",
    "add_game.multiplayer_check": "Supports Multiplayer / Co-op",
    "add_game.color_tooltip": "Card accent color",
    "add_game.cancel": "Cancel",
    "add_game.submit": "Add to Catalog",
    "add_game.success": "Game «{title}» successfully added to GameHub! (+200 XP)",

    // Invite Modal
    "invite.title": "Invite to Game",
    "invite.target_id_label": "Recipient Player ID:",
    "invite.target_id_placeholder": "e.g. GH-48F1",
    "invite.select_game_label": "Select Game:",
    "invite.message_label": "Message (Optional):",
    "invite.message_placeholder": "Let's play a match together!",
    "invite.cancel": "Cancel",
    "invite.send": "Send Invitation",
    "invite.sent_success": "Game invitation for «{game}» sent to player {id}!",
    "invite.select_target_alert": "Please select a specific player tab or list item to send an invite!",

    // Notifications & Toasts
    "toast.invite_header": "🎮 {nick} ({id})",
    "toast.invite_body": "Invites you to play <b>{game}</b>",
    "toast.accept": "Accept",
    "toast.decline": "Decline",
    "toast.invite_accepted_by_other": "Player {nick} accepted your invite to «{game}»! Starting session...",
    "toast.invite_declined_by_other": "Player {nick} declined the game invitation.",
    "toast.level_up": "⚡ LEVEL UP! You reached Level {level} ({title})!",
    "toast.achievement_unlocked": "🏆 ACHIEVEMENT UNLOCKED: {title} (+{xp} XP)!"
  },

  ru: {
    // Navigation & Header
    "nav.catalog": "Каталог игр",
    "nav.chat": "Чат и Лаундж",
    "nav.players": "Игроки",
    "nav.leaderboard": "Доска лидеров",
    "nav.achievements": "Достижения",
    "header.search_placeholder": "Поиск по ID (#GH-XXXX)...",
    "header.add_game": "Добавить игру",
    "header.player_default": "Игрок",

    // Hero Banner
    "hero.title": "Кибер-платформа для твоих игр",
    "hero.subtitle": "Запускайте браузерные HTML5 игры, общайтесь в реальном времени, повышайте уровень и соревнуйтесь на доске лидеров!",
    "hero.my_id_label": "Твой уникальный ID",
    "hero.copy_id": "Скопировать ID для друзей",
    "hero.copied_toast": "ID {id} скопирован в буфер обмена! Отправьте его другу.",
    "hero.level_tag": "Уровень {level}",

    // Catalog & Filters
    "catalog.all": "Все игры",
    "catalog.puzzles": "Головоломки",
    "catalog.arcades": "Аркады",
    "catalog.multiplayer": "PvP / Мультиплеер",
    "catalog.github": "GitHub проекты",
    "catalog.search_placeholder": "Поиск по названию или тегам...",
    "catalog.no_games_title": "Игры не найдены",
    "catalog.no_games_desc": "Попробуйте изменить категорию поиска или добавьте новую игру из GitHub!",
    "catalog.play": "Играть",
    "catalog.invite": "Пригласить",
    "catalog.hit_badge": "Хит",
    "catalog.pvp_badge": "PvP Дуэль",
    "catalog.new_badge": "Новинка",

    // In-Game HUD & Viewport
    "game.back_to_hub": "В хаб",
    "game.invite_by_id": "Пригласить по ID",
    "game.ingame_chat": "Чат в игре",
    "game.fullscreen": "На весь экран",
    "game.drawer_title": "Чат в игре",
    "game.drawer_desc": "Общайтесь в лаундже и принимайте приглашения, не закрывая игровой процесс!",
    "game.close_chat": "Закрыть чат",
    "game.open_full_chat": "Перейти в полный чат",

    // Social & Chat
    "social.online_players": "Игроки в сети",
    "social.global_lounge": "Общий Лаундж",
    "social.global_tab": "💬 Общий Лаундж",
    "social.input_placeholder_global": "Сообщение в общий Лаундж...",
    "social.input_placeholder_dm": "Личное сообщение для {id}...",
    "social.quick_invite_tooltip": "Пригласить собеседника в игру",
    "social.send_tooltip": "Отправить",
    "social.status_online": "В сети",
    "social.status_ingame": "В игре: {game}",
    "social.status_away": "Отошел",
    "social.status_offline": "Не в сети",
    "social.you": "(Вы)",
    "social.welcome_global": "Добро пожаловать в общий чат GameHub! Общайтесь, зарабатывайте опыт и ищите напарников.",
    "social.dm_intro": "Это начало личной переписки с {id}. Сообщения доставляются мгновенно.",
    "social.card_chat": "Написать",
    "social.card_invite": "Пригласить",
    "social.invite_in_chat": "🎮 Приглашение в игру: {game}",
    "social.accept_and_play": "Принять и играть",
    "social.invite_sent_tag": "Приглашение отправлено",

    // Leaderboard Section
    "leaderboard.title": "Зал Кибер-Славы",
    "leaderboard.subtitle": "Повышайте уровень, зарабатывайте опыт в матчах и ставьте рекорды на доске лучших игроков!",
    "leaderboard.filter_xp": "🏆 Общий опыт и Уровни",
    "leaderboard.filter_poly": "⚔️ PolyBattler 3D",
    "leaderboard.filter_chess": "♟️ Кибер-Шахматы 3D",
    "leaderboard.filter_alchemist": "🧪 Phantom Alchemist",
    "leaderboard.filter_snake": "🐍 Рекорды Cyber Snake",
    "leaderboard.filter_pong": "🏓 Победы Cyber Pong",
    "leaderboard.filter_matrix": "🧱 Линии Matrix Fall",
    "leaderboard.col_rank": "Место",
    "leaderboard.col_player": "Игрок",
    "leaderboard.col_level": "Уровень",
    "leaderboard.col_score": "Очки / XP",
    "leaderboard.col_achievements": "Значки",
    "leaderboard.col_action": "Действие",
    "leaderboard.challenge_btn": "Вызов",
    "leaderboard.empty": "Пока нет рекордов. Станьте первым чемпионом!",

    // Achievements Section & Modal
    "achievements.modal_title": "Кибер-Достижения",
    "achievements.progress_summary": "Открыто {count} из {total} ({percent}%)",
    "achievements.filter_all": "Все значки",
    "achievements.filter_unlocked": "Открытые",
    "achievements.filter_locked": "Закрытые",
    "achievements.status_unlocked": "Получено ✓",
    "achievements.status_locked": "Заблокировано 🔒",
    "achievements.reward_xp": "+{xp} XP",

    // Level Titles
    "level.title_1": "Новичок",
    "level.title_2": "Ученик",
    "level.title_3": "Кибер-бегун",
    "level.title_4": "Неоновый спец",
    "level.title_5": "Ветеран матрицы",
    "level.title_6": "Кибер-чемпион",
    "level.title_7": "Мастер сетки",
    "level.title_8": "Грандмастер",
    "level.title_9": "Кибер-легенда",
    "level.title_10": "Кибер-бог",

    // Onboarding Modal
    "onboard.title": "Добро пожаловать в GameHub!",
    "onboard.desc": "Выберите игровой никнейм и аватарку. Вам будет автоматически назначен уникальный ID для мгновенного поиска, прокачки уровней и приглашений в игры.",
    "onboard.nickname_label": "Ваш Никнейм:",
    "onboard.nickname_placeholder": "Введите никнейм...",
    "onboard.random_btn": "🎲 Случайный",
    "onboard.avatar_label": "Выберите Аватар:",
    "onboard.tip": "💡 <b>Как это работает:</b> Зарабатывайте опыт в играх и чате, бросайте вызовы друзьям по уникальному ID (например, <code>#GH-48F1</code>)!",
    "onboard.submit": "Войти в игру 🚀",

    // Edit Profile Modal
    "profile.title": "Редактирование профиля",
    "profile.nickname_label": "Никнейм:",
    "profile.avatar_label": "Сменить Аватар:",
    "profile.cancel": "Отмена",
    "profile.save": "Сохранить",
    "profile.saved_toast": "Профиль успешно обновлен!",

    // Add Game Modal
    "add_game.title": "Добавить игру из GitHub",
    "add_game.guide_title": "📦 Как подключить репозиторий с игрой:",
    "add_game.guide_step1": "1. Склонируйте или скачайте HTML5 игру с GitHub в папку <code>public/games/название-игры/</code>.",
    "add_game.guide_step2": "2. Либо укажите прямую ссылку на GitHub Pages (например, <code>https://user.github.io/game/</code>).",
    "add_game.guide_step3": "3. Заполните форму ниже — игра сразу появится в общем каталоге GameHub!",
    "add_game.name_label": "Название игры *",
    "add_game.name_placeholder": "Например: Cyber Drift",
    "add_game.category_label": "Категория *",
    "add_game.cat_arcade": "Аркада",
    "add_game.cat_puzzle": "Головоломка",
    "add_game.cat_action": "Экшен",
    "add_game.cat_racing": "Гонки",
    "add_game.cat_rpg": "RPG",
    "add_game.cat_strategy": "Стратегия",
    "add_game.path_label": "Путь или URL игры *",
    "add_game.path_placeholder": "Например: /games/cyber-drift/index.html или URL",
    "add_game.github_label": "Ссылка на репозиторий GitHub (опционально)",
    "add_game.desc_label": "Описание",
    "add_game.desc_placeholder": "Краткое описание механик игры...",
    "add_game.tags_label": "Теги (через запятую)",
    "add_game.tags_placeholder": "Ретро, 2D, Пиксели",
    "add_game.author_label": "Автор / Ник",
    "add_game.icon_label": "Иконка",
    "add_game.multiplayer_check": "Поддерживает мультиплеер / дуэль",
    "add_game.color_tooltip": "Цвет подсветки карточки",
    "add_game.cancel": "Отмена",
    "add_game.submit": "Добавить в каталог",
    "add_game.success": "Игра «{title}» успешно добавлена в GameHub! (+200 XP)",

    // Invite Modal
    "invite.title": "Пригласить в игру",
    "invite.target_id_label": "ID игрока получателя:",
    "invite.target_id_placeholder": "Например: GH-48F1",
    "invite.select_game_label": "Выберите игру:",
    "invite.message_label": "Сообщение (необязательно):",
    "invite.message_placeholder": "Давай сыграем партию!",
    "invite.cancel": "Отмена",
    "invite.send": "Отправить приглашение",
    "invite.sent_success": "Приглашение в игру «{game}» успешно отправлено игроку {id}!",
    "invite.select_target_alert": "Выберите конкретного игрока во вкладках или списке, чтобы отправить приглашение!",

    // Notifications & Toasts
    "toast.invite_header": "🎮 {nick} ({id})",
    "toast.invite_body": "Приглашает сыграть в <b>{game}</b>",
    "toast.accept": "Принять",
    "toast.decline": "Отклонить",
    "toast.invite_accepted_by_other": "Игрок {nick} принял ваше приглашение в «{game}»! Запуск игры...",
    "toast.invite_declined_by_other": "Игрок {nick} отклонил приглашение в игру.",
    "toast.level_up": "⚡ НОВЫЙ УРОВЕНЬ! Вы достигли Уровня {level} ({title})!",
    "toast.achievement_unlocked": "🏆 ДОСТИЖЕНИЕ РАЗБЛОКИРОВАНО: {title} (+{xp} XP)!"
  }
};

class I18nManager {
  constructor() {
    const saved = localStorage.getItem('gamehub_lang');
    this.currentLang = (saved === 'ru' || saved === 'en') ? saved : 'en';
  }

  t(key, params = {}) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS['en'];
    let text = dict[key] || TRANSLATIONS['en'][key] || key;
    for (const [param, val] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), val);
    }
    return text;
  }

  getLevelTitle(level) {
    const safeLvl = Math.min(10, Math.max(1, level));
    return this.t(`level.title_${safeLvl}`);
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'ru') return;
    this.currentLang = lang;
    localStorage.setItem('gamehub_lang', lang);
    document.documentElement.lang = lang;
    this.updateDOM();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  toggleLanguage() {
    this.setLanguage(this.currentLang === 'en' ? 'ru' : 'en');
  }

  getLanguage() {
    return this.currentLang;
  }

  updateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.innerHTML = this.t(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', this.t(key));
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', this.t(key));
      }
    });

    const langBtnText = document.getElementById('langToggleText');
    if (langBtnText) {
      langBtnText.innerText = this.currentLang.toUpperCase();
    }
  }
}

window.i18n = new I18nManager();
