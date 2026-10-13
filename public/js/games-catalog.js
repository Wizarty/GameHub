// GameHub Games Catalog & NEXT SESSION Launch Deck Manager
const DEFAULT_GAMES_LIST = [
  {
    "id": "poly-battler",
    "title": "PolyBattler 3D",
    "title_en": "PolyBattler 3D",
    "title_ru": "PolyBattler 3D",
    "description": "Fast-paced 3D roguelite arena battler. Survive swarms of enemies, collect XP gems, synthesize elemental weapon combos, and defeat epic bosses.",
    "description_en": "Fast-paced 3D roguelite arena battler. Survive swarms of enemies, collect XP gems, synthesize elemental weapon combos, and defeat epic bosses.",
    "description_ru": "Динамичная 3D рогалик-арена. Выживайте против полчищ врагов, собирайте кристаллы опыта, комбинируйте стихийные способности и побеждайте боссов.",
    "category": "Action",
    "category_en": "Action",
    "category_ru": "Экшен",
    "tags": ["3D", "Roguelite", "Survival", "Three.js", "Bosses"],
    "tags_en": ["3D", "Roguelite", "Survival", "Three.js", "Bosses"],
    "tags_ru": ["3D", "Рогалик", "Выживание", "Three.js", "Боссы"],
    "badge": "Hot",
    "icon": "⚔️",
    "color": "#D7FF5F",
    "sourceType": "local",
    "path": "/games/poly-battler/index.html",
    "githubUrl": "https://github.com/Wizarty/PolyBattler-3D.git",
    "author": "Wizarty",
    "multiplayer": false,
    "maxPlayers": 1,
    "addedAt": "2026-10-12"
  },
  {
    "id": "3d-chess",
    "title": "Cyber 3D Chess",
    "title_en": "Cyber 3D Chess",
    "title_ru": "Кибер-Шахматы 3D",
    "description": "Atmospheric 3D chess simulator with realistic lighting, procedural pieces, smart AI bot with multiple difficulties, 2P local pass & play, and 3D camera controls.",
    "description_en": "Atmospheric 3D chess simulator with realistic lighting, procedural pieces, smart AI bot with multiple difficulties, 2P local pass & play, and 3D camera controls.",
    "description_ru": "Атмосферные 3D шахматы с неоновой подсветкой, процедурными фигурами, умным кибер-ИИ с разными уровнями сложности, режимом дуэли для двоих и свободным обзором камеры.",
    "category": "Puzzle",
    "category_en": "Puzzle",
    "category_ru": "Головоломка",
    "tags": ["Chess", "3D", "Logic", "AI Bot", "PvP"],
    "tags_en": ["Chess", "3D", "Logic", "AI Bot", "PvP"],
    "tags_ru": ["Шахматы", "3D", "Логика", "ИИ Бот", "ПВП"],
    "badge": "PvP Duel",
    "icon": "♟️",
    "color": "#38bdf8",
    "sourceType": "local",
    "path": "/games/3d-chess/index.html",
    "githubUrl": "https://github.com/Wizarty/3D-Chess.git",
    "author": "Wizarty",
    "multiplayer": true,
    "maxPlayers": 2,
    "addedAt": "2026-10-12"
  },
  {
    "id": "phantom-alchemist",
    "title": "Phantom Alchemist Survival",
    "title_en": "Phantom Alchemist Survival",
    "title_ru": "Phantom Alchemist Survival",
    "description": "3D gothic survival roguelite. Craft volatile elemental acid flasks, chain lightning and cryo mercury against phantom spirits and shadow dread lords.",
    "description_en": "3D gothic survival roguelite. Craft volatile elemental acid flasks, chain lightning and cryo mercury against phantom spirits and shadow dread lords.",
    "description_ru": "Готический 3D рогалик на выживание. Варите взрывные кислотные колбы, метайте цепные молнии и замораживайте ртутью призрачных спектров и теневых повелителей.",
    "category": "Action",
    "category_en": "Action",
    "category_ru": "Экшен",
    "tags": ["Survival", "3D", "Magic", "Alchemy", "Roguelike"],
    "tags_en": ["Survival", "3D", "Magic", "Alchemy", "Roguelike"],
    "tags_ru": ["Выживание", "3D", "Магия", "Алхимия", "Рогалик"],
    "badge": "New",
    "icon": "🧪",
    "color": "#34d399",
    "sourceType": "local",
    "path": "/games/phantom-alchemist/index.html",
    "githubUrl": "https://github.com/Wizarty/Phantom-Alchemist-Survival.git",
    "author": "Wizarty",
    "multiplayer": false,
    "maxPlayers": 1,
    "addedAt": "2026-10-12"
  },
  {
    "id": "cyber-pong",
    "title": "Cyber Pong 2088",
    "title_en": "Cyber Pong 2088",
    "title_ru": "Cyber Pong 2088",
    "description": "Fast-paced neon cyber pong with deflection physics, force fields, laser surges, and option to battle AI bots or friends in PvP.",
    "description_en": "Fast-paced neon cyber pong with deflection physics, force fields, laser surges, and option to battle AI bots or friends in PvP.",
    "description_ru": "Быстрый неоновый кибер-понг с физикой отскока, силовыми щитами, лазерными импульсами и возможностью играть против ИИ или соревноваться с другом.",
    "category": "Arcade",
    "category_en": "Arcade",
    "category_ru": "Аркада",
    "tags": ["Multiplayer", "Neon", "Reflexes", "PvP"],
    "tags_en": ["Multiplayer", "Neon", "Reflexes", "PvP"],
    "tags_ru": ["Мультиплеер", "Неон", "Рефлексы", "ПВП"],
    "badge": "PvP Duel",
    "icon": "⚡",
    "color": "#f43f5e",
    "sourceType": "local",
    "path": "/games/cyber-pong/index.html",
    "githubUrl": "https://github.com/topics/pong-game",
    "author": "GameHub Studio",
    "multiplayer": true,
    "maxPlayers": 2,
    "addedAt": "2026-10-12"
  },
  {
    "id": "cyber-snake",
    "title": "Cyber Snake Neo",
    "title_en": "Cyber Snake Neo",
    "title_ru": "Cyber Snake Neo",
    "description": "Retrowave evolution of the classic snake arcade. Collect energy cores, trigger hyper boost, survive laser walls and climb the leaderboard.",
    "description_en": "Retrowave evolution of the classic snake arcade. Collect energy cores, trigger hyper boost, survive laser walls and climb the leaderboard.",
    "description_ru": "Эволюция классической змейки в стиле ретровейв. Собирайте энерго-кубы, активируйте гипер-ускорение, преодолевайте лазерные порталы и ставьте рекорды.",
    "category": "Arcade",
    "category_en": "Arcade",
    "category_ru": "Аркада",
    "tags": ["Classic", "Retro", "Arcade", "HighScores"],
    "tags_en": ["Classic", "Retro", "Arcade", "HighScores"],
    "tags_ru": ["Классика", "Ретро", "Аркада", "Рекорды"],
    "badge": "Classic",
    "icon": "🐍",
    "color": "#06b6d4",
    "sourceType": "local",
    "path": "/games/cyber-snake/index.html",
    "githubUrl": "https://github.com/topics/snake-game",
    "author": "GameHub Studio",
    "multiplayer": false,
    "maxPlayers": 1,
    "addedAt": "2026-10-12"
  },
  {
    "id": "matrix-fall",
    "title": "Matrix Fall: Cyber Blocks",
    "title_en": "Matrix Fall: Cyber Blocks",
    "title_ru": "Matrix Fall: Cyber Blocks",
    "description": "Iconic falling block puzzle dressed in green cyber digital rain. Clear code lines, trigger combos and freeze the timeline.",
    "description_en": "Iconic falling block puzzle dressed in green cyber digital rain. Clear code lines, trigger combos and freeze the timeline.",
    "description_ru": "Культовая механика падающих блоков в стилистике матрицы. Чистите линии цифрового кода, используйте бомбы и заморозку тайм-лайна.",
    "category": "Puzzle",
    "category_en": "Puzzle",
    "category_ru": "Головоломка",
    "tags": ["Tetris", "Matrix", "Puzzle", "Logic"],
    "tags_en": ["Tetris", "Matrix", "Puzzle", "Logic"],
    "tags_ru": ["Тетрис", "Матрица", "Головоломка", "Логика"],
    "badge": "New",
    "icon": "🧱",
    "color": "#a855f7",
    "sourceType": "local",
    "path": "/games/matrix-fall/index.html",
    "githubUrl": "https://github.com/topics/tetris",
    "author": "GameHub Studio",
    "multiplayer": false,
    "maxPlayers": 1,
    "addedAt": "2026-10-12"
  }
];

// Bespoke Vector Illustrations for Games (0ms latency, zero broken assets)
function getGameIllustrationSvg(gameId) {
  switch (gameId) {
    case 'poly-battler':
      return `
        <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="pbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#D7FF5F" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#080A0B" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="pbCore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#D7FF5F"/>
              <stop offset="100%" stop-color="#6366f1"/>
            </linearGradient>
            <linearGradient id="pbShard" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#818cf8" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.2"/>
            </linearGradient>
          </defs>
          <rect width="640" height="360" fill="#0c1014"/>
          <!-- Grid Arena Ground -->
          <g opacity="0.25">
            <path d="M40 320L320 180L600 320" stroke="#F2F4ED" stroke-width="1"/>
            <path d="M100 320L320 180L540 320" stroke="#F2F4ED" stroke-width="1"/>
            <path d="M160 320L320 180L480 320" stroke="#F2F4ED" stroke-width="1"/>
            <path d="M220 320L320 180L420 320" stroke="#F2F4ED" stroke-width="1"/>
            <line x1="80" y1="290" x2="560" y2="290" stroke="#F2F4ED" stroke-width="1"/>
            <line x1="140" y1="260" x2="500" y2="260" stroke="#F2F4ED" stroke-width="1"/>
            <line x1="200" y1="230" x2="440" y2="230" stroke="#F2F4ED" stroke-width="1"/>
            <line x1="260" y1="205" x2="380" y2="205" stroke="#F2F4ED" stroke-width="1"/>
          </g>
          <!-- Central Glow -->
          <circle cx="320" cy="180" r="160" fill="url(#pbGlow)"/>
          <!-- Rotating Shards / Low Poly Core -->
          <polygon points="320,80 380,160 320,240 260,160" fill="url(#pbShard)" stroke="#D7FF5F" stroke-width="1.5"/>
          <polygon points="320,95 365,160 320,225 275,160" fill="#171C1F" stroke="#F2F4ED" stroke-width="1" opacity="0.8"/>
          <!-- Energy Core -->
          <polygon points="320,130 345,160 320,190 295,160" fill="url(#pbCore)"/>
          <circle cx="320" cy="160" r="8" fill="#F2F4ED"/>
          <!-- Orbital Floating Nodes -->
          <polygon points="190,120 210,135 195,150 175,135" fill="#D7FF5F" opacity="0.85"/>
          <polygon points="450,110 470,125 455,140 435,125" fill="#818cf8" opacity="0.85"/>
          <polygon points="230,220 245,230 235,245 220,235" fill="#818cf8" opacity="0.7"/>
          <polygon points="410,210 425,220 415,235 400,225" fill="#D7FF5F" opacity="0.7"/>
          <!-- Targeting telemetry marks -->
          <path d="M300 60 H340 M320 40 V80" stroke="#D7FF5F" stroke-width="1" opacity="0.6"/>
          <circle cx="320" cy="160" r="70" stroke="#D7FF5F" stroke-width="1" stroke-dasharray="4 6" opacity="0.5"/>
          <text x="320" y="340" fill="#D7FF5F" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="3" opacity="0.8">// THREE.JS ROGUELITE ARENA · READY</text>
        </svg>`;

    case '3d-chess':
      return `
        <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="chessGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#080A0B" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="640" height="360" fill="#0a0e14"/>
          <circle cx="320" cy="180" r="150" fill="url(#chessGlow)"/>
          <!-- Isometric Board -->
          <g transform="translate(320, 190) scale(1, 0.5) rotate(45)" stroke="#38bdf8" stroke-width="1" opacity="0.4">
            <rect x="-140" y="-140" width="280" height="280" fill="#101416"/>
            <path d="M-140 -70 H140 M-140 0 H140 M-140 70 H140 M-70 -140 V140 M0 -140 V140 M70 -140 V140" stroke="#F2F4ED" stroke-width="1"/>
            <!-- Highlighted squares -->
            <rect x="-70" y="-70" width="70" height="70" fill="#D7FF5F" fill-opacity="0.25" stroke="#D7FF5F"/>
            <rect x="0" y="0" width="70" height="70" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8"/>
          </g>
          <!-- 3D Geometric Chess Piece Silhouette (Knight & King) -->
          <g transform="translate(320, 160)">
            <!-- King Piece -->
            <polygon points="0,-80 25,-40 20,20 -20,20 -25,-40" fill="#171C1F" stroke="#38bdf8" stroke-width="2"/>
            <line x1="0" y1="-95" x2="0" y2="-75" stroke="#D7FF5F" stroke-width="3"/>
            <line x1="-10" y1="-85" x2="10" y2="-85" stroke="#D7FF5F" stroke-width="3"/>
            <polygon points="-12,-35 0,-55 12,-35 0,-15" fill="#38bdf8" opacity="0.6"/>
            <!-- Pedestal -->
            <polygon points="-35,20 35,20 45,35 -45,35" fill="#101416" stroke="#38bdf8" stroke-width="1.5"/>
            <!-- Targeting Coordinate Beams -->
            <line x1="0" y1="20" x2="90" y2="70" stroke="#D7FF5F" stroke-width="1.5" stroke-dasharray="3 3"/>
            <circle cx="90" cy="70" r="5" fill="#D7FF5F"/>
          </g>
          <text x="320" y="340" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="3" opacity="0.8">// CYBER TACTICS · AI BOT + 2P LOCAL PASS</text>
        </svg>`;

    case 'phantom-alchemist':
      return `
        <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="alchGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#34d399" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#080A0B" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="640" height="360" fill="#09110e"/>
          <circle cx="320" cy="180" r="160" fill="url(#alchGlow)"/>
          <!-- Arcane Transmutation Circles -->
          <circle cx="320" cy="180" r="120" stroke="#34d399" stroke-width="1" opacity="0.3" stroke-dasharray="6 4"/>
          <circle cx="320" cy="180" r="90" stroke="#F2F4ED" stroke-width="1" opacity="0.2"/>
          <polygon points="320,90 424,240 216,240" stroke="#34d399" stroke-width="1" fill="none" opacity="0.4"/>
          <polygon points="320,270 424,120 216,120" stroke="#D7FF5F" stroke-width="1" fill="none" opacity="0.3"/>
          <!-- Alchemical Flask Flask Structure -->
          <g transform="translate(320, 180)">
            <!-- Neck -->
            <rect x="-10" y="-70" width="20" height="40" fill="#171C1F" stroke="#34d399" stroke-width="1.5"/>
            <line x1="-15" y1="-70" x2="15" y2="-70" stroke="#34d399" stroke-width="2"/>
            <!-- Spherical Base -->
            <circle cx="0" cy="10" r="50" fill="#101416" stroke="#34d399" stroke-width="2"/>
            <!-- Glowing Emerald Liquid -->
            <path d="M-45 15 Q0 5 45 15 A50 50 0 0 1 -45 15 Z" fill="#34d399" fill-opacity="0.75"/>
            <!-- Bubbles & Sparkles -->
            <circle cx="-15" cy="25" r="4" fill="#D7FF5F"/>
            <circle cx="12" cy="30" r="6" fill="#D7FF5F" opacity="0.8"/>
            <circle cx="0" cy="0" r="3" fill="#F2F4ED"/>
            <!-- Phantom Shadow Wisps -->
            <path d="M-80 -40 Q-40 -80 -20 -40 Q0 0 -20 20" stroke="#34d399" stroke-width="1.5" fill="none" opacity="0.5"/>
            <path d="M80 -40 Q40 -80 20 -40 Q0 0 20 20" stroke="#D7FF5F" stroke-width="1.5" fill="none" opacity="0.5"/>
          </g>
          <text x="320" y="340" fill="#34d399" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="3" opacity="0.8">// GOTHIC SURVIVAL · TRANSMUTATION MATRIX</text>
        </svg>`;

    case 'cyber-pong':
      return `
        <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="pongGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#080A0B" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="640" height="360" fill="#11090d"/>
          <circle cx="320" cy="180" r="160" fill="url(#pongGlow)"/>
          <!-- Arena Boundary -->
          <rect x="80" y="60" width="480" height="240" fill="#101416" stroke="#f43f5e" stroke-width="1.5" opacity="0.6"/>
          <!-- Center Divider -->
          <line x1="320" y1="60" x2="320" y2="300" stroke="#F2F4ED" stroke-width="2" stroke-dasharray="10 10" opacity="0.4"/>
          <!-- Player 1 Paddle (Lime) -->
          <rect x="110" y="130" width="12" height="70" rx="3" fill="#D7FF5F" stroke="#F2F4ED" stroke-width="1"/>
          <!-- Player 2 Paddle (Magenta) -->
          <rect x="518" y="160" width="12" height="70" rx="3" fill="#f43f5e" stroke="#F2F4ED" stroke-width="1"/>
          <!-- Deflecting Laser Ball with Trail -->
          <path d="M122 165 L240 120 L380 220 L518 190" stroke="#D7FF5F" stroke-width="2" stroke-dasharray="4 4" opacity="0.7"/>
          <circle cx="280" cy="150" r="8" fill="#F2F4ED" stroke="#D7FF5F" stroke-width="3"/>
          <circle cx="280" cy="150" r="18" stroke="#f43f5e" stroke-width="1" opacity="0.6"/>
          <!-- Pulse rings -->
          <circle cx="122" cy="165" r="24" stroke="#D7FF5F" stroke-width="1" opacity="0.5"/>
          <text x="320" y="340" fill="#f43f5e" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="3" opacity="0.8">// FAST-PACED DUEL · LASER DEFLECTION</text>
        </svg>`;

    case 'cyber-snake':
      return `
        <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="snakeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#080A0B" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="640" height="360" fill="#080f14"/>
          <circle cx="320" cy="180" r="150" fill="url(#snakeGlow)"/>
          <!-- Retrowave Grid Matrix -->
          <g stroke="#06b6d4" stroke-width="1" opacity="0.25">
            <line x1="80" y1="0" x2="80" y2="360"/>
            <line x1="160" y1="0" x2="160" y2="360"/>
            <line x1="240" y1="0" x2="240" y2="360"/>
            <line x1="320" y1="0" x2="320" y2="360"/>
            <line x1="400" y1="0" x2="400" y2="360"/>
            <line x1="480" y1="0" x2="480" y2="360"/>
            <line x1="560" y1="0" x2="560" y2="360"/>
            <line x1="0" y1="90" x2="640" y2="90"/>
            <line x1="0" y1="180" x2="640" y2="180"/>
            <line x1="0" y1="270" x2="640" y2="270"/>
          </g>
          <!-- Neon Cyber Serpent Path -->
          <g stroke-linecap="round" stroke-linejoin="round">
            <path d="M140 240 H280 V120 H420 V200 H480" stroke="#06b6d4" stroke-width="14" opacity="0.8"/>
            <path d="M140 240 H280 V120 H420 V200 H480" stroke="#D7FF5F" stroke-width="6"/>
            <!-- Snake Head -->
            <rect x="475" y="190" width="20" height="20" rx="4" fill="#D7FF5F" stroke="#F2F4ED" stroke-width="2"/>
            <circle cx="488" cy="196" r="2.5" fill="#080A0B"/>
            <circle cx="488" cy="204" r="2.5" fill="#080A0B"/>
          </g>
          <!-- Glowing Target Energy Core -->
          <polygon points="530,190 540,200 530,210 520,200" fill="#D7FF5F" stroke="#F2F4ED" stroke-width="1.5"/>
          <circle cx="530" cy="200" r="14" stroke="#D7FF5F" stroke-width="1" stroke-dasharray="2 3" opacity="0.8"/>
          <text x="320" y="340" fill="#06b6d4" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="3" opacity="0.8">// RETROWAVE SERPENT · HYPER SPEED RUN</text>
        </svg>`;

    case 'matrix-fall':
      return `
        <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="matGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#a855f7" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#080A0B" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="640" height="360" fill="#0e0814"/>
          <circle cx="320" cy="180" r="160" fill="url(#matGlow)"/>
          <!-- Digital Rain Cascades -->
          <g fill="#22c55e" font-family="monospace" font-size="10" opacity="0.3" letter-spacing="2">
            <text x="120" y="80">1 0 1 0 1</text>
            <text x="120" y="110">0 1 1 0 0</text>
            <text x="120" y="140">1 1 0 1 1</text>
            <text x="500" y="100">0 0 1 0 1</text>
            <text x="500" y="130">1 1 0 1 0</text>
            <text x="500" y="160">0 1 1 1 0</text>
          </g>
          <!-- Tetromino Grid Box -->
          <rect x="230" y="40" width="180" height="270" fill="#101416" stroke="#a855f7" stroke-width="1.5" opacity="0.6"/>
          <!-- Falling Blocks -->
          <!-- T-Piece (Lime) -->
          <g transform="translate(290, 80)">
            <rect x="0" y="0" width="20" height="20" fill="#D7FF5F" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="20" y="0" width="20" height="20" fill="#D7FF5F" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="40" y="0" width="20" height="20" fill="#D7FF5F" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="20" y="20" width="20" height="20" fill="#D7FF5F" stroke="#171C1F" stroke-width="1.5"/>
          </g>
          <!-- Stacked Blocks at Base -->
          <g transform="translate(230, 250)">
            <rect x="0" y="20" width="20" height="20" fill="#a855f7" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="20" y="20" width="20" height="20" fill="#a855f7" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="40" y="20" width="20" height="20" fill="#a855f7" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="60" y="20" width="20" height="20" fill="#a855f7" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="80" y="20" width="20" height="20" fill="#a855f7" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="100" y="20" width="20" height="20" fill="#38bdf8" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="120" y="20" width="20" height="20" fill="#38bdf8" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="140" y="20" width="20" height="20" fill="#38bdf8" stroke="#171C1F" stroke-width="1.5"/>
            <rect x="160" y="20" width="20" height="20" fill="#38bdf8" stroke="#171C1F" stroke-width="1.5"/>
            <!-- Line 2 -->
            <rect x="0" y="40" width="180" height="2" fill="#D7FF5F" opacity="0.8"/>
          </g>
          <text x="320" y="340" fill="#a855f7" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="3" opacity="0.8">// DIGITAL RAIN FALL · TIMELINE FREEZE</text>
        </svg>`;

    default:
      return `
        <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#101416"/>
          <circle cx="320" cy="180" r="100" stroke="#D7FF5F" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.4"/>
          <path d="M280 180H360 M320 140V220" stroke="#D7FF5F" stroke-width="2"/>
          <text x="320" y="260" fill="#9AA3A4" font-family="monospace" font-size="12" text-anchor="middle" letter-spacing="2">// CUSTOM WEB GAME</text>
        </svg>`;
  }
}

class GameHubCatalog {
  constructor() {
    this.games = [...DEFAULT_GAMES_LIST];
    this.filteredGames = [];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.activeGame = null;
    this.activeDeckGameId = 'poly-battler';

    this.gridContainer = null;
    this.spotlightContainer = null;
    this.launchDeckContainer = null;
    this.viewportWrapper = null;
    this.gameIframe = null;
  }

  async init() {
    this.gridContainer = document.getElementById('gamesGrid');
    this.spotlightContainer = document.getElementById('catalogSpotlight');
    this.launchDeckContainer = document.getElementById('launchDeck');
    this.viewportWrapper = document.getElementById('gameViewportWrapper');
    this.gameIframe = document.getElementById('gameIframe');

    // Immediately render default games and launch deck so page is ready
    this.renderLaunchDeck();
    this.applyFilter();

    await this.fetchGames();
    this.setupListeners();
    this.setupInGameControls();
    this.setupDeckTiltEffect();

    // Re-render when language changes
    window.addEventListener('languageChanged', () => {
      this.renderLaunchDeck();
      this.applyFilter();
    });

    // Listen for real-time game addition / removal
    if (window.hubSocket && window.hubSocket.on) {
      window.hubSocket.on('hub:game_added', (newGame) => {
        this.games.unshift(newGame);
        this.renderLaunchDeck();
        this.applyFilter();
      });

      window.hubSocket.on('hub:game_removed', ({ id }) => {
        this.games = this.games.filter(g => g.id !== id);
        if (this.activeDeckGameId === id) {
          this.activeDeckGameId = this.games[0] ? this.games[0].id : 'poly-battler';
        }
        this.renderLaunchDeck();
        this.applyFilter();
      });

      // Start session if invite accepted
      window.hubSocket.on('game:start_session', (session) => {
        this.launchGameById(session.gameId, session.partner);
      });
    }

    // PostMessage communication with iframe games
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
      if (data && data.success && Array.isArray(data.games) && data.games.length > 0) {
        this.games = data.games;
        this.renderLaunchDeck();
        this.applyFilter();
      }
    } catch (err) {
      console.warn('Network notice: using embedded games registry:', err);
    }
  }

  setupListeners() {
    // Category pill buttons in Discover catalog
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

    // Invite friend form submit
    const inviteForm = document.getElementById('inviteFriendForm');
    if (inviteForm) {
      inviteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitGameInvite();
      });
    }
  }

  // --- LAUNCH DECK (The Star Feature) ---
  renderLaunchDeck() {
    if (!this.launchDeckContainer) return;
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    const game = this.games.find(g => g.id === this.activeDeckGameId) || this.games[0] || DEFAULT_GAMES_LIST[0];
    if (!game) return;

    const gameTitle = lang === 'ru' ? (game.title_ru || game.title) : (game.title_en || game.title);
    const gameDesc = lang === 'ru' ? (game.description_ru || game.description) : (game.description_en || game.description);
    const gameCat = lang === 'ru' ? (game.category_ru || game.category) : (game.category_en || game.category);
    const gameTags = (lang === 'ru' ? (game.tags_ru || game.tags) : (game.tags_en || game.tags)) || [];

    const modeText = game.multiplayer
      ? window.i18n.t('deck.mode_pvp')
      : (game.tags && game.tags.includes('AI Bot') ? window.i18n.t('deck.mode_ai') : window.i18n.t('deck.mode_single'));

    const tagsHtml = gameTags.slice(0, 4).map(t => `<span class="deck-tag">#${t}</span>`).join('');

    // Dock buttons for all available games
    const dockButtonsHtml = this.games.slice(0, 6).map((g, index) => {
      const gTitle = lang === 'ru' ? (g.title_ru || g.title) : (g.title_en || g.title);
      const isSelected = g.id === game.id;
      return `
        <button class="deck-dock-item ${isSelected ? 'active' : ''}" data-game-id="${g.id}" type="button">
          <span class="dock-index">0${index + 1}</span>
          <span class="dock-label">${gTitle}</span>
        </button>
      `;
    }).join('');

    this.launchDeckContainer.innerHTML = `
      <div class="deck-card" id="deckCard">
        <div class="deck-screen">
          <div class="deck-art-wrapper">
            ${getGameIllustrationSvg(game.id)}
          </div>
          <div class="deck-overlay-header">
            <span class="deck-badge-category">${gameCat}</span>
            <span class="deck-badge-mode">${modeText}</span>
          </div>
        </div>

        <div class="deck-meta-panel">
          <div class="deck-meta-info">
            <div class="deck-title-row">
              <h3 class="deck-game-title">${gameTitle}</h3>
              ${game.githubUrl ? `
                <a href="${game.githubUrl}" target="_blank" rel="noopener noreferrer" class="deck-github-link" title="GitHub Source">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  <span>Code</span>
                </a>
              ` : ''}
            </div>
            <p class="deck-game-desc">${gameDesc}</p>
            <div class="deck-tags-row">${tagsHtml}</div>
          </div>

          <div class="deck-actions-row">
            <button class="btn-deck-launch" id="btnDeckLaunch" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span>${window.i18n.t('deck.launch_btn')}</span>
            </button>
            <button class="btn-deck-invite" id="btnDeckInvite" type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              <span>${window.i18n.t('deck.invite_btn')}</span>
            </button>
          </div>
        </div>

        <!-- Tactile Game Switcher Dock -->
        <div class="deck-dock" aria-label="Quick Game Switcher">
          ${dockButtonsHtml}
        </div>
      </div>
    `;

    // Hook Launch and Invite buttons
    const btnLaunch = document.getElementById('btnDeckLaunch');
    if (btnLaunch) {
      btnLaunch.onclick = () => this.launchGame(game.id);
    }

    const btnInvite = document.getElementById('btnDeckInvite');
    if (btnInvite) {
      btnInvite.onclick = () => this.openInviteModalForGame(game.id);
    }

    // Hook Dock button clicks
    this.launchDeckContainer.querySelectorAll('.deck-dock-item').forEach(btn => {
      btn.onclick = () => {
        const targetId = btn.dataset.gameId;
        if (targetId && targetId !== this.activeDeckGameId) {
          this.switchDeckGame(targetId);
        }
      };
    });
  }

  switchDeckGame(gameId) {
    this.activeDeckGameId = gameId;
    const deckCard = document.getElementById('deckCard');
    if (deckCard) {
      deckCard.classList.add('transitioning');
      setTimeout(() => {
        this.renderLaunchDeck();
      }, 150);
    } else {
      this.renderLaunchDeck();
    }
  }

  setupDeckTiltEffect() {
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isReduced || isTouch) return;

    document.addEventListener('mousemove', (e) => {
      const card = document.getElementById('deckCard');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      // Only tilt if mouse is reasonably near or over card
      if (e.clientX < rect.left - 100 || e.clientX > rect.right + 100 ||
          e.clientY < rect.top - 100 || e.clientY > rect.bottom + 100) {
        card.style.transform = '';
        return;
      }

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = -y * 6; // max 3 deg
      const rotY = x * 8;  // max 4 deg

      card.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(4px)`;
    });

    document.addEventListener('mouseleave', () => {
      const card = document.getElementById('deckCard');
      if (card) card.style.transform = '';
    });
  }

  // --- CATALOG FILTERING & RENDERING ---
  applyFilter() {
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    this.filteredGames = this.games.filter(game => {
      let matchesCat = true;
      const gameCat = (lang === 'ru' ? (game.category_ru || game.category) : (game.category_en || game.category)).toLowerCase();

      if (this.currentCategory === 'multiplayer') {
        matchesCat = game.multiplayer === true;
      } else if (this.currentCategory === 'github') {
        matchesCat = !!game.githubUrl;
      } else if (this.currentCategory === 'action' || this.currentCategory === 'экшен') {
        matchesCat = gameCat.includes('action') || gameCat.includes('экшен');
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
        <div class="catalog-empty-box">
          <div class="empty-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9AA3A4" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h3 class="empty-title">${window.i18n.t('catalog.no_games_title')}</h3>
          <p class="empty-desc">${window.i18n.t('catalog.no_games_desc')}</p>
        </div>
      `;
      return;
    }

    this.filteredGames.forEach((game, idx) => {
      const card = document.createElement('article');
      card.className = 'game-card';
      card.setAttribute('data-game-id', game.id);

      const gameTitle = lang === 'ru' ? (game.title_ru || game.title) : (game.title_en || game.title);
      const gameDesc = lang === 'ru' ? (game.description_ru || game.description) : (game.description_en || game.description);
      const gameCat = lang === 'ru' ? (game.category_ru || game.category) : (game.category_en || game.category);
      const gameTags = (lang === 'ru' ? (game.tags_ru || game.tags) : (game.tags_en || game.tags)) || [];

      let rawBadge = game.badge || '';
      let badgeLabel = rawBadge;
      if (rawBadge === 'Hot' || rawBadge === 'Хит') badgeLabel = window.i18n.t('catalog.hit_badge');
      else if (rawBadge === 'PvP Duel' || rawBadge === 'ПВП Дуэль') badgeLabel = window.i18n.t('catalog.pvp_badge');
      else if (rawBadge === 'New' || rawBadge === 'Новинка') badgeLabel = window.i18n.t('catalog.new_badge');

      const tagsHtml = gameTags.slice(0, 3).map(t => `<span class="card-tag">#${t}</span>`).join('');

      card.innerHTML = `
        <div class="card-art-container">
          ${getGameIllustrationSvg(game.id)}
          <div class="card-art-badges">
            <span class="card-category-badge">${gameCat}</span>
            ${badgeLabel ? `<span class="card-status-badge">${badgeLabel}</span>` : ''}
          </div>
        </div>

        <div class="card-content">
          <div class="card-header-row">
            <h3 class="card-title">${gameTitle}</h3>
            ${game.githubUrl ? `
              <a href="${game.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-github-icon" title="GitHub Repository">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              </a>
            ` : ''}
          </div>

          <p class="card-desc">${gameDesc}</p>
          <div class="card-tags-row">${tagsHtml}</div>

          <div class="card-actions-row">
            <button class="btn-card-play" data-action="play">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span>${window.i18n.t('catalog.play')}</span>
            </button>
            <button class="btn-card-invite" data-action="invite" title="${window.i18n.t('catalog.invite')}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              <span>${window.i18n.t('catalog.invite')}</span>
            </button>
          </div>
        </div>
      `;

      // Event listeners on buttons
      const btnPlay = card.querySelector('[data-action="play"]');
      if (btnPlay) {
        btnPlay.addEventListener('click', () => this.launchGame(game.id));
      }

      const btnInvite = card.querySelector('[data-action="invite"]');
      if (btnInvite) {
        btnInvite.addEventListener('click', () => this.openInviteModalForGame(game.id));
      }

      this.gridContainer.appendChild(card);
    });
  }

  // --- GAME LAUNCHING & IN-HUB HUD VIEWPORT ---
  launchGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (!game) return;

    this.activeGame = game;
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const gameTitle = lang === 'ru' ? (game.title_ru || game.title) : (game.title_en || game.title);

    const titleEl = document.getElementById('currentGameTitle');
    if (titleEl) titleEl.innerText = gameTitle;

    // Set iframe source
    if (this.gameIframe) {
      this.gameIframe.src = game.path;
    }

    // Show viewport wrapper
    if (this.viewportWrapper) {
      this.viewportWrapper.classList.remove('hidden');
    }

    // Update player status on server
    if (window.hubSocket && window.hubSocket.updateStatus) {
      window.hubSocket.updateStatus('in_game', gameTitle);
    }

    // Send player profile into iframe once loaded
    if (this.gameIframe) {
      this.gameIframe.onload = () => {
        try {
          if (window.hubSocket && window.hubSocket.player) {
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
  }

  launchGameById(gameId, partner = null) {
    this.launchGame(gameId);
    if (partner) {
      console.log(`Starting multiplayer session with partner ${partner.nickname} (${partner.id})`);
    }
  }

  exitCurrentGame() {
    if (this.viewportWrapper) {
      this.viewportWrapper.classList.add('hidden');
    }
    if (this.gameIframe) {
      this.gameIframe.src = 'about:blank';
    }
    this.activeGame = null;

    // Close in-game drawer if open
    if (window.gameHubChat) {
      window.gameHubChat.closeInGameDrawer();
      window.gameHubChat.resetInGameUnreadBadge();
    } else {
      document.getElementById('inGameChatDrawer')?.classList.remove('open');
      document.getElementById('btnToggleInGameChat')?.classList.remove('active-btn');
    }

    // Restore status to online
    if (window.hubSocket && window.hubSocket.updateStatus) {
      window.hubSocket.updateStatus('online');
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
          if (this.viewportWrapper && this.viewportWrapper.requestFullscreen) {
            this.viewportWrapper.requestFullscreen().catch(err => console.log(err));
          }
        } else {
          document.exitFullscreen().catch(err => console.log(err));
        }
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

  // --- INVITATION & SUBMISSION MODALS ---
  openInviteModalForGame(gameId) {
    const game = typeof gameId === 'string' ? this.games.find(g => g.id === gameId) : gameId;
    if (!game) return;

    const modal = document.getElementById('inviteModal');
    const gameSelect = document.getElementById('inviteGameSelect');
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    if (gameSelect) {
      gameSelect.innerHTML = this.games.map(g => {
        const title = lang === 'ru' ? (g.title_ru || g.title) : (g.title_en || g.title);
        return `<option value="${g.id}" ${g.id === game.id ? 'selected' : ''}>${title}</option>`;
      }).join('');
    }

    if (modal) modal.classList.remove('hidden');
  }

  openInviteModalForPlayer(playerId) {
    const modal = document.getElementById('inviteModal');
    const targetInput = document.getElementById('invitePlayerIdInput');
    const gameSelect = document.getElementById('inviteGameSelect');
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    if (targetInput) targetInput.value = playerId;

    if (gameSelect) {
      gameSelect.innerHTML = this.games.map(g => {
        const title = lang === 'ru' ? (g.title_ru || g.title) : (g.title_en || g.title);
        return `<option value="${g.id}">${title}</option>`;
      }).join('');
    }

    if (modal) modal.classList.remove('hidden');
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

    if (window.hubSocket && window.hubSocket.sendGameInvite) {
      window.hubSocket.sendGameInvite(targetId, game.id, gameTitle, customMsg, (res) => {
        if (res && res.success) {
          alert(window.i18n.t('invite.sent_success', { game: gameTitle, id: targetId }));
          document.getElementById('inviteModal')?.classList.add('hidden');
        } else {
          alert(res ? res.error : 'Failed to send invite');
        }
      });
    }
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
    const color = document.getElementById('addGameColor').value || '#D7FF5F';

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
        document.getElementById('addGameModal')?.classList.add('hidden');
        document.getElementById('addGameForm')?.reset();
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
