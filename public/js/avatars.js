// GameHub Built-in Avatar Gallery
const AVATARS = [
  {
    id: 'avatar-cyber-samurai',
    name: 'Cyber Samurai',
    name_en: 'Cyber Samurai',
    name_ru: 'Кибер-Самурай',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-sam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff0055"/>
          <stop offset="100%" stop-color="#7209b7"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-sam)"/>
      <polygon points="50,15 25,45 75,45" fill="#111827"/>
      <rect x="35" y="45" width="30" height="35" rx="6" fill="#1f2937"/>
      <rect x="38" y="52" width="24" height="6" rx="3" fill="#00f0ff"/>
      <circle cx="43" cy="55" r="2" fill="#fff"/>
      <circle cx="57" cy="55" r="2" fill="#fff"/>
      <path d="M42,68 Q50,73 58,68" stroke="#ff0055" stroke-width="3" fill="none"/>
    </svg>`
  },
  {
    id: 'avatar-neon-hacker',
    name: 'Neon Hacker',
    name_en: 'Neon Hacker',
    name_ru: 'Неоновый Хакер',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-hacker" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f5d4"/>
          <stop offset="100%" stop-color="#0b525b"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-hacker)"/>
      <path d="M25,85 C25,40 30,22 50,22 C70,22 75,40 75,85 Z" fill="#0d1b2a"/>
      <polygon points="34,48 66,48 62,60 38,60" fill="#00ff66"/>
      <line x1="36" y1="54" x2="64" y2="54" stroke="#fff" stroke-width="2"/>
      <text x="50" y="78" font-size="9" fill="#00ff66" text-anchor="middle" font-family="monospace">&gt;_DEV</text>
    </svg>`
  },
  {
    id: 'avatar-retro-gamer',
    name: 'Retro Gamer',
    name_en: 'Retro Gamer',
    name_ru: 'Ретро-Геймер',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-retro" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f72585"/>
          <stop offset="100%" stop-color="#4361ee"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-retro)"/>
      <rect x="26" y="38" width="48" height="26" rx="8" fill="#1e1e24"/>
      <rect x="30" y="42" width="40" height="18" rx="5" fill="#ffe600"/>
      <circle cx="40" cy="51" r="4" fill="#1e1e24"/>
      <circle cx="60" cy="51" r="4" fill="#1e1e24"/>
      <path d="M22,50 A28,28 0 0,1 78,50" stroke="#fff" stroke-width="4" fill="none"/>
      <rect x="20" y="44" width="6" height="16" rx="3" fill="#fff"/>
      <rect x="74" y="44" width="6" height="16" rx="3" fill="#fff"/>
    </svg>`
  },
  {
    id: 'avatar-cyborg-droid',
    name: 'Cyber Droid',
    name_en: 'Cyber Droid',
    name_ru: 'Кибер-Дроид',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-droid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3a0ca3"/>
          <stop offset="100%" stop-color="#4cc9f0"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-droid)"/>
      <rect x="30" y="32" width="40" height="38" rx="10" fill="#e2e8f0"/>
      <line x1="50" y1="32" x2="50" y2="20" stroke="#e2e8f0" stroke-width="4"/>
      <circle cx="50" cy="18" r="5" fill="#f72585"/>
      <rect x="36" y="42" width="28" height="14" rx="4" fill="#0f172a"/>
      <circle cx="43" cy="49" r="3" fill="#00f0ff"/>
      <circle cx="57" cy="49" r="3" fill="#00f0ff"/>
      <line x1="42" y1="62" x2="58" y2="62" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'avatar-pixel-knight',
    name: 'Pixel Knight',
    name_en: 'Pixel Knight',
    name_ru: 'Пиксельный Рыцарь',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-knight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f8961e"/>
          <stop offset="100%" stop-color="#f3722c"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-knight)"/>
      <rect x="30" y="26" width="40" height="48" rx="8" fill="#334155"/>
      <polygon points="50,14 42,26 58,26" fill="#ef4444"/>
      <rect x="36" y="44" width="28" height="6" fill="#ffe600"/>
      <rect x="47" y="44" width="6" height="20" fill="#ffe600"/>
    </svg>`
  },
  {
    id: 'avatar-cosmo-pilot',
    name: 'Cosmo Pilot',
    name_en: 'Cosmo Pilot',
    name_ru: 'Космо-Пилот',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-cosmo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14213d"/>
          <stop offset="100%" stop-color="#000000"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-cosmo)"/>
      <circle cx="50" cy="50" r="28" fill="#e5e5e5"/>
      <ellipse cx="50" cy="50" rx="20" ry="15" fill="#fca311"/>
      <ellipse cx="46" cy="46" rx="8" ry="4" fill="#ffffff" opacity="0.6"/>
      <circle cx="28" cy="62" r="3" fill="#00f0ff"/>
    </svg>`
  },
  {
    id: 'avatar-neon-cat',
    name: 'Neon Cat',
    name_en: 'Neon Cat',
    name_ru: 'Кибер-Кот',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-cat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b5179e"/>
          <stop offset="100%" stop-color="#7209b7"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-cat)"/>
      <polygon points="30,42 22,18 42,30" fill="#1a1a2e"/>
      <polygon points="70,42 78,18 58,30" fill="#1a1a2e"/>
      <polygon points="30,38 25,24 38,30" fill="#f72585"/>
      <polygon points="70,38 75,24 62,30" fill="#f72585"/>
      <ellipse cx="50" cy="52" rx="28" ry="24" fill="#1a1a2e"/>
      <ellipse cx="40" cy="48" rx="6" ry="8" fill="#00f0ff"/>
      <ellipse cx="60" cy="48" rx="6" ry="8" fill="#00f0ff"/>
      <circle cx="40" cy="48" r="3" fill="#000"/>
      <circle cx="60" cy="48" r="3" fill="#000"/>
      <polygon points="50,56 47,59 53,59" fill="#ff0077"/>
      <path d="M44,63 Q50,66 56,63" stroke="#fff" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'avatar-cyber-mage',
    name: 'Cyber Mage',
    name_en: 'Cyber Mage',
    name_ru: 'Кибер-Маг',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-mage" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#480ca8"/>
          <stop offset="100%" stop-color="#4cc9f0"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-mage)"/>
      <polygon points="50,12 24,56 76,56" fill="#1b1b3a"/>
      <ellipse cx="50" cy="56" rx="30" ry="7" fill="#6930c3"/>
      <circle cx="50" cy="62" r="16" fill="#0f1026"/>
      <circle cx="44" cy="62" r="3" fill="#ffe600"/>
      <circle cx="56" cy="62" r="3" fill="#ffe600"/>
      <polygon points="50,28 53,34 50,40 47,34" fill="#4cc9f0"/>
    </svg>`
  }
];

function getAvatarSvg(avatarId) {
  const found = AVATARS.find(a => a.id === avatarId);
  return found ? found.svg : AVATARS[0].svg;
}

function getAvatarName(avatarId, lang = 'en') {
  const found = AVATARS.find(a => a.id === avatarId);
  if (!found) return 'Avatar';
  return lang === 'ru' ? found.name_ru : found.name_en;
}
