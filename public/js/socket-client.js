// GameHub Socket Client Manager
class GameHubSocket {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.player = null;
    this.onlinePlayers = [];
    this.listeners = new Map();
  }

  init() {
    // Connect to same origin
    this.socket = io();

    this.socket.on('connect', () => {
      console.log('⚡ Socket connected to GameHub server:', this.socket.id);
      this.connected = true;
      this.trigger('connect', { socketId: this.socket.id });

      // If we already have stored credentials in localStorage, login immediately!
      const savedUser = this.getSavedProfile();
      if (savedUser && savedUser.nickname) {
        this.login(savedUser.nickname, savedUser.avatar, savedUser.id);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      this.connected = false;
      this.trigger('disconnect');
    });

    this.socket.on('connect_error', (err) => {
      console.warn('⚡ Running in stateless serverless mode (Vercel): WebSockets offline, local profile activated.');
      if (!this.player) {
        const savedUser = this.getSavedProfile();
        if (savedUser && savedUser.nickname) {
          this.player = savedUser;
          this.trigger('player:ready', { player: this.player, recentChat: [] });
        }
      }
    });

    // Welcome / login acknowledgment
    this.socket.on('player:welcome', (data) => {
      if (data && data.success) {
        this.player = data.player;
        this.saveProfile(this.player);
        this.trigger('player:ready', { player: this.player, recentChat: data.recentChat });
      }
    });

    // Online players list updated
    this.socket.on('players:update', (playersList) => {
      this.onlinePlayers = playersList;
      this.trigger('players:update', playersList);
    });

    // Global chat message received
    this.socket.on('chat:global', (msg) => {
      this.playNotificationSound('chat');
      this.trigger('chat:global', msg);
    });

    // Private message received
    this.socket.on('chat:private', (msg) => {
      this.playNotificationSound('dm');
      this.trigger('chat:private', msg);
    });

    // Private message echo for sender
    this.socket.on('chat:private_sent', (msg) => {
      this.trigger('chat:private_sent', msg);
    });

    // Game invite received!
    this.socket.on('game:invite_received', (invite) => {
      this.playNotificationSound('invite');
      this.trigger('game:invite_received', invite);
    });

    // Game invite response received
    this.socket.on('game:invite_response', (resp) => {
      this.trigger('game:invite_response', resp);
    });

    // Start session when invite accepted
    this.socket.on('game:start_session', (session) => {
      this.trigger('game:start_session', session);
    });

    // Game added dynamically
    this.socket.on('hub:game_added', (game) => {
      this.trigger('hub:game_added', game);
    });

    this.socket.on('hub:game_removed', (data) => {
      this.trigger('hub:game_removed', data);
    });
  }

  login(nickname, avatar, requestedId = null, callback = null) {
    if (!this.socket) return;
    this.socket.emit('player:login', { nickname, avatar, existingId: requestedId }, (response) => {
      if (response && response.success) {
        this.player = response.player;
        this.saveProfile(this.player);
        this.trigger('player:ready', { player: this.player, recentChat: response.recentChat });
      }
      if (callback) callback(response);
    });
  }

  updateStatus(status, currentGame = null) {
    if (!this.socket) return;
    this.socket.emit('player:status', { status, currentGame });
  }

  sendGlobalMessage(text) {
    if (!this.socket || !text) return;
    this.socket.emit('chat:global', { text });
  }

  sendPrivateMessage(targetId, text, inviteData = null, callback = null) {
    if (!this.socket || !targetId) return;
    this.socket.emit('chat:private', { targetId, text, inviteData }, callback);
  }

  sendGameInvite(targetPlayerId, gameId, gameTitle, message = null, callback = null) {
    if (!this.socket || !targetPlayerId) return;
    this.socket.emit('game:invite', { targetPlayerId, gameId, gameTitle, message }, callback);
  }

  respondToInvite(inviteId, accepted) {
    if (!this.socket || !inviteId) return;
    this.socket.emit('game:invite_respond', { inviteId, accepted });
  }

  // Profile persistence in localStorage
  getSavedProfile() {
    try {
      const data = localStorage.getItem('gamehub_user');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveProfile(profile) {
    try {
      localStorage.setItem('gamehub_user', JSON.stringify(profile));
    } catch (e) {}
  }

  // Event Listener System
  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(handler);
  }

  trigger(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(fn => fn(data));
    }
  }

  // Audio Synthesizer for notifications
  playNotificationSound(type = 'chat') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();

      if (type === 'chat') {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.08);
        g.gain.setValueAtTime(0.08, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'dm') {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(660, ctx.currentTime + 0.06);
        g.gain.setValueAtTime(0.12, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else if (type === 'invite') {
        // Fanfare for invite!
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          g.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.07);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.12);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.12);
        });
      }
    } catch (e) {}
  }
}

// Global instance
window.hubSocket = new GameHubSocket();
