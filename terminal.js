/**
 * terminal.js — a tiny fake shell in the browser.
 * Reads CONFIG, HARDWARE and I18N from i18n.js. No dependencies, no build step.
 * Wrapped in an IIFE so nothing leaks into the global scope.
 */
(() => {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = id => document.getElementById(id);
  const out = $('out'), input = $('in'), screen = $('screen');
  const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // localStorage can throw (private mode, blocked storage); the site must work without it.
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };
  // Replace {token} with vars[token] or CONFIG[token]; unknown tokens are left untouched.
  const fmt = (s, vars = {}) => s.replace(/\{(\w+)\}/g, (m, k) => has(vars, k) ? vars[k] : has(CONFIG, k) ? CONFIG[k] : m);
  // Only auto-focus the input on devices with a mouse, so phones don't pop up the keyboard.
  const canHover = matchMedia('(hover: hover)').matches;

  /* ---------- state ---------- */
  const THEMES = ['green', 'amber', 'mono'];
  const CHIPS = ['about', 'skills', 'hardware', 'projects', 'contact', 'help', 'clear'];
  let lang = store.get('lang');
  // Saved choice first, otherwise the browser language.
  if (!has(I18N, lang)) lang = (navigator.language || '').toLowerCase().startsWith('hu') ? 'hu' : 'en';
  let theme = THEMES.includes(store.get('theme')) ? store.get('theme') : 'green';
  const hist = []; let hi = 0;
  const L = () => I18N[lang];
  const promptText = () => `${CONFIG.user}@${CONFIG.host}:~$`;

  /* ---------- output ---------- */
  const scrollDown = () => { screen.scrollTop = screen.scrollHeight; };
  const printHTML = html => {
    const d = document.createElement('div');
    d.className = 'block';
    d.innerHTML = html;
    out.appendChild(d);
    scrollDown();
  };
  const print = lines => printHTML(lines.map(l => `<div class="ln">${fmt(l) || '&nbsp;'}</div>`).join(''));
  const echo = raw => {
    const d = document.createElement('div');
    const p = document.createElement('span');
    d.className = 'ln echo';
    p.className = 'prompt';
    p.textContent = promptText();
    d.append(p, ' ', raw);   // appended as a text node: user input is never parsed as HTML (no XSS)
    out.appendChild(d);
  };

  /* ---------- neofetch ASCII logos ---------- */
  const LOGO = {
    laptop: [' .----------.', ' | &gt;_       |', ' |          |', " '----------'", ' [__________]'].join('\n'),
    desktop: [' .------.', ' | [==] |', ' | [==] |', ' |  ()  |', " '------'"].join('\n'),
  };

  /* ---------- commands ----------
     To add a command: add a function here, then a help.list entry in i18n.js (both languages).
     Return value: string[] (lines to print), string (raw HTML) or null (print nothing). */
  const COMMANDS = {
    help() {
      const h = L().help;
      const w = Math.max(...Object.keys(h.list).map(k => k.length)) + 2;
      return [
        h.title, '',
        ...Object.entries(h.list).map(([c, d]) => `  ${cmd(c)}${' '.repeat(w - c.length)}<span class="d">${d}</span>`),
        '', `<span class="d">${h.tip}</span>`,
      ];
    },
    about: () => L().about,
    skills: () => L().skills,
    projects: () => L().projects.flatMap((p, i) => [K(`[${i + 1}] ${p.t}`), `<span class="ind">${p.d}</span>`, '']),
    contact: () => L().contact,
    neofetch() {
      const names = L().hardware;
      return fmt(HARDWARE.map(m => {
        const head = `${CONFIG.user}@${m.id}`;
        const rows = m.rows.map(([k, v]) => `<div class="ln">${K(k.padEnd(9))}${v}</div>`).join('');
        return `<div class="fetch"><pre class="logo">${LOGO[m.id]}</pre><div class="info">` +
          `<div class="ln">${K(head)} <span class="d">· ${names[m.id]}</span></div>` +
          `<div class="ln d">${'─'.repeat(head.length)}</div>${rows}</div></div>`;
      }).join(''));
    },
    clear() { out.innerHTML = ''; return null; },
    lang([l]) {
      if (!has(I18N, l)) return [L().ui.langBad];
      setLang(l);
      return [L().ui.langSet];
    },
    theme([n]) {
      const next = n || THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
      if (!THEMES.includes(next)) return [L().ui.themeBad];
      setTheme(next);
      return [L().ui.themeSet.replace('{theme}', next)];
    },
    sudo: () => [L().ui.sudo],
  };
  const ALIASES = { whoami: 'about', 'cat about.txt': 'about', hardware: 'neofetch', '?': 'help' };

  /* ---------- run a command line ---------- */
  function run(raw) {
    echo(raw);
    const line = raw.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!line) return;
    hist.push(raw.trim()); hi = hist.length;
    const [head, ...args] = line.split(' ');
    const name = has(ALIASES, line) ? ALIASES[line] : has(ALIASES, head) ? ALIASES[head] : head;
    if (!has(COMMANDS, name)) {
      const msg = fmt(L().ui.unknown).replace('{cmd}', () => esc(line));
      return printHTML(`<div class="ln">${msg}</div>`);
    }
    const res = COMMANDS[name](args);
    if (typeof res === 'string') printHTML(res);
    else if (res) print(res);
  }

  function complete() {
    const v = input.value.trim().toLowerCase();
    if (!v) return;
    const m = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)].filter(c => c.startsWith(v));
    if (m.length === 1) input.value = m[0];
  }

  /* ---------- language / theme / window chrome ---------- */
  function renderChrome() {
    document.documentElement.lang = lang;
    $('prompt').textContent = promptText();
    $('title').textContent = `${CONFIG.user}@${CONFIG.host}: ~`;
    $('langBtn').textContent = lang === 'hu' ? 'EN' : 'HU';
    $('chips').innerHTML = CHIPS.map(cmd).join('');
  }
  function setLang(l) { lang = l; store.set('lang', l); renderChrome(); }
  function setTheme(t) { theme = t; document.documentElement.dataset.theme = t; store.set('theme', t); }

  /* ---------- events ---------- */
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { run(input.value); input.value = ''; }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (hi > 0) input.value = hist[--hi]; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); hi = Math.min(hi + 1, hist.length); input.value = hist[hi] || ''; }
    else if (e.key === 'Tab') { e.preventDefault(); complete(); }
    else if (e.ctrlKey && e.key.toLowerCase() === 'l') { e.preventDefault(); out.innerHTML = ''; }
  });

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-cmd]');
    if (b) { run(b.dataset.cmd); if (canHover) input.focus({ preventScroll: true }); return; }
    if (e.target.closest('a')) return;
    if (!String(getSelection()) && e.target.closest('.screen')) input.focus({ preventScroll: true });
  });
  $('langBtn').addEventListener('click', () => run('lang ' + (lang === 'hu' ? 'en' : 'hu')));
  $('themeBtn').addEventListener('click', () => run('theme'));

  /* ---------- boot ---------- */
  setTheme(theme);
  renderChrome();
  print(L().ui.welcome);
  run('whoami');
  hist.length = 0; hi = 0;
  if (canHover) input.focus({ preventScroll: true });
})();
