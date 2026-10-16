/**
 * i18n.js — site configuration and all user-facing content (Hungarian + English).
 * terminal.js contains only behaviour; edit this file to change what the site says.
 * Strings may contain {tokens} (e.g. {name}, {email}) that are filled in from CONFIG at render time.
 */

/* ===== Personal configuration ===== */
const CONFIG = {
  user: 'ZLgeri',
  host: 'neumann',
  name: 'Gergő',
  email: 'gergozambolaszlo@gmail.com',
  github: 'https://github.com/zlgeri',
  dotfiles: 'https://github.com/zlgeri/NEW_lua_dotfile_ZLgeri',
};

/* Small HTML helpers: K() highlights a keyword, cmd() renders a clickable command */
const K = s => `<span class="k">${s}</span>`;
const cmd = c => `<button type="button" class="cmd" data-cmd="${c}">${c}</button>`;

/* ===== Machines shown by `neofetch` / `hardware` (rows are label / value pairs) ===== */
const HARDWARE = [
  { id: 'laptop', rows: [
    ['Host', 'Acer Nitro 5'],
    ['CPU', '11th Gen Intel Core i5-11400H (12) @ 4.50 GHz'],
    ['GPU', 'NVIDIA GeForce RTX 3050 Ti Mobile'],
    ['RAM', '16GB DDR4'],
    ['OS', 'Fedora Linux (KDE Plasma)'],
  ]},
  { id: 'desktop', rows: [
    ['Board', 'ASUS TUF GAMING B850M-PLUS WIFI7'],
    ['CPU', 'AMD Ryzen 7 9700X'],
    ['GPU', 'ASUS Radeon RX 9070 XT 16GB'],
    ['RAM', '32GB Kingston FURY Beast DDR5 6000MHz'],
    ['Disk', '1TB WD Black SN7100'],
    ['Cooler', 'ASUS TUF LC II 360 AIO'],
    ['PSU', 'be quiet! Pure Power 13 M 1000W'],
    ['Case', 'DeepCool CG530'],
    ['OS', 'CachyOS (Arch)'],
    ['WM', 'Hyprland'],
    ['Dotfiles', '<a href="{dotfiles}" target="_blank" rel="noopener">{dotfiles}</a>'],
  ]},
];

/* ===== Texts per language. Both languages must have the same keys. ===== */
const I18N = {
  hu: {
    ui: {
      welcome: [
        `${K('{name} portfóliója')} · retro terminal v1.0`,
        `Írd be: ${cmd('help')} — vagy kattints a gyorsparancsokra alul.`,
        `Nyelvváltás: ${cmd('lang en')}`,
        ``,
      ],
      unknown: `<span class="err">bash: {cmd}: parancs nem található.</span> Próbáld: ${cmd('help')}`,
      langSet: 'Nyelv beállítva: magyar.',
      langBad: 'Használat: lang en | lang hu',
      themeSet: 'Téma: {theme}',
      themeBad: 'Használat: theme green | amber | mono',
      sudo: `<span class="err">{user} nincs a sudoers fájlban. Az incidens jelentve lett.</span>`,
    },
    help: {
      title: 'Elérhető parancsok:',
      list: {
        about: 'bemutatkozás (whoami, cat about.txt)',
        skills: 'képességek',
        hardware: 'a gépeim (neofetch)',
        projects: 'projektek',
        contact: 'kapcsolat',
        lang: 'nyelv: lang en | lang hu',
        theme: 'téma: green | amber | mono',
        clear: 'képernyő törlése',
      },
      tip: 'Tipp: Tab = kiegészítés · ↑/↓ = előzmények · bármelyik parancsra rákattinthatsz.',
    },
    about: [
      `${K('{name}')} · 18 éves`,
      `${K('Honnan')}: Salgótarjánban születtem, Etesen élek, Egerben tanulok (kollégista vagyok)`,
      `${K('Iskola')}: Neumann János Gimnázium, Technikum és Kollégium (Eger)`,
      `${K('Szak')}: Szoftverfejlesztő és -tesztelő`,
      ``,
      `Szenvedélyem a Linux, a hálózatok és a hardverek. Szeretek rendszereket építeni és optimalizálni.`,
    ],
    skills: [
      K('## Programozás (alapszint)'),
      `JavaScript · React · HTML · CSS · Python · C#`,
      ``,
      K('## Rendszergazda / OS'),
      `Napi szintű Linux használat: Fedora, Arch/CachyOS`,
      `Ablakkezelők: KDE Plasma, Hyprland`,
      `Debian szerverek, hálózatok`,
    ],
    hardware: {
      laptop: 'Laptop — a mindennapos igásló',
      desktop: 'Desktop — saját építésű, saját zsebből',
    },
    projects: [
      { t: 'Home Server & Sync', d: 'Raspberry Pi 3B+ alapú otthoni szerver, 24/7-ben fut. A Netbird (WireGuard) mesh VPN-nek köszönhetően bárhonnan elérem, portnyitás nélkül. A laptop és a PC közötti fájlátvitelt egy rsync-alapú puffer intézi: a Pi csak átmeneti tároló, sikeres átvitel után automatikusan törli a fájlokat. Ezen tesztelem ezt az oldalt is. Korábban egy 10 éves Acer laptop volt a szerverem; azt a Pi leváltotta, a laptop azóta Linux-disztró tesztgép.' },
      { t: 'Hyprland Dotfiles', d: 'Saját Arch/CachyOS konfiguráció, testreszabott ablakkezelővel. <a href="{dotfiles}" target="_blank" rel="noopener">GitHub</a>' },
      { t: 'Smart TV Revival', d: 'Egy 20 éves, kidobásra ítélt PC megmentése és TV-okosítóvá alakítása Q4OS segítségével édesapámnak.' },
    ],
    contact: [
      `${K('E-mail')}:  <a href="mailto:{email}">{email}</a>`,
      `${K('GitHub')}:  <a href="{github}" target="_blank" rel="noopener">{github}</a>`,
    ],
  },

  en: {
    ui: {
      welcome: [
        `${K("{name}'s portfolio")} · retro terminal v1.0`,
        `Type ${cmd('help')} — or click the quick commands below.`,
        `Switch language: ${cmd('lang hu')}`,
        ``,
      ],
      unknown: `<span class="err">bash: {cmd}: command not found.</span> Try: ${cmd('help')}`,
      langSet: 'Language set to English.',
      langBad: 'Usage: lang en | lang hu',
      themeSet: 'Theme: {theme}',
      themeBad: 'Usage: theme green | amber | mono',
      sudo: `<span class="err">{user} is not in the sudoers file. This incident will be reported.</span>`,
    },
    help: {
      title: 'Available commands:',
      list: {
        about: 'about me (whoami, cat about.txt)',
        skills: 'skills',
        hardware: 'my machines (neofetch)',
        projects: 'projects',
        contact: 'contact',
        lang: 'language: lang en | lang hu',
        theme: 'theme: green | amber | mono',
        clear: 'clear the screen',
      },
      tip: 'Tip: Tab = autocomplete · ↑/↓ = history · every command is clickable.',
    },
    about: [
      `${K('{name}')} · 18 years old`,
      `${K('From')}: Born in Salgótarján, live in Etes, study in Eger (dorm student)`,
      `${K('School')}: Neumann János Gimnázium, Technikum és Kollégium (Eger)`,
      `${K('Track')}: Software development & testing`,
      ``,
      `I'm passionate about Linux, networking and hardware. I love building and optimizing systems.`,
    ],
    skills: [
      K('## Programming (beginner level)'),
      `JavaScript · React · HTML · CSS · Python · C#`,
      ``,
      K('## SysAdmin / OS'),
      `Daily Linux user: Fedora, Arch/CachyOS`,
      `Window managers: KDE Plasma, Hyprland`,
      `Debian servers, networking`,
    ],
    hardware: {
      laptop: 'Laptop — the daily workhorse',
      desktop: 'Desktop — self-built, self-funded',
    },
    projects: [
      { t: 'Home Server & Sync', d: 'A 24/7 home server on a Raspberry Pi 3B+. The Netbird (WireGuard) mesh VPN lets me reach it from anywhere with no open ports. File transfer between my laptop and PC goes through an rsync-based buffer: the Pi is only temporary storage and deletes files automatically after a successful transfer. I test this very site on it, too. It replaced my previous server, a 10-year-old Acer laptop, which is now my Linux distro test machine.' },
      { t: 'Hyprland Dotfiles', d: 'My own Arch/CachyOS setup with a fully customized window manager. <a href="{dotfiles}" target="_blank" rel="noopener">GitHub</a>' },
      { t: 'Smart TV Revival', d: 'Rescued a 20-year-old PC headed for the trash and turned it into a smart TV box for my father using Q4OS.' },
    ],
    contact: [
      `${K('E-mail')}:  <a href="mailto:{email}">{email}</a>`,
      `${K('GitHub')}:  <a href="{github}" target="_blank" rel="noopener">{github}</a>`,
    ],
  },
};
