const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 4000;
const GAMES_FILE = path.join(__dirname, 'data', 'games.json');
const PLAYERS_FILE = path.join(__dirname, 'data', 'players.json');
const ACHIEVEMENTS_FILE = path.join(__dirname, 'data', 'achievements.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Real-time State
const activeSockets = new Map(); // socket.id -> playerId
const onlinePlayers = new Map(); // playerId -> { id, nickname, avatar, status, currentGame, sockets: Set(), lastSeen }
const globalChatHistory = [];
const activeInvites = new Map();

// Helper: load JSON safely
function readJsonFile(filePath, defaultVal = []) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultVal;
}

// Helper: save JSON safely
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error saving ${filePath}:`, err);
    return false;
  }
}

function loadGames() {
  return readJsonFile(GAMES_FILE, []);
}

function saveGames(games) {
  return writeJsonFile(GAMES_FILE, games);
}

function loadAchievements() {
  return readJsonFile(ACHIEVEMENTS_FILE, []);
}

function loadAllPlayers() {
  return readJsonFile(PLAYERS_FILE, {});
}

function saveAllPlayers(playersObj) {
  return writeJsonFile(PLAYERS_FILE, playersObj);
}

// Level Progression Thresholds
const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3300, 4000];

function getLevelInfo(xp) {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || (currentThreshold + 600);
  const xpInCurrentLevel = xp - currentThreshold;
  const xpNeededForLevel = nextThreshold - currentThreshold;
  const progressPercent = Math.min(100, Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100));

  return {
    level,
    xp,
    currentThreshold,
    nextThreshold,
    xpInCurrentLevel,
    xpNeededForLevel,
    progressPercent
  };
}

// Generate unique player ID e.g. GH-48F1
function generatePlayerId() {
  const chars = '0123456789ABCDEF';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars[Math.floor(Math.random() * chars.length)];
  }
  const id = `GH-${rand}`;
  const allPlayers = loadAllPlayers();
  if (allPlayers[id] || onlinePlayers.has(id)) {
    return generatePlayerId();
  }
  return id;
}

// Helper: Get or initialize persistent player record
function getOrCreatePlayerProfile(id, nickname, avatar) {
  const allPlayers = loadAllPlayers();
  if (!allPlayers[id]) {
    allPlayers[id] = {
      id,
      nickname: nickname || 'CyberPlayer',
      avatar: avatar || 'avatar-cyber-samurai',
      xp: 0,
      level: 1,
      achievements: [],
      scores: {},
      gamesPlayed: [],
      created: Date.now(),
      lastSeen: Date.now()
    };
    saveAllPlayers(allPlayers);
  } else {
    if (nickname) allPlayers[id].nickname = nickname;
    if (avatar) allPlayers[id].avatar = avatar;
    allPlayers[id].lastSeen = Date.now();
    saveAllPlayers(allPlayers);
  }
  return allPlayers[id];
}

// Helper: Award XP and check Level Up
function awardPlayerXP(playerId, xpToAdd, reason = '') {
  if (!playerId || xpToAdd <= 0) return null;
  const allPlayers = loadAllPlayers();
  const player = allPlayers[playerId];
  if (!player) return null;

  const oldLevelInfo = getLevelInfo(player.xp || 0);
  player.xp = (player.xp || 0) + xpToAdd;
  const newLevelInfo = getLevelInfo(player.xp);
  player.level = newLevelInfo.level;

  saveAllPlayers(allPlayers);

  // Check Level-based achievements
  if (player.level >= 3) {
    unlockAchievement(playerId, 'rising_star');
  }
  if (player.level >= 5) {
    unlockAchievement(playerId, 'matrix_overlord');
  }

  // If leveled up, trigger event & announcement
  if (newLevelInfo.level > oldLevelInfo.level) {
    io.to(`player:${playerId}`).emit('player:level_up', {
      level: newLevelInfo.level,
      xp: player.xp,
      levelInfo: newLevelInfo
    });

    const levelMsg = {
      id: `sys-${Date.now()}`,
      type: 'system',
      text: `⚡ ${player.nickname} (${player.id}) leveled up to Level ${newLevelInfo.level}!`,
      timestamp: Date.now()
    };
    globalChatHistory.push(levelMsg);
    if (globalChatHistory.length > 60) globalChatHistory.shift();
    io.emit('chat:global', levelMsg);
  }

  // Notify player of XP gain & stats update
  io.to(`player:${playerId}`).emit('player:stats_update', {
    xp: player.xp,
    xpGained: xpToAdd,
    reason,
    levelInfo: newLevelInfo,
    achievements: player.achievements
  });

  broadcastOnlinePlayers();
  return newLevelInfo;
}

// Helper: Unlock an achievement
function unlockAchievement(playerId, achievementId) {
  if (!playerId || !achievementId) return false;
  const allPlayers = loadAllPlayers();
  const player = allPlayers[playerId];
  if (!player) return false;

  if (!Array.isArray(player.achievements)) player.achievements = [];
  if (player.achievements.includes(achievementId)) return false; // Already unlocked

  const achievementsList = loadAchievements();
  const ach = achievementsList.find(a => a.id === achievementId);
  if (!ach) return false;

  player.achievements.push(achievementId);
  saveAllPlayers(allPlayers);

  // Award the achievement's XP reward
  if (ach.xp > 0) {
    awardPlayerXP(playerId, ach.xp, `Achievement: ${ach.title_en}`);
  }

  // Notify the player
  io.to(`player:${playerId}`).emit('achievement:unlocked', ach);

  // Global Lounge announcement
  const achAnnouncement = {
    id: `sys-ach-${Date.now()}`,
    type: 'system',
    text: `🏆 ${player.nickname} unlocked achievement «${ach.title_en}» (+${ach.xp} XP)!`,
    timestamp: Date.now()
  };
  globalChatHistory.push(achAnnouncement);
  if (globalChatHistory.length > 60) globalChatHistory.shift();
  io.emit('chat:global', achAnnouncement);

  return true;
}

// REST API Endpoints
app.get('/api/games', (req, res) => {
  const games = loadGames();
  res.json({ success: true, count: games.length, games });
});

app.post('/api/games', (req, res) => {
  const { title, description, category, tags, path: gamePath, githubUrl, author, multiplayer, icon, badge, color, playerId } = req.body;

  if (!title || !category || !gamePath) {
    return res.status(400).json({ success: false, error: 'Title, category, and path are required' });
  }

  const games = loadGames();
  const id = req.body.id || title.toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || `game-${Date.now()}`;

  if (games.some(g => g.id === id)) {
    return res.status(400).json({ success: false, error: 'A game with this ID already exists' });
  }

  const newGame = {
    id,
    title,
    title_en: title,
    title_ru: title,
    description: description || 'Custom game imported from repository.',
    description_en: description || 'Custom game imported from repository.',
    description_ru: description || 'Пользовательская игра, добавленная из репозитория.',
    category,
    category_en: category,
    category_ru: category,
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : ['GitHub']),
    tags_en: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : ['GitHub']),
    tags_ru: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : ['GitHub']),
    badge: badge || 'New',
    icon: icon || '🎮',
    color: color || '#00f0ff',
    sourceType: gamePath.startsWith('http') ? 'external' : 'local',
    path: gamePath,
    githubUrl: githubUrl || '',
    author: author || 'GitHub Community',
    multiplayer: !!multiplayer,
    maxPlayers: multiplayer ? 2 : 1,
    addedAt: new Date().toISOString().split('T')[0]
  };

  games.unshift(newGame);
  if (saveGames(games)) {
    io.emit('hub:game_added', newGame);

    // If added by a user, award achievement and XP!
    if (playerId) {
      unlockAchievement(playerId, 'game_creator');
    }

    return res.json({ success: true, game: newGame });
  } else {
    return res.status(500).json({ success: false, error: 'Could not save game to registry' });
  }
});

app.delete('/api/games/:id', (req, res) => {
  const { id } = req.params;
  const games = loadGames();
  const filtered = games.filter(g => g.id !== id);
  if (filtered.length === games.length) {
    return res.status(404).json({ success: false, error: 'Game not found' });
  }
  saveGames(filtered);
  io.emit('hub:game_removed', { id });
  res.json({ success: true, message: 'Game removed successfully' });
});

app.get('/api/achievements', (req, res) => {
  const list = loadAchievements();
  res.json({ success: true, count: list.length, achievements: list });
});

// Leaderboard Endpoint: filter by 'xp' (global), or by specific game: 'cyber-snake', 'cyber-pong', 'matrix-fall'
app.get('/api/leaderboard', (req, res) => {
  const category = req.query.category || 'xp';
  const allPlayers = loadAllPlayers();
  const list = Object.values(allPlayers);

  let sorted = [];
  if (category === 'xp') {
    sorted = list.sort((a, b) => (b.xp || 0) - (a.xp || 0));
  } else {
    sorted = list
      .filter(p => p.scores && typeof p.scores[category] !== 'undefined')
      .sort((a, b) => (b.scores[category] || 0) - (a.scores[category] || 0));
  }

  const result = sorted.slice(0, 50).map((p, idx) => {
    const levelInfo = getLevelInfo(p.xp || 0);
    return {
      rank: idx + 1,
      id: p.id,
      nickname: p.nickname,
      avatar: p.avatar,
      xp: p.xp || 0,
      level: levelInfo.level,
      levelInfo,
      score: p.scores ? (p.scores[category] || 0) : 0,
      achievementsCount: Array.isArray(p.achievements) ? p.achievements.length : 0,
      isOnline: onlinePlayers.has(p.id) && onlinePlayers.get(p.id).sockets.size > 0
    };
  });

  res.json({ success: true, category, count: result.length, leaderboard: result });
});

// REST Login / Register Endpoint (Essential for Vercel serverless mode & offline fallbacks)
app.post('/api/player/login', (req, res) => {
  let { nickname, avatar, existingId } = req.body || {};
  nickname = (nickname || 'CyberPlayer').trim().substring(0, 24);
  avatar = avatar || 'avatar-cyber-samurai';

  let id = existingId;
  if (!id || typeof id !== 'string' || !id.startsWith('GH-')) {
    id = generatePlayerId();
  }

  const player = getOrCreatePlayerProfile(id, nickname, avatar);
  const levelInfo = getLevelInfo(player.xp || 0);

  res.json({
    success: true,
    player: {
      id: player.id,
      nickname: player.nickname,
      avatar: player.avatar,
      xp: player.xp || 0,
      level: levelInfo.level,
      levelInfo,
      achievements: player.achievements || [],
      scores: player.scores || {}
    },
    recentChat: globalChatHistory.slice(-25)
  });
});

// REST Profile Update Endpoint
app.post('/api/player/profile', (req, res) => {
  let { id, nickname, avatar } = req.body || {};
  if (!id) return res.status(400).json({ success: false, error: 'Missing player ID' });

  nickname = (nickname || 'CyberPlayer').trim().substring(0, 24);
  avatar = avatar || 'avatar-cyber-samurai';

  const player = getOrCreatePlayerProfile(id, nickname, avatar);
  const levelInfo = getLevelInfo(player.xp || 0);

  res.json({
    success: true,
    player: {
      id: player.id,
      nickname: player.nickname,
      avatar: player.avatar,
      xp: player.xp || 0,
      level: levelInfo.level,
      levelInfo,
      achievements: player.achievements || [],
      scores: player.scores || {}
    }
  });
});

// Submit Game Score & Activity
app.post('/api/player/score', (req, res) => {
  const { playerId, gameId, score, metadata } = req.body;
  if (!playerId || !gameId) {
    return res.status(400).json({ success: false, error: 'Missing playerId or gameId' });
  }

  const allPlayers = loadAllPlayers();
  const player = allPlayers[playerId];
  if (!player) {
    return res.status(404).json({ success: false, error: 'Player profile not found' });
  }

  if (!player.scores) player.scores = {};
  if (!Array.isArray(player.gamesPlayed)) player.gamesPlayed = [];
  if (!player.gamesPlayed.includes(gameId)) player.gamesPlayed.push(gameId);

  // Check 3 games explorer achievement
  if (player.gamesPlayed.length >= 3) {
    unlockAchievement(playerId, 'game_explorer');
  }

  const prevBest = player.scores[gameId] || 0;
  const numericScore = Number(score) || 0;
  if (numericScore > prevBest) {
    player.scores[gameId] = numericScore;
  }
  saveAllPlayers(allPlayers);

  // Calculate XP reward based on game
  let xpReward = 15; // Base XP for completing a session
  if (gameId === 'cyber-snake') {
    xpReward += Math.min(200, Math.floor(numericScore / 3));
    if (numericScore >= 100) unlockAchievement(playerId, 'snake_master');
  } else if (gameId === 'cyber-pong') {
    if (metadata && metadata.winner === player.nickname) {
      xpReward += 100;
      unlockAchievement(playerId, 'pong_champion');
    } else {
      xpReward += 30;
    }
  } else if (gameId === 'matrix-fall') {
    xpReward += Math.min(250, Math.floor(numericScore / 10));
    if (metadata && metadata.lines >= 10) unlockAchievement(playerId, 'matrix_architect');
  } else if (gameId === '3d-chess') {
    xpReward += Math.min(300, Math.floor(numericScore / 6));
    if (metadata && (metadata.winner === 'w' || numericScore >= 1000)) {
      unlockAchievement(playerId, 'chess_grandmaster');
    }
  } else if (gameId === 'poly-battler') {
    xpReward += Math.min(350, Math.floor(numericScore / 10));
    if (numericScore >= 500 || (metadata && metadata.level >= 5)) {
      unlockAchievement(playerId, 'poly_champion');
    }
  } else if (gameId === 'phantom-alchemist') {
    xpReward += Math.min(350, Math.floor(numericScore / 10));
    if (numericScore >= 400 || (metadata && metadata.kills >= 30)) {
      unlockAchievement(playerId, 'phantom_slayer');
    }
  }

  // Check Arcade Veteran (500+ total points across all arcade games)
  const totalScore = Object.values(player.scores || {}).reduce((sum, s) => sum + (Number(s) || 0), 0);
  if (totalScore >= 500) {
    unlockAchievement(playerId, 'arcade_veteran');
  }

  const newLevelInfo = awardPlayerXP(playerId, xpReward, `Played ${gameId}`);

  res.json({
    success: true,
    playerId,
    gameId,
    highScore: player.scores[gameId],
    xpGained: xpReward,
    levelInfo: newLevelInfo
  });
});

app.get('/api/players/online', (req, res) => {
  const onlineList = [];
  const allPlayers = loadAllPlayers();

  onlinePlayers.forEach((p, id) => {
    if (p.sockets.size > 0) {
      const persisted = allPlayers[id] || {};
      const lvl = getLevelInfo(persisted.xp || 0);
      onlineList.push({
        id: p.id,
        nickname: p.nickname,
        avatar: p.avatar,
        status: p.status,
        currentGame: p.currentGame,
        level: lvl.level,
        xp: persisted.xp || 0,
        connectedAt: p.connectedAt
      });
    }
  });
  res.json({ success: true, count: onlineList.length, players: onlineList });
});

app.get('/api/players/:id', (req, res) => {
  const allPlayers = loadAllPlayers();
  const p = allPlayers[req.params.id];
  if (!p) {
    return res.status(404).json({ success: false, error: 'Player not found' });
  }

  const online = onlinePlayers.get(p.id);
  const lvl = getLevelInfo(p.xp || 0);

  res.json({
    success: true,
    player: {
      id: p.id,
      nickname: p.nickname,
      avatar: p.avatar,
      level: lvl.level,
      xp: p.xp || 0,
      levelInfo: lvl,
      achievements: p.achievements || [],
      scores: p.scores || {},
      status: online && online.sockets.size > 0 ? online.status : 'offline',
      currentGame: online ? online.currentGame : null,
      lastSeen: p.lastSeen
    }
  });
});

function broadcastOnlinePlayers() {
  const list = [];
  const allPlayers = loadAllPlayers();

  onlinePlayers.forEach(p => {
    if (p.sockets.size > 0) {
      const persisted = allPlayers[p.id] || {};
      const lvl = getLevelInfo(persisted.xp || 0);
      list.push({
        id: p.id,
        nickname: p.nickname,
        avatar: p.avatar,
        status: p.status,
        currentGame: p.currentGame,
        level: lvl.level,
        xp: persisted.xp || 0
      });
    }
  });
  io.emit('players:update', list);
}

// Socket.io Real-Time Handler
io.on('connection', (socket) => {
  let currentPlayerId = null;

  // 1. Player Login / Reconnect
  socket.on('player:login', (data, callback) => {
    let { nickname, avatar, existingId } = data || {};
    nickname = (nickname || 'CyberPlayer').trim().substring(0, 24);
    avatar = avatar || 'avatar-cyber-samurai';

    let id = existingId;
    if (!id || typeof id !== 'string' || !id.startsWith('GH-')) {
      id = generatePlayerId();
    }

    currentPlayerId = id;
    socket.join(`player:${id}`);
    activeSockets.set(socket.id, id);

    // Get or create persistent profile
    const persistentProfile = getOrCreatePlayerProfile(id, nickname, avatar);

    // Automatically unlock first_steps achievement on onboarding!
    unlockAchievement(id, 'first_steps');

    let activeState = onlinePlayers.get(id);
    if (!activeState) {
      activeState = {
        id,
        nickname: persistentProfile.nickname,
        avatar: persistentProfile.avatar,
        status: 'online',
        currentGame: null,
        sockets: new Set([socket.id]),
        connectedAt: Date.now(),
        lastSeen: Date.now()
      };
      onlinePlayers.set(id, activeState);

      const welcomeMsg = {
        id: `sys-${Date.now()}`,
        type: 'system',
        text: `Player ${persistentProfile.nickname} (${id}) joined GameHub!`,
        timestamp: Date.now()
      };
      globalChatHistory.push(welcomeMsg);
      if (globalChatHistory.length > 60) globalChatHistory.shift();
      io.emit('chat:global', welcomeMsg);

    } else {
      activeState.nickname = persistentProfile.nickname;
      activeState.avatar = persistentProfile.avatar;
      activeState.status = 'online';
      activeState.sockets.add(socket.id);
      activeState.lastSeen = Date.now();
    }

    broadcastOnlinePlayers();

    const lvlInfo = getLevelInfo(persistentProfile.xp || 0);
    const responsePayload = {
      success: true,
      player: {
        id: persistentProfile.id,
        nickname: persistentProfile.nickname,
        avatar: persistentProfile.avatar,
        status: activeState.status,
        currentGame: activeState.currentGame,
        xp: persistentProfile.xp || 0,
        level: lvlInfo.level,
        levelInfo: lvlInfo,
        achievements: persistentProfile.achievements || [],
        scores: persistentProfile.scores || {}
      },
      recentChat: globalChatHistory
    };

    if (typeof callback === 'function') {
      callback(responsePayload);
    } else {
      socket.emit('player:welcome', responsePayload);
    }
  });

  // 2. Status update (in_game, online, etc.)
  socket.on('player:status', ({ status, currentGame }) => {
    if (!currentPlayerId || !onlinePlayers.has(currentPlayerId)) return;
    const p = onlinePlayers.get(currentPlayerId);
    p.status = status || 'online';
    p.currentGame = currentGame || null;
    p.lastSeen = Date.now();
    broadcastOnlinePlayers();
  });

  // 3. Global chat message
  socket.on('chat:global', (msgData) => {
    if (!currentPlayerId || !onlinePlayers.has(currentPlayerId)) return;
    const p = onlinePlayers.get(currentPlayerId);
    const text = (msgData.text || '').trim().substring(0, 500);
    if (!text) return;

    const allPlayers = loadAllPlayers();
    const persisted = allPlayers[currentPlayerId] || {};
    const lvlInfo = getLevelInfo(persisted.xp || 0);

    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: 'user',
      sender: {
        id: p.id,
        nickname: p.nickname,
        avatar: p.avatar,
        level: lvlInfo.level
      },
      text,
      timestamp: Date.now()
    };

    globalChatHistory.push(message);
    if (globalChatHistory.length > 60) globalChatHistory.shift();
    io.emit('chat:global', message);

    // Award 5 XP for chatting and unlock Socializer achievement!
    awardPlayerXP(currentPlayerId, 5, 'Lounge chat');
    unlockAchievement(currentPlayerId, 'socializer');
  });

  // 4. Direct / Private Message by Player ID
  socket.on('chat:private', (data, callback) => {
    if (!currentPlayerId || !onlinePlayers.has(currentPlayerId)) return;
    const sender = onlinePlayers.get(currentPlayerId);
    const { targetId, text, inviteData } = data || {};

    if (!targetId || targetId === sender.id) {
      if (typeof callback === 'function') callback({ success: false, error: 'Invalid recipient' });
      return;
    }

    const recipient = onlinePlayers.get(targetId);
    const isOnline = recipient && recipient.sockets.size > 0;

    const allPlayers = loadAllPlayers();
    const persisted = allPlayers[currentPlayerId] || {};
    const lvlInfo = getLevelInfo(persisted.xp || 0);

    const message = {
      id: `dm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sender: {
        id: sender.id,
        nickname: sender.nickname,
        avatar: sender.avatar,
        level: lvlInfo.level
      },
      recipientId: targetId,
      text: (text || '').trim().substring(0, 500),
      inviteData: inviteData || null,
      timestamp: Date.now(),
      delivered: isOnline
    };

    io.to(`player:${targetId}`).emit('chat:private', message);
    socket.emit('chat:private_sent', message);

    // Award XP and socializer achievement
    awardPlayerXP(currentPlayerId, 5, 'Direct message');
    unlockAchievement(currentPlayerId, 'socializer');

    if (typeof callback === 'function') {
      callback({ success: true, message, recipientOnline: isOnline });
    }
  });

  // 5. Direct Game Invite by Player ID
  socket.on('game:invite', (data, callback) => {
    if (!currentPlayerId || !onlinePlayers.has(currentPlayerId)) return;
    const sender = onlinePlayers.get(currentPlayerId);
    const { targetPlayerId, gameId, gameTitle, message } = data || {};

    if (!targetPlayerId || targetPlayerId === sender.id) {
      if (typeof callback === 'function') callback({ success: false, error: 'Cannot invite yourself' });
      return;
    }

    const target = onlinePlayers.get(targetPlayerId);
    if (!target || target.sockets.size === 0) {
      if (typeof callback === 'function') callback({ success: false, error: 'Player is offline or ID does not exist' });
      return;
    }

    const inviteId = `inv-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const invitePayload = {
      inviteId,
      from: {
        id: sender.id,
        nickname: sender.nickname,
        avatar: sender.avatar
      },
      toId: targetPlayerId,
      gameId,
      gameTitle,
      message: message || `Let's play ${gameTitle}!`,
      timestamp: Date.now()
    };

    activeInvites.set(inviteId, invitePayload);

    io.to(`player:${targetPlayerId}`).emit('game:invite_received', invitePayload);

    const dmInviteMsg = {
      id: `dm-${Date.now()}`,
      sender: { id: sender.id, nickname: sender.nickname, avatar: sender.avatar },
      recipientId: targetPlayerId,
      text: `🎮 Game Invite: ${gameTitle}`,
      inviteData: invitePayload,
      timestamp: Date.now(),
      delivered: true
    };
    io.to(`player:${targetPlayerId}`).emit('chat:private', dmInviteMsg);
    socket.emit('chat:private_sent', dmInviteMsg);

    // Award Challenger achievement & XP
    awardPlayerXP(currentPlayerId, 15, 'Sent game invite');
    unlockAchievement(currentPlayerId, 'challenger');

    if (typeof callback === 'function') {
      callback({ success: true, inviteId });
    }
  });

  // 6. Game Invite Response (Accept / Decline)
  socket.on('game:invite_respond', ({ inviteId, accepted }) => {
    if (!currentPlayerId) return;
    const inv = activeInvites.get(inviteId);
    if (!inv) return;

    inv.status = accepted ? 'accepted' : 'declined';
    const responder = onlinePlayers.get(currentPlayerId);

    io.to(`player:${inv.from.id}`).emit('game:invite_response', {
      inviteId,
      accepted,
      fromId: currentPlayerId,
      fromNickname: responder ? responder.nickname : currentPlayerId,
      gameId: inv.gameId,
      gameTitle: inv.gameTitle
    });

    if (accepted) {
      awardPlayerXP(currentPlayerId, 25, 'Accepted game invite');
      awardPlayerXP(inv.from.id, 25, 'Partner accepted game invite');

      io.to(`player:${inv.from.id}`).emit('game:start_session', {
        gameId: inv.gameId,
        gameTitle: inv.gameTitle,
        partner: { id: responder.id, nickname: responder.nickname, avatar: responder.avatar }
      });
      socket.emit('game:start_session', {
        gameId: inv.gameId,
        gameTitle: inv.gameTitle,
        partner: inv.from
      });
    }

    activeInvites.delete(inviteId);
  });

  // 7. Disconnection
  socket.on('disconnect', () => {
    if (currentPlayerId && onlinePlayers.has(currentPlayerId)) {
      const p = onlinePlayers.get(currentPlayerId);
      p.sockets.delete(socket.id);
      p.lastSeen = Date.now();
      if (p.sockets.size === 0) {
        p.status = 'offline';
        p.currentGame = null;
      }
      broadcastOnlinePlayers();
    }
    activeSockets.delete(socket.id);
  });
});

// Start Server (if not running in serverless Vercel function)
if (!process.env.VERCEL) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`🚀 GameHub Server running at http://localhost:${PORT}`);
    console.log(`🎮 Games Directory: ${path.join(__dirname, 'public', 'games')}`);
    console.log(`===============================================`);
  });
}

module.exports = app;
