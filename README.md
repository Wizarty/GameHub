# 🎮 GameHub — Online Gaming, Social & Gamification Cyber Platform

A modern, responsive online gaming hub designed to easily run any HTML5/JS web games (including projects added from GitHub), featuring player onboarding, unique Player IDs, real-time private & global messaging, interactive multiplayer invites, **XP & Player Levels**, a **Global Leaderboard**, and an **Achievements System**.

---

## 🏆 New: Gamification, Levels & Leaderboard

### ⚡ 1. Player Levels & XP Progression
- Players earn **XP (Experience Points)** by playing games, submitting high scores, chatting in the lounge, sending game invites, and unlocking achievements.
- Dynamic Level curve (Level 1: Novice, Level 2: Apprentice, Level 3: Cyber Runner, Level 4: Neon Specialist, Level 5: Matrix Veteran, up to Level 10+ Transhuman God).
- **Hero XP Bar**: Live progress bar showing current level, rank title, XP in current level, and percentage to next rank.
- **Level Up Celebration**: Real-time modal and celebration sound whenever you reach a new rank tier!

### 🏅 2. Cyber Hall of Fame (Leaderboard)
- **Top 3 Podium**: Glorious visual podium for 🥇 Gold Champion, 🥈 Silver Challenger, and 🥉 Bronze Contender with glowing borders and avatars.
- **Filter Rankings**:
  - 🏆 Total XP & Levels (Overall platform leaderboard)
  - ⚔️ PolyBattler 3D High Scores
  - ♟️ Cyber 3D Chess Wins & Ratings
  - 🧪 Phantom Alchemist Survival Kills
  - 🐍 Cyber Snake High Scores
  - 🏓 Cyber Pong Match Wins
  - 🧱 Matrix Fall Lines Cleared
- **Direct Challenge**: 1-click «Challenge» button right from the ranking table to invite top players to a match by ID.

### ⭐ 3. Achievements System
- 14 built-in achievements with badges, descriptions, progress bars, and XP rewards:
  - 🚀 **First Steps** (+50 XP): Enter GameHub and set up your profile.
  - 💬 **Cyber Socializer** (+50 XP): Send your first message in lounge or DM.
  - ⚡ **Challenger** (+75 XP): Send a game invite to another player by ID.
  - ♟️ **Cyber Grandmaster** (+150 XP): Win a match in Cyber 3D Chess.
  - ⚔️ **Arena Vanquisher** (+150 XP): Reach Level 5 or 500+ score in PolyBattler 3D.
  - 🧪 **Master Alchemist** (+150 XP): Banish 30+ phantoms in Phantom Alchemist Survival.
  - 🏓 **Pong Duelist** (+100 XP): Win a match in Cyber Pong 2088.
  - 🐍 **Neon Serpent** (+120 XP): Score 100+ points in Cyber Snake Neo.
  - 🧱 **Matrix Architect** (+120 XP): Clear 10+ lines in Matrix Fall.
  - 🕹️ **Arcade Veteran** (+100 XP): Score 500+ total points across arcade games.
  - 🎮 **Game Explorer** (+150 XP): Play 3 different games in GameHub.
  - ⭐ **Rising Star** (+150 XP): Reach Level 3.
  - 👑 **Matrix Overlord** (+250 XP): Reach Level 5.
  - 📦 **Repository Architect** (+200 XP): Add a new game from GitHub.
- **Real-Time Unlock Celebrations**: Toast notification with fanfare sound + announcement in the Global Lounge when any player unlocks a badge!

---

## 🌐 Bilingual & Adaptive by Design (EN / RU)

- **English Default**: All interfaces, catalog filters, modals, in-game overlays, leaderboard columns, and toast notifications default to English.
- **Instant Language Switcher**: Click the **🌐 EN / RU** button in the header at any time to switch the entire platform between English and Russian with zero reload.
- **Adaptive Across All Devices**:
  - 📱 **Mobile Phones**: Dedicated bottom navigation bar (`Catalog`, `Chat`, `Players`, `Ranks`, `Badges`), touch tap targets, swipe gestures & on-screen D-pads in games.
  - 📲 **Tablets**: Fluid 2-column social and leaderboard views.
  - 💻 **Desktops & Laptops**: Clean widescreen HUD and rapid keyboard controls.
  - 🖥️ **Ultra-Wide & 4K Monitors**: Centered max-width container (`1720px`) with sharp scalable fonts and neon cyberpunk aesthetics.

---

## 🚀 How to Run GameHub

From the `gamehub` directory:

```bash
# Install dependencies (if running for the first time)
npm install

# Start the server
npm start
# or
node server.js
```

Open your browser at:
👉 **`http://localhost:4000`**

---

## 📁 Directory Structure

```
gamehub/
├── data/
│   ├── achievements.json    # Predefined achievements with bilingual data & XP rewards
│   ├── players.json         # Persistent player profiles, XP, levels, and scores
│   └── games.json           # Bilingual database of registered games
├── public/
│   ├── css/
│   │   └── style.css        # Responsive styling (Mobile, Tablet, Desktop, 4K, Leaderboard & Podium)
│   ├── js/
│   │   ├── i18n.js          # Internationalization engine (EN / RU)
│   │   ├── avatars.js       # SVG avatar gallery with bilingual titles
│   │   ├── socket-client.js # Socket.IO client & audio synthesis
│   │   ├── gamification.js  # XP, Levels, Leaderboard, and Achievements manager
│   │   ├── chat.js          # Private DMs, Global Lounge, online list
│   │   ├── games-catalog.js # Catalog rendering, filters, game launcher
│   │   └── app.js           # Main coordinator & mobile navigation
│   ├── games/               # Games directory
│   │   ├── 3d-chess/        # Cyber 3D Chess (Three.js 3D, AI, PvP, Mobile touch)
│   │   ├── phantom-alchemist/ # Phantom Alchemist Survival (Three.js 3D Roguelite)
│   │   ├── poly-battler/    # PolyBattler 3D (React Three Fiber 3D Battler)
│   │   ├── cyber-pong/      # Cyber Pong 2088 (Mobile touch support)
│   │   ├── cyber-snake/     # Cyber Snake Neo (Mobile swipe + D-pad)
│   │   └── matrix-fall/     # Matrix Fall (Mobile touch buttons)
│   └── index.html           # Main Single Page Application
├── server.js                # Node.js + Express + Socket.IO server (REST API + sockets)
├── package.json
└── README.md                # Documentation
```
