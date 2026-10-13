// GameHub Internationalization (i18n) Engine with NEXT SESSION Redesign
const TRANSLATIONS = {
  en: {
    // Navigation & Header
    "nav.games": "Games",
    "nav.community": "Community",
    "nav.progress": "Progress",
    "nav.creators": "Creators",
    "nav.catalog": "Catalog",
    "nav.chat": "Lounge",
    "nav.players": "Players",
    "nav.leaderboard": "Leaderboard",
    "nav.achievements": "Badges",
    "header.search_placeholder": "Search player by ID (#GH-XXXX)...",
    "header.add_game": "Add Game",
    "header.player_default": "Player",
    "header.guest_login": "Sign In",

    // Hero Section & Launch Deck
    "hero.overline": "GAMEHUB // NEXT SESSION",
    "hero.title": "Your next session starts here",
    "hero.subtitle": "Discover browser games, invite friends, and stay in touch — all in one hub.",
    "hero.cta_play": "Choose a Game",
    "hero.cta_how": "How it Works",
    "hero.my_id_label": "Your Unique ID",
    "hero.copy_id": "Copy ID",
    "hero.copied_toast": "ID {id} copied to clipboard! Share it with friends.",
    "hero.level_tag": "Level {level}",
    "deck.badge_featured": "FEATURED SESSION",
    "deck.launch_btn": "Launch Session",
    "deck.invite_btn": "Invite by ID",
    "deck.mode_single": "Single-player",
    "deck.mode_pvp": "PvP Duel & Multiplayer",
    "deck.mode_ai": "Cyber AI Opponent",

    // Discover & Catalog
    "discover.label": "// 01 · SESSION CATALOG",
    "discover.title": "What are we playing?",
    "discover.subtitle": "Pick your mood. The game handles the rest.",
    "catalog.all": "All Games",
    "catalog.action": "Action",
    "catalog.puzzles": "Puzzles",
    "catalog.arcades": "Arcades",
    "catalog.multiplayer": "PvP / 2P",
    "catalog.github": "GitHub Projects",
    "catalog.search_placeholder": "Search by game title, genre or tag...",
    "catalog.no_games_title": "No games found",
    "catalog.no_games_desc": "Try resetting the filters or add a new game from GitHub repository.",
    "catalog.play": "Play",
    "catalog.invite": "Invite",
    "catalog.hit_badge": "Hot",
    "catalog.pvp_badge": "PvP Duel",
    "catalog.new_badge": "New",

    // Connect & Social
    "connect.label": "// 02 · COMMUNITY & MULTIPLAYER",
    "connect.title": "Games end. Connection doesn't",
    "connect.subtitle": "Find teammates by player ID, send instant challenges, and keep chatting right inside your match.",
    "connect.step1_title": "1. Player ID",
    "connect.step1_desc": "Unique player tag (#GH-XXXX) for instant matchmaking without bloated friend requests.",
    "connect.step2_title": "2. 1-Click Invite",
    "connect.step2_desc": "Pick any game and dispatch real-time invitations with custom challenge notes.",
    "connect.step3_title": "3. In-Game HUD",
    "connect.step3_desc": "A companion sliding chat drawer opens directly inside the match without stopping gameplay.",
    "connect.search_btn": "Find Player",
    "connect.search_placeholder": "Enter player ID (e.g. GH-48F1)...",
    "connect.example_badge": "UI Architecture",
    "connect.online_badge": "Players Online",
    "connect.open_chat": "Open Full Lounge",

    // Progress & Profile
    "progress.label": "// 03 · PROGRESSION",
    "progress.title": "Your profile. Your progress",
    "progress.subtitle": "Every match, victory, and message awards experience. Personal gamer identity with zero paywalls.",
    "progress.guest_notice": "Guest Session: create your profile to persist your high scores, XP, and badges.",
    "progress.create_profile_btn": "Create Profile",
    "progress.view_all_ach": "View All Badges",
    "progress.achievements_heading": "Recent Milestones",
    "progress.hall_heading": "Hall of Fame",

    // Build & Creators
    "build.label": "// 04 · CREATORS & DEVELOPERS",
    "build.title": "Built a game? Give it an audience",
    "build.subtitle": "GameHub is built entirely on open web standards. Connect your HTML5 games from GitHub or web URLs in minutes.",
    "build.step1_title": "1. HTML5 / WebGL",
    "build.step1_desc": "Three.js, Canvas, Phaser or Vite bundle hosted locally or on GitHub Pages.",
    "build.step2_title": "2. Hub Manifest",
    "build.step2_desc": "Simple registration with title, tags, cover and gameplay metadata via /api/games.",
    "build.step3_title": "3. Secure Sandbox",
    "build.step3_desc": "Runs in isolated iframe with postMessage telemetry for XP and high score rewards.",
    "build.step4_title": "4. Instant Play",
    "build.step4_desc": "Immediate catalog presence with multiplayer invites and community reach.",
    "build.add_btn": "Add Game from GitHub",

    // Outro & Footer
    "outro.title": "Your next session\nstarts here",
    "outro.cta": "Explore Catalog",
    "footer.tagline": "Minimalist web gaming station for browser games & social play.",
    "footer.status": "GH-CORE // V2.0 READY // REST + WS",

    // In-Game HUD & Viewport
    "game.back_to_hub": "Back to Hub",
    "game.invite_by_id": "Invite by ID",
    "game.ingame_chat": "In-Game Chat",
    "game.fullscreen": "Fullscreen",
    "game.drawer_title": "In-Game Chat",
    "game.drawer_desc": "Chat with friends and accept game invites without closing your current game!",
    "game.close_chat": "Close Chat",
    "game.open_full_chat": "Open Full Chat",

    // Social & Chat Submodule
    "social.online_players": "Online Players",
    "social.global_lounge": "Global Lounge",
    "social.global_tab": "Global Lounge",
    "social.input_placeholder_global": "Message in Global Lounge...",
    "social.input_placeholder_dm": "Direct message for {id}...",
    "social.quick_invite_tooltip": "Invite companion to game",
    "social.send_tooltip": "Send message",
    "social.status_online": "Online",
    "social.status_ingame": "Playing: {game}",
    "social.status_away": "Away",
    "social.status_offline": "Offline",
    "social.you": "(You)",
    "social.welcome_global": "Welcome to GameHub Global Lounge! Chat, earn XP, and challenge friends.",
    "social.dm_intro": "Direct conversation with {id}. Messages arrive in real-time.",
    "social.card_chat": "Message",
    "social.card_invite": "Invite",
    "social.invite_in_chat": "Game Invitation: {game}",
    "social.accept_and_play": "Accept & Play",
    "social.invite_sent_tag": "Invitation sent",
    "social.mention_header": "Select player for Direct Message:",
    "social.no_players_found": "No players found",

    // Leaderboard Section
    "leaderboard.title": "Cyber Hall of Fame",
    "leaderboard.subtitle": "Climb ranks, earn XP from matches and achievements, and secure top spots in games!",
    "leaderboard.filter_xp": "Total XP & Levels",
    "leaderboard.filter_poly": "PolyBattler 3D",
    "leaderboard.filter_chess": "3D Chess",
    "leaderboard.filter_alchemist": "Phantom Alchemist",
    "leaderboard.filter_snake": "Cyber Snake",
    "leaderboard.filter_pong": "Cyber Pong",
    "leaderboard.filter_matrix": "Matrix Fall",
    "leaderboard.col_rank": "Rank",
    "leaderboard.col_player": "Player",
    "leaderboard.col_level": "Level",
    "leaderboard.col_score": "Score / XP",
    "leaderboard.col_achievements": "Badges",
    "leaderboard.col_action": "Action",
    "leaderboard.challenge_btn": "Challenge",
    "leaderboard.empty": "No scores recorded yet. Be the first to set a record!",

    // Achievements Section & Modal
    "achievements.modal_title": "Achievements",
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
    "onboard.title": "Welcome to GameHub",
    "onboard.desc": "Choose your player nickname and avatar. You will be assigned a unique ID for search, leveling, and multiplayer challenges.",
    "onboard.nickname_label": "Your Nickname:",
    "onboard.nickname_placeholder": "Enter nickname...",
    "onboard.random_btn": "Random",
    "onboard.avatar_label": "Choose Avatar:",
    "onboard.tip": "<b>Next Session:</b> Earn XP across all games, in chat, and when challenging friends by ID (#GH-48F1).",
    "onboard.submit": "Enter GameHub",

    // Edit Profile Modal
    "profile.title": "Edit Profile",
    "profile.nickname_label": "Nickname:",
    "profile.avatar_label": "Change Avatar:",
    "profile.cancel": "Cancel",
    "profile.save": "Save Changes",
    "profile.saved_toast": "Profile updated successfully!",

    // Add Game Modal
    "add_game.title": "Add Game from GitHub",
    "add_game.guide_title": "How to connect a game repository:",
    "add_game.guide_step1": "1. Put HTML5 files into public/games/your-game/ or host on GitHub Pages.",
    "add_game.guide_step2": "2. Provide title, category, path and optional repository link.",
    "add_game.guide_step3": "3. The game will immediately register in GameHub catalog!",
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
    "add_game.success": "Game «{title}» added to GameHub! (+200 XP)",

    // Invite Modal
    "invite.title": "Invite to Game",
    "invite.target_id_label": "Recipient Player ID:",
    "invite.target_id_placeholder": "e.g. GH-48F1",
    "invite.select_game_label": "Select Game:",
    "invite.message_label": "Message (Optional):",
    "invite.message_placeholder": "Let's play a session together!",
    "invite.cancel": "Cancel",
    "invite.send": "Send Invitation",
    "invite.sent_success": "Game invitation for «{game}» sent to player {id}!",
    "invite.select_target_alert": "Please select a specific player tab or list item to send an invite!",

    // Notifications & Toasts
    "toast.invite_header": "{nick} ({id})",
    "toast.invite_body": "Invites you to play <b>{game}</b>",
    "toast.accept": "Accept",
    "toast.decline": "Decline",
    "toast.invite_accepted_by_other": "Player {nick} accepted your invite to «{game}»! Starting session...",
    "toast.invite_declined_by_other": "Player {nick} declined the game invitation.",
    "toast.level_up": "LEVEL UP! You reached Level {level} ({title})!",
    "toast.achievement_unlocked": "ACHIEVEMENT UNLOCKED: {title} (+{xp} XP)!"
  },

  ru: {
    // Navigation & Header
    "nav.games": "Игры",
    "nav.community": "Сообщество",
    "nav.progress": "Прогресс",
    "nav.creators": "Авторам",
    "nav.catalog": "Каталог",
    "nav.chat": "Лаундж",
    "nav.players": "Игроки",
    "nav.leaderboard": "Рейтинг",
    "nav.achievements": "Значки",
    "header.search_placeholder": "Поиск игрока по ID (#GH-XXXX)...",
    "header.add_game": "Добавить игру",
    "header.player_default": "Игрок",
    "header.guest_login": "Войти в профиль",

    // Hero Section & Launch Deck
    "hero.overline": "GAMEHUB // NEXT SESSION",
    "hero.title": "Твоя следующая\nигра — здесь",
    "hero.subtitle": "Открывай браузерные игры, приглашай друзей и оставайся на связи — в одном хабе.",
    "hero.cta_play": "Выбрать игру",
    "hero.cta_how": "Как это работает",
    "hero.my_id_label": "Твой ID",
    "hero.copy_id": "Скопировать ID",
    "hero.copied_toast": "ID {id} скопирован в буфер обмена! Отправьте его другу.",
    "hero.level_tag": "Уровень {level}",
    "deck.badge_featured": "ВЫБРАННАЯ СЕССИЯ",
    "deck.launch_btn": "Запустить игру",
    "deck.invite_btn": "Пригласить по ID",
    "deck.mode_single": "Одиночный режим",
    "deck.mode_pvp": "PvP дуэль и мультиплеер",
    "deck.mode_ai": "Игра против кибер-ИИ",

    // Discover & Catalog
    "discover.label": "// 01 · КАТАЛОГ СЕССИЙ",
    "discover.title": "Во что играем?",
    "discover.subtitle": "Выбери настроение. Остальное — за игрой.",
    "catalog.all": "Все игры",
    "catalog.action": "Экшен",
    "catalog.puzzles": "Головоломки",
    "catalog.arcades": "Аркады",
    "catalog.multiplayer": "PvP / Для двоих",
    "catalog.github": "GitHub проекты",
    "catalog.search_placeholder": "Поиск по названию, жанру или тегу...",
    "catalog.no_games_title": "Игры не найдены",
    "catalog.no_games_desc": "Попробуйте сбросить фильтры или добавьте новую игру из репозитория GitHub.",
    "catalog.play": "Играть",
    "catalog.invite": "Пригласить",
    "catalog.hit_badge": "Хит",
    "catalog.pvp_badge": "PvP Дуэль",
    "catalog.new_badge": "Новинка",

    // Connect & Social
    "connect.label": "// 02 · СООБЩЕСТВО И МУЛЬТИПЛЕЕР",
    "connect.title": "Игры заканчиваются. Общение — нет",
    "connect.subtitle": "Находи напарников по персональному ID, отправляй приглашения и оставайся на связи прямо во время партии.",
    "connect.step1_title": "1. Персональный ID",
    "connect.step1_desc": "Уникальный тег игрока (#GH-XXXX) для мгновенного поиска без громоздких списков друзей.",
    "connect.step2_title": "2. Вызов в 1 клик",
    "connect.step2_desc": "Выбирай игру и отправляй вызов через Socket.io в реальном времени.",
    "connect.step3_title": "3. In-Game HUD",
    "connect.step3_desc": "Выдвижной чат открывается прямо во время матча, не прерывая геймплей.",
    "connect.search_btn": "Найти игрока",
    "connect.search_placeholder": "Введите ID игрока (напр. GH-48F1)...",
    "connect.example_badge": "Пример интерфейса",
    "connect.online_badge": "Игроки в сети",
    "connect.open_chat": "Открыть полный лаундж",

    // Progress & Profile
    "progress.label": "// 03 · ПРОГРЕСС И ДОСТИЖЕНИЯ",
    "progress.title": "Твой профиль. Твой прогресс",
    "progress.subtitle": "Каждая сыгранная партия, победа и сообщение приносят опыт. Персональная игровая карта без платных подписок.",
    "progress.guest_notice": "Гостевая сессия: создайте профиль для сохранения рекордов, опыта и значков.",
    "progress.create_profile_btn": "Создать профиль",
    "progress.view_all_ach": "Все достижения",
    "progress.achievements_heading": "Недавние достижения",
    "progress.hall_heading": "Зал славы",

    // Build & Creators
    "build.label": "// 04 · ДЛЯ РАЗРАБОТЧИКОВ",
    "build.title": "Сделал игру? Дай ей аудиторию",
    "build.subtitle": "GameHub построен на открытых веб-стандартах. Подключай свои HTML5-игры из GitHub репозиториев или веб-хостинга за пару шагов.",
    "build.step1_title": "1. HTML5 / WebGL",
    "build.step1_desc": "Three.js, Canvas, Phaser или сборка на Vite, размещённая локально или на GitHub Pages.",
    "build.step2_title": "2. Манифест хаба",
    "build.step2_desc": "Лаконичная регистрация с названием, жанром, тегами и метаданными через /api/games.",
    "build.step3_title": "3. Безопасный фрейм",
    "build.step3_desc": "Работает в изолированном iframe с postMessage телеметрией для начисления опыта и рекордов.",
    "build.step4_title": "4. Мгновенный запуск",
    "build.step4_desc": "Сразу доступно в каталоге с возможностью сетевых вызовов и охватом игроков.",
    "build.add_btn": "Добавить игру из GitHub",

    // Outro & Footer
    "outro.title": "Следующая сессия\nначинается здесь",
    "outro.cta": "Открыть каталог",
    "footer.tagline": "Минималистичная веб-станция для браузерных игр и общения.",
    "footer.status": "GH-CORE // V2.0 ГОТОВ // REST + WS",

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
    "social.global_tab": "Общий Лаундж",
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
    "social.dm_intro": "Начало личной переписки с {id}. Сообщения доставляются мгновенно.",
    "social.card_chat": "Написать",
    "social.card_invite": "Пригласить",
    "social.invite_in_chat": "Приглашение в игру: {game}",
    "social.accept_and_play": "Принять и играть",
    "social.invite_sent_tag": "Приглашение отправлено",
    "social.mention_header": "Выберите игрока для личных сообщений:",
    "social.no_players_found": "Игроки не найдены",

    // Leaderboard Section
    "leaderboard.title": "Зал славы",
    "leaderboard.subtitle": "Повышайте уровень, зарабатывайте опыт в матчах и ставьте рекорды на доске лучших игроков!",
    "leaderboard.filter_xp": "Общий опыт",
    "leaderboard.filter_poly": "PolyBattler 3D",
    "leaderboard.filter_chess": "3D Шахматы",
    "leaderboard.filter_alchemist": "Phantom Alchemist",
    "leaderboard.filter_snake": "Cyber Snake",
    "leaderboard.filter_pong": "Cyber Pong",
    "leaderboard.filter_matrix": "Matrix Fall",
    "leaderboard.col_rank": "Место",
    "leaderboard.col_player": "Игрок",
    "leaderboard.col_level": "Уровень",
    "leaderboard.col_score": "Очки / XP",
    "leaderboard.col_achievements": "Значки",
    "leaderboard.col_action": "Действие",
    "leaderboard.challenge_btn": "Вызов",
    "leaderboard.empty": "Пока нет рекордов. Сыграйте матч и станьте первым чемпионом!",

    // Achievements Section & Modal
    "achievements.modal_title": "Достижения",
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
    "onboard.title": "Добро пожаловать в GameHub",
    "onboard.desc": "Выберите игровой никнейм и аватар. Вам будет автоматически назначен уникальный ID для быстрого поиска, прокачки уровней и совместной игры.",
    "onboard.nickname_label": "Ваш никнейм:",
    "onboard.nickname_placeholder": "Введите никнейм...",
    "onboard.random_btn": "Случайный",
    "onboard.avatar_label": "Выберите аватар:",
    "onboard.tip": "<b>Next Session:</b> Зарабатывайте опыт в играх, чате и при вызовах друзей по ID (#GH-48F1).",
    "onboard.submit": "Войти в хаб",

    // Edit Profile Modal
    "profile.title": "Редактировать профиль",
    "profile.nickname_label": "Никнейм:",
    "profile.avatar_label": "Сменить аватар:",
    "profile.cancel": "Отмена",
    "profile.save": "Сохранить",
    "profile.saved_toast": "Профиль успешно обновлен!",

    // Add Game Modal
    "add_game.title": "Добавить игру из GitHub",
    "add_game.guide_title": "Как подключить веб-игру:",
    "add_game.guide_step1": "1. Разместите файлы в public/games/ваша-игра/ или на GitHub Pages.",
    "add_game.guide_step2": "2. Укажите название, жанр, путь и ссылку на исходный код.",
    "add_game.guide_step3": "3. Игра мгновенно появится в каталоге хаба!",
    "add_game.name_label": "Название игры *",
    "add_game.name_placeholder": "например, Cyber Drift",
    "add_game.category_label": "Категория *",
    "add_game.cat_arcade": "Аркада",
    "add_game.cat_puzzle": "Головоломка",
    "add_game.cat_action": "Экшен",
    "add_game.cat_racing": "Гонки",
    "add_game.cat_rpg": "RPG",
    "add_game.cat_strategy": "Стратегия",
    "add_game.path_label": "Путь к игре или URL *",
    "add_game.path_placeholder": "например, /games/cyber-drift/index.html или URL",
    "add_game.github_label": "Ссылка на GitHub репозиторий (необязательно)",
    "add_game.desc_label": "Описание",
    "add_game.desc_placeholder": "Краткое описание геймплея...",
    "add_game.tags_label": "Теги (через запятую)",
    "add_game.tags_placeholder": "Ретро, 2D, Пиксели",
    "add_game.author_label": "Автор",
    "add_game.icon_label": "Иконка",
    "add_game.multiplayer_check": "Поддерживает мультиплеер / дуэль",
    "add_game.color_tooltip": "Цвет акцента карточки",
    "add_game.cancel": "Отмена",
    "add_game.submit": "Добавить в каталог",
    "add_game.success": "Игра «{title}» успешно добавлена в каталог! (+200 XP)",

    // Invite Modal
    "invite.title": "Пригласить в игру",
    "invite.target_id_label": "ID получателя:",
    "invite.target_id_placeholder": "например, GH-48F1",
    "invite.select_game_label": "Выберите игру:",
    "invite.message_label": "Сообщение (необязательно):",
    "invite.message_placeholder": "Сыграем партию вместе!",
    "invite.cancel": "Отмена",
    "invite.send": "Отправить приглашение",
    "invite.sent_success": "Приглашение в «{game}» отправлено игроку {id}!",
    "invite.select_target_alert": "Выберите игрока из списка или вкладку чата для отправки приглашения!",

    // Notifications & Toasts
    "toast.invite_header": "{nick} ({id})",
    "toast.invite_body": "Приглашает вас сыграть в <b>{game}</b>",
    "toast.accept": "Принять",
    "toast.decline": "Отклонить",
    "toast.invite_accepted_by_other": "Игрок {nick} принял приглашение в «{game}»! Запуск сессии...",
    "toast.invite_declined_by_other": "Игрок {nick} отклонил приглашение.",
    "toast.level_up": "НОВЫЙ УРОВЕНЬ! Вы достигли {level} уровня ({title})!",
    "toast.achievement_unlocked": "ДОСТИЖЕНИЕ ПОЛУЧЕНО: {title} (+{xp} XP)!"
  }
};

class I18nEngine {
  constructor() {
    this.currentLang = this.getSavedLanguage();
  }

  getSavedLanguage() {
    try {
      const saved = localStorage.getItem('gamehub_lang');
      if (saved && (saved === 'ru' || saved === 'en')) {
        return saved;
      }
    } catch (e) {}

    // Check navigator language
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.startsWith('ru')) return 'ru';
    return 'en';
  }

  getLanguage() {
    return this.currentLang;
  }

  setLanguage(lang) {
    if (lang !== 'ru' && lang !== 'en') return;
    this.currentLang = lang;
    try {
      localStorage.setItem('gamehub_lang', lang);
    } catch (e) {}

    document.documentElement.lang = lang;
    this.updateDOM();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  toggleLanguage() {
    this.setLanguage(this.currentLang === 'en' ? 'ru' : 'en');
  }

  t(key, params = {}) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS['en'];
    let text = dict[key] || TRANSLATIONS['en'][key] || key;

    // Interpolate params e.g. {id}, {nick}, {game}
    Object.keys(params).forEach(p => {
      text = text.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
    });

    return text;
  }

  getLevelTitle(level) {
    const key = `level.title_${Math.min(10, Math.max(1, level))}`;
    return this.t(key);
  }

  updateDOM() {
    // 1. Text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.innerHTML = this.t(key);
      }
    });

    // 2. Placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', this.t(key));
      }
    });

    // 3. Title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', this.t(key));
      }
    });

    // 4. Update language toggle button label
    const toggleBtnText = document.getElementById('langToggleText');
    if (toggleBtnText) {
      toggleBtnText.innerText = this.currentLang.toUpperCase();
    }
  }
}

window.i18n = new I18nEngine();
