/*
  OpenLeash — app logic
  Vanilla JS, no build step. Content lives in content/programs.js and content/guides.js.
  All data is stored on the device (localStorage key "openleash.v1").
*/
(() => {
  'use strict';

  /* ───────────────── Content ───────────────── */

  const PROGRAMS = Array.isArray(window.OL_PROGRAMS) ? window.OL_PROGRAMS : [];
  const GUIDES = Array.isArray(window.OL_GUIDES) ? window.OL_GUIDES : [];
  const BY_ID = Object.create(null);
  PROGRAMS.forEach(p => { if (p && p.id && Array.isArray(p.steps) && p.steps.length) BY_ID[p.id] = p; });
  const GUIDE_BY_ID = Object.create(null);
  GUIDES.forEach(g => { if (g && g.id) GUIDE_BY_ID[g.id] = g; });

  const CATEGORIES = [
    { id: 'start', title: 'Start here' },
    { id: 'skills', title: 'Everyday skills' },
    { id: 'problems', title: 'Fix a problem' },
    { id: 'care', title: 'Home & care' }
  ];

  const MAX_ACTIVE = 3;
  const STORE_KEY = 'openleash.v1';
  const MAX_SESSION_SEC = 90 * 60;

  const WHISTLE_PITCHES = [
    { hz: 3000, label: 'Low · 3 kHz' },
    { hz: 4000, label: 'Medium · 4 kHz' },
    { hz: 5000, label: 'High · 5 kHz' },
    { hz: 6000, label: 'Higher · 6 kHz' }
  ];
  const WHISTLE_PATTERNS = [
    { id: 'pips', label: 'Pip-pip-pip', short: 'pip-pip-pip' },
    { id: 'long', label: 'Long blast', short: 'long blast' },
    { id: 'hold', label: 'Hold to blow', short: 'hold to blow' }
  ];
  const RATINGS = {
    3: { emoji: '🎯', label: 'Nailed it', sub: 'About 8 of 10 or better' },
    2: { emoji: '👍', label: 'Getting there', sub: 'Some good reps, some misses' },
    1: { emoji: '😓', label: 'Tough one', sub: 'Mostly misses, or too distracted' }
  };

  const LOGO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12.6C6 9.4 6.4 2.8 12 2.8S18 9.4 12 12.6"/><path d="M12 12.6C12 16 15.6 16.2 15.6 19.4"/><circle cx="15.6" cy="21" r="1.5"/></svg>';
  const GEAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9M18.5 7H20M4 17h3.5M12 17h8"/><circle cx="15.8" cy="7" r="2.4"/><circle cx="9.8" cy="17" r="2.4"/></svg>';

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = () => (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;

  /* ───────────────── Storage ───────────────── */

  function defaults() {
    return {
      v: 1,
      dogName: '',
      active: [],          // program ids shown on Today (max 3)
      progress: {},        // { programId: { step } }
      sessions: [],        // saved sessions
      settings: { whistleHz: 4000, whistlePattern: 'pips', reminderTime: '18:00' },
      flags: {},
      draft: null          // session in progress
    };
  }

  function normalize(raw) {
    const d = defaults();
    if (!raw || typeof raw !== 'object') return d;
    const s = Object.assign(defaults(), raw);
    s.settings = Object.assign(d.settings, raw.settings || {});
    if (!WHISTLE_PITCHES.some(p => p.hz === s.settings.whistleHz)) s.settings.whistleHz = 4000;
    if (!WHISTLE_PATTERNS.some(p => p.id === s.settings.whistlePattern)) s.settings.whistlePattern = 'pips';
    s.flags = Object.assign({}, raw.flags || {});
    s.progress = (raw.progress && typeof raw.progress === 'object') ? raw.progress : {};
    s.sessions = Array.isArray(raw.sessions)
      ? raw.sessions.filter(x => x && typeof x.start === 'number' && typeof x.programId === 'string')
      : [];
    s.active = Array.isArray(raw.active)
      ? raw.active.filter(id => BY_ID[id]).filter((id, i, a) => a.indexOf(id) === i).slice(0, MAX_ACTIVE)
      : [];
    s.dogName = typeof raw.dogName === 'string' ? raw.dogName.slice(0, 40) : '';
    if (s.draft && (!BY_ID[s.draft.programId] || typeof s.draft.start !== 'number')) s.draft = null;
    return s;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? normalize(JSON.parse(raw)) : defaults();
    } catch (e) {
      return defaults();
    }
  }

  let state = load();

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
      toast("Couldn't save — this browser is blocking storage.");
    }
  }

  function askPersist() {
    if (state.flags.persistAsked) return;
    state.flags.persistAsked = true;
    save();
    try {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    } catch (e) { /* ignore */ }
  }

  /* ───────────────── Helpers ───────────────── */

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');

  function dayKey(t) {
    const d = new Date(t);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }
  function fmtClock(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return Math.floor(s / 60) + ':' + pad(s % 60);
  }
  function fmtDuration(sec) {
    if (sec < 60) return sec + ' sec';
    return Math.round(sec / 60) + ' min';
  }
  function fmtDayLabel(key) {
    if (key === dayKey(Date.now())) return 'Today';
    if (key === dayKey(addDays(new Date(), -1))) return 'Yesterday';
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  }
  function dogName() { return state.dogName ? esc(state.dogName) : 'your dog'; }

  function stepIndex(pid) {
    const p = BY_ID[pid];
    if (!p) return 0;
    const i = (state.progress[pid] && state.progress[pid].step) || 0;
    return Math.min(Math.max(0, i | 0), p.steps.length - 1);
  }
  function setStep(pid, i) {
    const p = BY_ID[pid];
    if (!p) return;
    i = Math.min(Math.max(0, i | 0), p.steps.length - 1);
    state.progress[pid] = Object.assign({}, state.progress[pid], { step: i });
    save();
  }
  function lastTrained(pid) {
    let t = 0;
    for (const s of state.sessions) if (s.programId === pid && s.start > t) t = s.start;
    return t;
  }
  function isStarted(pid) {
    return stepIndex(pid) > 0 || state.sessions.some(s => s.programId === pid);
  }

  function streakInfo() {
    const days = new Set(state.sessions.map(s => dayKey(s.start)));
    const today = new Date();
    const trainedToday = days.has(dayKey(today));
    let d = trainedToday ? today : addDays(today, -1);
    let streak = 0;
    while (days.has(dayKey(d))) { streak++; d = addDays(d, -1); }
    let last7 = 0;
    for (let i = 0; i < 7; i++) if (days.has(dayKey(addDays(today, -i)))) last7++;
    return { streak, trainedToday, last7, days };
  }

  function firstDayOfWeek() {
    try {
      const loc = new Intl.Locale(navigator.language || 'en-US');
      const wi = typeof loc.getWeekInfo === 'function' ? loc.getWeekInfo() : loc.weekInfo;
      if (wi && wi.firstDay) return wi.firstDay % 7; // 7 (Sunday) -> 0
    } catch (e) { /* ignore */ }
    return /^(en-US|en-CA|ja|pt-BR|he|ko|zh-TW)/.test(navigator.language || 'en-US') ? 0 : 1;
  }
  function narrowDay(date) {
    return date.toLocaleDateString(undefined, { weekday: 'narrow' });
  }

  function whistleLabel() {
    const pat = WHISTLE_PATTERNS.find(p => p.id === state.settings.whistlePattern) || WHISTLE_PATTERNS[0];
    return pat.short + ' · ' + (state.settings.whistleHz / 1000) + ' kHz';
  }

  function appUrl() {
    return location.origin + location.pathname.replace(/index\.html$/, '');
  }

  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }

  function download(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 5000);
  }

  /* ───────────────── Sound: clicker + whistle ───────────────── */

  const Sound = (() => {
    let ctx = null, master = null, clickBuf = null, unlocked = false;
    let holdNodes = null, holdTimer = null;

    function create() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      try { ctx = new AC({ latencyHint: 'interactive' }); } catch (e) { ctx = new AC(); }
      master = ctx.createGain();
      master.gain.value = 1;
      master.connect(ctx.destination);
      clickBuf = makeClick();
      return true;
    }

    // A short, sharp transient: a decaying noise burst plus two quick tones,
    // which reads as a crisp "tick" even through small phone speakers.
    function makeClick() {
      const sr = ctx.sampleRate;
      const len = Math.floor(sr * 0.03);
      const buf = ctx.createBuffer(1, len, sr);
      const d = buf.getChannelData(0);
      let peak = 0;
      for (let i = 0; i < len; i++) {
        const t = i / sr;
        const noise = (Math.random() * 2 - 1) * Math.exp(-t / 0.0012);
        const ping = Math.sin(2 * Math.PI * 3200 * t) * Math.exp(-t / 0.004) * 0.9 +
                     Math.sin(2 * Math.PI * 1700 * t) * Math.exp(-t / 0.006) * 0.5;
        d[i] = noise * 0.9 + ping;
        peak = Math.max(peak, Math.abs(d[i]));
      }
      const k = 0.95 / (peak || 1);
      for (let i = 0; i < len; i++) d[i] *= k;
      return buf;
    }

    function silentWavUrl() {
      const sr = 8000, n = 800;
      const buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
      const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
      w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
      v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
      v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
      w(36, 'data'); v.setUint32(40, n * 2, true);
      return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
    }

    // On iPhone, Web Audio follows the ring/silent switch unless the page asks for "playback".
    function iosPlayback() {
      try {
        if (navigator.audioSession) { navigator.audioSession.type = 'playback'; return; }
      } catch (e) { /* ignore */ }
      if (!isIOS) return;
      try {
        const el = new Audio(silentWavUrl());
        el.setAttribute('playsinline', '');
        el.play().catch(() => {});
      } catch (e) { /* ignore */ }
    }

    function unlock() {
      if (!ctx && !create()) return false;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      if (!unlocked) {
        unlocked = true;
        iosPlayback();
        try {
          const b = ctx.createBuffer(1, 1, ctx.sampleRate);
          const s = ctx.createBufferSource();
          s.buffer = b; s.connect(ctx.destination); s.start(0);
        } catch (e) { /* ignore */ }
      }
      return true;
    }

    function click() {
      if (!unlock()) return;
      const s = ctx.createBufferSource();
      s.buffer = clickBuf;
      s.connect(master);
      s.start(0);
      if (navigator.vibrate) { try { navigator.vibrate(12); } catch (e) { /* ignore */ } }
    }

    function tone(hz, at, dur) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = hz;
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(0.9, at + 0.008);
      g.gain.setValueAtTime(0.9, at + dur - 0.012);
      g.gain.linearRampToValueAtTime(0, at + dur);
      o.connect(g); g.connect(master);
      o.start(at); o.stop(at + dur + 0.02);
    }

    // Returns how long the pattern lasts, in ms.
    function whistle(pattern, hz) {
      if (!unlock()) return 0;
      const t0 = ctx.currentTime + 0.005;
      if (pattern === 'long') { tone(hz, t0, 1.0); return 1000; }
      for (let i = 0; i < 3; i++) tone(hz, t0 + i * 0.2, 0.12);
      return 520;
    }

    function holdStart(hz) {
      if (!unlock()) return;
      holdStop();
      const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
      o.type = 'sine';
      o.frequency.value = hz;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.9, t + 0.01);
      o.connect(g); g.connect(master);
      o.start(t);
      holdNodes = { o, g };
      holdTimer = setTimeout(holdStop, 4000); // safety stop
    }

    function holdStop() {
      clearTimeout(holdTimer);
      if (!holdNodes || !ctx) return;
      const { o, g } = holdNodes, t = ctx.currentTime;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + 0.015);
      try { o.stop(t + 0.03); } catch (e) { /* ignore */ }
      holdNodes = null;
    }

    return { unlock, click, whistle, holdStart, holdStop };
  })();

  // Unlock audio on the first real tap anywhere (iOS needs a click/touchend, not just pointerdown).
  ['click', 'touchend'].forEach(t => document.addEventListener(t, () => Sound.unlock(), { capture: true, passive: true }));

  /* ───────────────── Screen wake lock ───────────────── */

  const Wake = {
    lock: null,
    want: false,
    async on() {
      this.want = true;
      try {
        if ('wakeLock' in navigator && !this.lock) {
          this.lock = await navigator.wakeLock.request('screen');
          this.lock.addEventListener('release', () => { this.lock = null; });
        }
      } catch (e) { /* not supported or denied */ }
    },
    off() {
      this.want = false;
      try { if (this.lock) this.lock.release(); } catch (e) { /* ignore */ }
      this.lock = null;
    }
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && Wake.want) Wake.on();
  });

  /* ───────────────── Press handling (clicker + whistle) ───────────────── */

  // Fires on touch-down, not on release — release adds a noticeable delay.
  function bindPress(el, onDown, onUp) {
    el.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      try { el.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
      onDown(e);
    });
    if (onUp) ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => el.addEventListener(t, onUp));
    el.addEventListener('contextmenu', e => e.preventDefault());
    el.addEventListener('click', e => e.preventDefault());
    el.addEventListener('keydown', e => {
      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); onDown(e); }
    });
    if (onUp) el.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') onUp(e); });
  }

  function wireClickPad(pad, onCount) {
    bindPress(pad, () => {
      Sound.click();
      pad.classList.add('is-down');
      pad.classList.remove('flash');
      void pad.offsetWidth; // restart the flash animation
      pad.classList.add('flash');
      if (onCount) onCount();
    }, () => pad.classList.remove('is-down'));
  }

  function wireWhistle(btn) {
    let busy = false;
    bindPress(btn, () => {
      const { whistlePattern: pat, whistleHz: hz } = state.settings;
      if (pat === 'hold') {
        Sound.holdStart(hz);
        btn.classList.add('is-on');
        return;
      }
      if (busy) return;
      busy = true;
      btn.classList.add('is-on');
      const ms = Sound.whistle(pat, hz);
      setTimeout(() => { busy = false; btn.classList.remove('is-on'); }, Math.max(ms, 150));
    }, () => {
      if (state.settings.whistlePattern === 'hold') {
        Sound.holdStop();
        btn.classList.remove('is-on');
      }
    });
  }

  /* ───────────────── Router ───────────────── */

  let cleanup = null;
  let deferredInstall = null;

  function parseHash() {
    const h = (location.hash || '#/today').replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    return { name: parts[0] || 'today', arg: parts[1] ? decodeURIComponent(parts[1]) : null };
  }

  function go(path) {
    if (location.hash === '#' + path) render();
    else location.hash = path;
  }

  function tabFor(name) {
    return ({ today: 'today', settings: 'today', programs: 'programs', program: 'programs', guide: 'programs', tools: 'tools', log: 'log' })[name] || '';
  }

  function render() {
    if (cleanup) { try { cleanup(); } catch (e) { /* ignore */ } cleanup = null; }
    const view = $('#view');
    if (!PROGRAMS.length) {
      view.innerHTML = '<div class="empty"><div class="big">⚠️</div><p>Training content didn\'t load. Check that content/programs.js is present.</p></div>';
      return;
    }
    const r = parseHash();
    const inSession = r.name === 'session';
    document.body.classList.toggle('in-session', inSession);
    document.querySelectorAll('.tab').forEach(t => {
      const on = t.dataset.tab === tabFor(r.name);
      t.classList.toggle('is-active', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });

    switch (r.name) {
      case 'today': renderToday(view); break;
      case 'programs': renderPrograms(view); break;
      case 'program': if (BY_ID[r.arg]) renderProgram(view, r.arg); else return go('/programs'); break;
      case 'guide': if (GUIDE_BY_ID[r.arg]) renderGuide(view, r.arg); else return go('/programs'); break;
      case 'tools': renderTools(view); break;
      case 'log': renderLog(view); break;
      case 'settings': renderSettings(view); break;
      case 'session': if (state.draft) renderSession(view); else return go('/today'); break;
      default: return go('/today');
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', render);

  /* ───────────────── Today ───────────────── */

  function statusHTML(st) {
    let line, sub, cls;
    if (st.trainedToday) {
      cls = 'is-done';
      line = '✓ Trained today';
      sub = (st.streak > 1 ? st.streak + '-day streak · ' : '') + st.last7 + ' of the last 7 days';
    } else if (st.streak > 0) {
      cls = 'is-due';
      line = 'Train today to keep your ' + st.streak + '-day streak';
      sub = 'Five minutes is enough.';
    } else {
      cls = 'is-due';
      line = 'Train today';
      sub = state.sessions.length ? st.last7 + ' of the last 7 days · five minutes is enough.' : 'Five minutes is enough. Short sessions beat long ones.';
    }
    let dots = '';
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = addDays(today, -i);
      const on = st.days.has(dayKey(d));
      dots += `<span class="week-dot${on ? ' on' : ''}${i === 0 ? ' today' : ''}"><i></i>${esc(narrowDay(d))}</span>`;
    }
    return `<section class="status ${cls}" aria-live="polite">
      <div class="status-line">${line}</div>
      <div class="status-sub">${sub}</div>
      <div class="week-dots" aria-hidden="true">${dots}</div>
    </section>`;
  }

  function installTipHTML() {
    if (isStandalone() || state.flags.installDismissed) return '';
    if (isIOS) {
      return `<section class="card">
        <h2>Add OpenLeash to your Home Screen</h2>
        <p>Tap the Share button, then <b>Add to Home Screen</b>. It opens like an app, works offline at the park, and protects your progress — Safari can erase website data after 7 days without a visit.</p>
        <button class="btn btn-ghost" data-act="dismiss-install">Not now</button>
      </section>`;
    }
    if (deferredInstall) {
      return `<section class="card">
        <h2>Install OpenLeash</h2>
        <p>Opens like an app and works offline at the park.</p>
        <div class="btn-row"><button class="btn btn-primary" data-act="install">Install</button><button class="btn btn-ghost" data-act="dismiss-install">Not now</button></div>
      </section>`;
    }
    return '';
  }

  function heroHTML(pid, multiple) {
    const p = BY_ID[pid], i = stepIndex(pid), st = p.steps[i];
    const pct = Math.round((i / p.steps.length) * 100);
    return `<section class="hero">
      <div class="hero-kicker">${multiple ? 'Up next' : "Today's training"}</div>
      <div class="hero-title"><span class="emoji-tile" aria-hidden="true">${p.icon}</span><h2>${esc(p.title)}</h2></div>
      <p class="hero-step muted">Step ${i + 1} of ${p.steps.length}: <b>${esc(st.title)}</b></p>
      <div class="progress" aria-hidden="true"><i style="width:${Math.max(pct, 4)}%"></i></div>
      <button class="btn btn-primary btn-block" data-train="${p.id}">▶ Start training</button>
      <a class="btn btn-ghost btn-block" href="#/program/${p.id}">See all steps</a>
    </section>`;
  }

  function rowTrainHTML(pid) {
    const p = BY_ID[pid], i = stepIndex(pid);
    return `<div class="row">
      <span class="emoji-tile" aria-hidden="true">${p.icon}</span>
      <a class="row-main" href="#/program/${p.id}" style="text-decoration:none">
        <div class="row-title">${esc(p.title)}</div>
        <div class="row-sub">Step ${i + 1} of ${p.steps.length} · ${esc(p.steps[i].title)}</div>
      </a>
      <button class="btn btn-primary" data-train="${p.id}">Train</button>
    </div>`;
  }

  function welcomeHTML() {
    const picks = ['recall', 'foundations', 'leash', 'digging', 'jumping'].filter(id => BY_ID[id]);
    return `<section class="card">
      <h2>Free dog training, step by step</h2>
      <p>Reward-based only. No account and no paywall — your progress stays on this phone.</p>
      <div class="field">
        <label for="dogname">Your dog's name <span class="muted">(optional)</span></label>
        <input id="dogname" class="input" type="text" maxlength="40" autocomplete="off" value="${esc(state.dogName)}" placeholder="e.g. Scout">
      </div>
      <p><b>Pick one to start.</b> <span class="muted">You can add up to 3.</span></p>
      <div class="list">
        ${picks.map(id => {
          const p = BY_ID[id];
          return `<div class="row">
            <span class="emoji-tile" aria-hidden="true">${p.icon}</span>
            <div class="row-main"><div class="row-title">${esc(p.title)}</div><div class="row-sub">${esc(p.summary)}</div></div>
            <button class="btn btn-quiet" data-add="${p.id}" aria-label="Add ${esc(p.title)}">Add</button>
          </div>`;
        }).join('')}
      </div>
      <a class="btn btn-ghost btn-block" href="#/programs" style="margin-top:8px">Browse all ${PROGRAMS.length} programs</a>
    </section>`;
  }

  function renderToday(view) {
    const st = streakInfo();
    const active = state.active.filter(id => BY_ID[id]);
    let html = `<header class="topbar">
      <div class="brand"><span class="brand-mark">${LOGO}</span><span class="brand-name">OpenLeash</span></div>
      <a class="icon-btn" href="#/settings" aria-label="Settings">${GEAR}</a>
    </header>`;

    html += installTipHTML();

    if (state.draft) {
      const p = BY_ID[state.draft.programId];
      const mins = Math.max(1, Math.round((Date.now() - state.draft.start) / 60000));
      html += `<section class="card">
        <h2>Unfinished session</h2>
        <p class="muted">${p.icon} ${esc(p.title)} · started ${mins} min ago</p>
        <div class="btn-row"><a class="btn btn-primary" href="#/session">Resume</a><button class="btn btn-quiet" data-act="discard-draft">Discard</button></div>
      </section>`;
    }

    html += statusHTML(st);

    if (!active.length) {
      html += welcomeHTML();
    } else {
      const order = active.slice().sort((a, b) => (lastTrained(a) - lastTrained(b)) || (active.indexOf(a) - active.indexOf(b)));
      html += heroHTML(order[0], active.length > 1);
      const rest = order.slice(1);
      if (rest.length) html += `<h2 class="section-title">Also on your list</h2><div class="list">${rest.map(rowTrainHTML).join('')}</div>`;
      if (active.length < MAX_ACTIVE) html += `<a class="btn btn-ghost btn-block" href="#/programs" style="margin-top:12px">+ Add a program</a>`;
    }

    view.innerHTML = html;
  }

  /* ───────────────── Programs ───────────────── */

  function programRowHTML(p) {
    const on = state.active.includes(p.id);
    const started = isStarted(p.id);
    const badge = on ? '<span class="badge badge-on">On Today</span>'
      : started ? `<span class="badge">Step ${stepIndex(p.id) + 1}/${p.steps.length}</span>` : '';
    return `<a class="row" href="#/program/${p.id}">
      <span class="emoji-tile" aria-hidden="true">${p.icon}</span>
      <div class="row-main"><div class="row-title">${esc(p.title)}</div><div class="row-sub">${esc(p.summary)}</div></div>
      ${badge}
    </a>`;
  }

  function renderPrograms(view) {
    let html = `<header class="topbar"><h1 class="screen-title">Programs</h1></header>`;
    if (GUIDES.length) {
      html += `<div class="guide-strip" role="list">${GUIDES.map(g =>
        `<a role="listitem" class="guide-chip" href="#/guide/${g.id}"><span aria-hidden="true">${g.icon}</span>${esc(g.title)}</a>`).join('')}</div>`;
    }
    CATEGORIES.forEach(c => {
      const list = PROGRAMS.filter(p => BY_ID[p.id] && p.category === c.id);
      if (!list.length) return;
      html += `<h2 class="cat-title">${esc(c.title)}</h2><div class="list">${list.map(programRowHTML).join('')}</div>`;
    });
    const other = PROGRAMS.filter(p => BY_ID[p.id] && !CATEGORIES.some(c => c.id === p.category));
    if (other.length) html += `<h2 class="cat-title">More</h2><div class="list">${other.map(programRowHTML).join('')}</div>`;
    view.innerHTML = html;
  }

  function renderProgram(view, pid) {
    const p = BY_ID[pid], cur = stepIndex(pid), on = state.active.includes(pid);
    let html = `<a class="back-link" href="#/programs">‹ Programs</a>
      <div class="prog-head"><span class="emoji-tile" aria-hidden="true">${p.icon}</span><h1>${esc(p.title)}</h1></div>
      <p class="lede">${esc(p.summary)}</p>
      <button class="btn btn-block ${on ? 'btn-quiet' : 'btn-primary'}" data-act="toggle-today" data-pid="${p.id}">${on ? '✓ On your Today screen · Remove' : '+ Add to Today'}</button>
      <h2 class="section-title">Why this works</h2>
      <p>${esc(p.why)}</p>`;

    if (p.gear && p.gear.length) {
      html += `<h2 class="section-title">You'll need</h2><ul class="gear">${p.gear.map(g => `<li>${esc(g)}</li>`).join('')}</ul>`;
    }

    html += `<h2 class="section-title">Steps</h2><ol class="steps">`;
    p.steps.forEach((s, i) => {
      const cls = i === cur ? 'is-current' : (i < cur ? 'is-done' : '');
      html += `<li><details class="step ${cls}"${i === cur ? ' open' : ''}>
        <summary>
          <span class="step-num">${i < cur ? '✓' : i + 1}</span>
          <span class="step-title">${esc(s.title)}</span>
          ${i === cur ? '<span class="badge badge-on">Current</span>' : ''}
        </summary>
        <div class="step-body">
          <p class="muted">${esc(s.goal)}</p>
          <ul>${s.do.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          <div class="advance"><b>Move on when</b>${esc(s.advance)}</div>
          ${s.tip ? `<p class="small">💡 ${esc(s.tip)}</p>` : ''}
          ${s.demo ? `<p><a href="${esc(s.demo)}" target="_blank" rel="noopener">▶ Watch a demo</a></p>` : ''}
          <div class="btn-row">
            <button class="btn btn-primary" data-train-step="${i}" data-pid="${p.id}">Train this step</button>
            ${i !== cur ? `<button class="btn btn-quiet" data-set-step="${i}" data-pid="${p.id}">Make current</button>` : ''}
          </div>
        </div>
      </details></li>`;
    });
    html += `</ol>`;

    if (p.mistakes && p.mistakes.length) {
      html += `<h2 class="section-title">Common mistakes</h2><ul class="bullets">${p.mistakes.map(m => `<li>${esc(m)}</li>`).join('')}</ul>`;
    }
    if (p.help) {
      html += `<div class="help-box"><b>When to get help</b>${esc(p.help)}</div>`;
    }
    html += `<p class="small muted" style="margin-top:18px">Reward-based only. <a href="#/guide/promise">What that means</a></p>`;
    html += `<div class="sticky-cta"><button class="btn btn-primary btn-block" data-train-step="${cur}" data-pid="${p.id}">▶ Train step ${cur + 1}</button></div>`;
    view.innerHTML = html;
  }

  function renderGuide(view, gid) {
    const g = GUIDE_BY_ID[gid];
    let html = `<a class="back-link" href="#/programs">‹ Programs</a>
      <div class="prog-head"><span class="emoji-tile" aria-hidden="true">${g.icon}</span><h1>${esc(g.title)}</h1></div>
      <div class="guide">`;
    (g.sections || []).forEach(s => {
      if (s.heading) html += `<h2>${esc(s.heading)}</h2>`;
      if (s.text) html += `<p>${esc(s.text)}</p>`;
      if (s.list) html += `<ul>${s.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    });
    html += `</div>`;
    view.innerHTML = html;
  }

  /* ───────────────── Session ───────────────── */

  function startSession(pid, step) {
    if (!BY_ID[pid]) return;
    Sound.unlock();
    const d = state.draft;
    if (d && d.programId !== pid && (d.clicks || d.yes || d.no)) {
      if (!confirm('Discard your unfinished ' + BY_ID[d.programId].title + ' session?')) return;
    }
    if (step != null) setStep(pid, step);
    if (!d || d.programId !== pid || d.phase !== 'train') {
      state.draft = { programId: pid, step: stepIndex(pid), start: Date.now(), clicks: 0, yes: 0, no: 0, note: '', phase: 'train' };
    } else {
      d.step = stepIndex(pid);
    }
    save();
    go('/session');
  }

  function renderSession(view) {
    const d = state.draft;
    if (d.phase === 'summary') return renderSummary(view);
    if (d.phase === 'result') return renderResult(view);
    renderTrain(view);
  }

  function renderTrain(view) {
    const d = state.draft, p = BY_ID[d.programId];
    d.step = Math.min(Math.max(0, d.step | 0), p.steps.length - 1);
    const st = p.steps[d.step];
    view.innerHTML = `<div class="session">
      <div class="s-top">
        <button class="btn btn-quiet" data-act="discard" aria-label="Discard session">✕</button>
        <div class="s-prog">${p.icon} ${esc(p.title)}</div>
        <div class="s-timer" id="timer" aria-label="Session time">0:00</div>
        <button class="btn btn-primary" data-act="finish">Done</button>
      </div>
      <div class="s-body">
        <div class="s-steplabel">Step ${d.step + 1} of ${p.steps.length}</div>
        <div class="s-stepnav">
          <button data-act="prev-step" aria-label="Previous step"${d.step === 0 ? ' disabled' : ''}>‹</button>
          <h1>${esc(st.title)}</h1>
          <button data-act="next-step" aria-label="Next step"${d.step >= p.steps.length - 1 ? ' disabled' : ''}>›</button>
        </div>
        <p class="s-goal">${esc(st.goal)}</p>
        <ul class="s-do">${st.do.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <details class="s-more">
          <summary>Move on when…</summary>
          <div class="advance">${esc(st.advance)}</div>
          ${st.tip ? `<p class="small">💡 ${esc(st.tip)}</p>` : ''}
          ${st.demo ? `<p><a href="${esc(st.demo)}" target="_blank" rel="noopener">▶ Watch a demo</a></p>` : ''}
        </details>
      </div>
      <div class="s-controls">
        <div class="s-row">
          <button class="count-btn count-yes" data-act="yes" aria-label="Count a success">✓ <span id="yes">${d.yes}</span><small>Got it</small></button>
          <button class="count-btn count-no" data-act="no" aria-label="Count a miss">✗ <span id="no">${d.no}</span><small>Miss</small></button>
          <button class="whistle-btn" id="whistle" aria-label="Whistle">Whistle<small>${esc(whistleLabel())}</small></button>
        </div>
        <button class="click-pad" id="clickpad" aria-label="Click marker">
          <span class="click-word">Click</span>
          <span class="click-count" id="clicks">${d.clicks} ${d.clicks === 1 ? 'click' : 'clicks'}</span>
        </button>
      </div>
    </div>`;

    const timer = $('#timer');
    const tick = () => { timer.textContent = fmtClock(Date.now() - d.start); };
    tick();
    const iv = setInterval(tick, 1000);

    const clicksEl = $('#clicks');
    let saveTimer = null;
    wireClickPad($('#clickpad'), () => {
      d.clicks++;
      clicksEl.textContent = d.clicks + (d.clicks === 1 ? ' click' : ' clicks');
      clearTimeout(saveTimer);
      saveTimer = setTimeout(save, 600);
    });
    wireWhistle($('#whistle'));
    Wake.on();

    cleanup = () => {
      clearInterval(iv);
      clearTimeout(saveTimer);
      Sound.holdStop();
      Wake.off();
      save();
    };
  }

  function suggestedRating(d) {
    const n = d.yes + d.no;
    if (n < 4) return 0;
    const r = d.yes / n;
    return r >= 0.8 ? 3 : r >= 0.5 ? 2 : 1;
  }

  function renderSummary(view) {
    const d = state.draft, p = BY_ID[d.programId], st = p.steps[d.step];
    const secs = Math.min(Math.round(((d.end || Date.now()) - d.start) / 1000), MAX_SESSION_SEC);
    const n = d.yes + d.no;
    const pct = n ? Math.round((d.yes / n) * 100) + '%' : '—';
    const sug = suggestedRating(d);
    view.innerHTML = `<div class="session-page">
      <h1 class="screen-title">Session done</h1>
      <p class="muted">${p.icon} ${esc(p.title)} · Step ${d.step + 1}: ${esc(st.title)}</p>
      <div class="sum-stats">
        <div class="stat"><b>${fmtDuration(secs)}</b><span>time</span></div>
        <div class="stat"><b>${d.clicks}</b><span>clicks</span></div>
        <div class="stat"><b>${pct}</b><span>✓ ${d.yes} · ✗ ${d.no}</span></div>
      </div>
      <div class="field">
        <label for="note">Note <span class="muted">(optional)</span></label>
        <textarea id="note" class="input" maxlength="500" placeholder="What went well? What was hard?">${esc(d.note || '')}</textarea>
      </div>
      <p><b>How did it go?</b> <span class="muted small">Tap one to save.</span></p>
      <div class="rate">
        ${[3, 2, 1].map(r => `<button class="btn btn-quiet" data-rate="${r}">
          <span class="r-emoji" aria-hidden="true">${RATINGS[r].emoji}</span>
          <span class="r-text">${RATINGS[r].label}${sug === r ? ' <span class="badge">matches your count</span>' : ''}<small>${RATINGS[r].sub}</small></span>
        </button>`).join('')}
      </div>
      <button class="btn btn-ghost btn-block" data-act="resume-train" style="margin-top:14px">Keep training</button>
      <button class="btn btn-ghost btn-block" data-act="discard">Discard this session</button>
    </div>`;

    const note = $('#note');
    let t = null;
    note.addEventListener('input', () => {
      d.note = note.value;
      clearTimeout(t);
      t = setTimeout(save, 400);
    });
    cleanup = () => { clearTimeout(t); save(); };
  }

  function saveSession(rating) {
    const d = state.draft;
    const note = $('#note');
    if (note) d.note = note.value;
    const rec = {
      id: 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      programId: d.programId,
      step: d.step,
      start: d.start,
      durationSec: Math.min(Math.round(((d.end || Date.now()) - d.start) / 1000), MAX_SESSION_SEC),
      clicks: d.clicks,
      yes: d.yes,
      no: d.no,
      rating,
      note: (d.note || '').trim().slice(0, 500)
    };
    state.sessions.push(rec);
    state.draft = Object.assign({}, d, { phase: 'result', rating });
    save();
    askPersist();
    render();
  }

  function renderResult(view) {
    const d = state.draft, p = BY_ID[d.programId], st = p.steps[d.step];
    const info = streakInfo();
    const last = d.step >= p.steps.length - 1;
    const n = d.yes + d.no, ratio = n ? d.yes / n : null;
    let box;
    if (d.rating === 3 && !last) {
      const next = p.steps[d.step + 1];
      const countNote = (n >= 5 && ratio < 0.8)
        ? `<p class="small">Your count was ${Math.round(ratio * 100)}%. The usual rule is about 80% before moving on — your call.</p>` : '';
      box = `<div class="suggest good">
        <h2>Ready for step ${d.step + 2}?</h2>
        <p>Next up: <b>${esc(next.title)}</b> — ${esc(next.goal)}</p>
        <p class="small muted">Move on when: ${esc(st.advance)}</p>
        ${countNote}
        <div class="btn-row"><button class="btn btn-primary" data-act="advance">Move on</button><button class="btn btn-quiet" data-act="done">Stay here</button></div>
      </div>`;
    } else if (d.rating === 3 && last) {
      box = `<div class="suggest good">
        <h2>That's the final step 🎉</h2>
        <p>Keep practicing it in new places and around new distractions. When it's rock solid, try another program.</p>
      </div>`;
    } else if (d.rating === 2) {
      box = `<div class="suggest">
        <h2>Keep at it</h2>
        <p>Stay on this step. Move on when: ${esc(st.advance)}</p>
      </div>`;
    } else {
      box = `<div class="suggest hard">
        <h2>Make the next one easier</h2>
        <p>Closer distance, a quieter spot, better treats, or a shorter session. Tough days are normal — end on something easy.</p>
        ${d.step > 0 ? `<div class="btn-row"><button class="btn btn-quiet" data-act="go-back-step">Go back a step</button><button class="btn btn-quiet" data-act="done">Stay here</button></div>` : ''}
      </div>`;
    }
    const streakLine = info.streak > 1 ? `🔥 ${info.streak}-day streak` : 'Logged. That counts.';
    view.innerHTML = `<div class="session-page">
      <h1 class="screen-title">Saved ✓</h1>
      <p class="lede">${streakLine} · ${info.last7} of the last 7 days</p>
      ${box}
      <button class="btn btn-quiet btn-block" data-act="done">Back to Today</button>
    </div>`;
  }

  function endDraft() {
    state.draft = null;
    save();
  }

  /* ───────────────── Tools ───────────────── */

  function renderTools(view) {
    view.innerHTML = `<header class="topbar"><h1 class="screen-title">Tools</h1></header>
      <p class="muted small">For practice or quick use. Nothing here is logged — start a session from Today to log training.</p>
      <button class="click-pad tool-click" id="clickpad" aria-label="Click marker">
        <span class="click-word">Click</span>
        <span class="click-count" id="clicks">Tap anywhere on this pad</span>
      </button>
      <button class="whistle-btn tool-whistle" id="whistle" aria-label="Whistle">Whistle<small>${esc(whistleLabel())}</small></button>
      <a class="btn btn-ghost btn-block" href="#/settings" style="margin-top:8px">Change whistle sound</a>
      <p class="small muted" style="margin-top:8px">Turn your volume up. On iPhone, also check the silent switch. <a href="#/guide/tools">How to use these</a></p>`;
    let count = 0;
    const el = $('#clicks');
    wireClickPad($('#clickpad'), () => { count++; el.textContent = count + (count === 1 ? ' click' : ' clicks'); });
    wireWhistle($('#whistle'));
    Wake.on();
    cleanup = () => { Sound.holdStop(); Wake.off(); };
  }

  /* ───────────────── Log ───────────────── */

  function renderLog(view) {
    const info = streakInfo();
    const totalMin = Math.round(state.sessions.reduce((a, s) => a + (s.durationSec || 0), 0) / 60);
    let html = `<header class="topbar"><h1 class="screen-title">Log</h1></header>
      <div class="stat-row">
        <div class="stat"><b>${info.streak}</b><span>day streak</span></div>
        <div class="stat"><b>${info.last7}/7</b><span>last 7 days</span></div>
        <div class="stat"><b>${totalMin}</b><span>total min</span></div>
      </div>`;

    // 5-week calendar, aligned to the local first day of the week
    const fd = firstDayOfWeek();
    const today = new Date();
    const offset = (today.getDay() - fd + 7) % 7;
    const start = addDays(today, -offset - 28);
    let cal = '';
    for (let i = 0; i < 7; i++) cal += `<div class="h">${esc(narrowDay(addDays(start, i)))}</div>`;
    for (let i = 0; i < 35; i++) {
      const d = addDays(start, i), k = dayKey(d);
      const future = i > offset + 28;
      cal += `<div class="d${info.days.has(k) ? ' on' : ''}${k === dayKey(today) ? ' today' : ''}${future ? ' future' : ''}" title="${esc(fmtDayLabel(k))}"></div>`;
    }
    html += `<h2 class="section-title">Last 5 weeks</h2><div class="cal" aria-label="Days trained in the last 5 weeks">${cal}</div>`;

    html += `<h2 class="section-title">History</h2>`;
    if (!state.sessions.length) {
      html += `<div class="empty"><div class="big">📓</div><p>No sessions yet. Start one from Today — it's saved here automatically.</p></div>`;
    } else {
      const sorted = state.sessions.slice().sort((a, b) => b.start - a.start);
      let lastDay = '';
      sorted.forEach(s => {
        const k = dayKey(s.start);
        if (k !== lastDay) { html += `<div class="day-head">${esc(fmtDayLabel(k))}</div>`; lastDay = k; }
        const p = BY_ID[s.programId];
        const title = p ? p.title : 'Removed program';
        const stepT = p && p.steps[s.step] ? p.steps[s.step].title : '';
        const time = new Date(s.start).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
        const counts = (s.yes || s.no) ? ` · ✓${s.yes} ✗${s.no}` : '';
        const r = RATINGS[s.rating];
        html += `<details class="entry">
          <summary>
            <span class="e-emoji" aria-hidden="true">${p ? p.icon : '🐾'}</span>
            <span class="e-main"><span class="e-title">${esc(title)}</span><br><span class="e-sub">Step ${s.step + 1} · ${fmtDuration(s.durationSec || 0)}${counts}</span></span>
            ${r ? `<span class="r-chip" title="${esc(r.label)}">${r.emoji}</span>` : ''}
          </summary>
          <div class="e-body">
            <p class="small muted">${esc(time)}${stepT ? ' · ' + esc(stepT) : ''}${r ? ' · ' + esc(r.label) : ''}${s.clicks ? ' · ' + s.clicks + ' clicks' : ''}</p>
            ${s.note ? `<p>${esc(s.note)}</p>` : ''}
            <button class="btn btn-ghost" data-del="${esc(s.id)}">Delete this entry</button>
          </div>
        </details>`;
      });
    }
    view.innerHTML = html;
  }

  /* ───────────────── Settings ───────────────── */

  function renderSettings(view) {
    const s = state.settings;
    const installHelp = isStandalone()
      ? '<p>✓ Installed. Your data is safer from automatic clean-up.</p>'
      : isIOS
        ? '<p>In Safari: tap Share → <b>Add to Home Screen</b>. Recommended — Safari can erase website data after 7 days without a visit, but not for Home Screen apps.</p>'
        : (deferredInstall
          ? '<button class="btn btn-quiet btn-block" data-act="install">Install OpenLeash</button>'
          : '<p>In your browser menu, choose <b>Install app</b> or <b>Add to Home screen</b>.</p>');

    view.innerHTML = `<a class="back-link" href="#/today">‹ Today</a>
      <h1 class="screen-title" style="margin-bottom:16px">Settings</h1>

      <section class="card">
        <h2>Your dog</h2>
        <div class="field">
          <label for="dogname">Name <span class="muted">(optional)</span></label>
          <input id="dogname" class="input" type="text" maxlength="40" autocomplete="off" value="${esc(state.dogName)}" placeholder="e.g. Scout">
        </div>
      </section>

      <section class="card">
        <h2>Whistle sound</h2>
        <p class="small muted">Pick once, then leave it. A cue only works if it sounds the same every time — if you change it, re-charge it (Come when called, step 2). Older dogs often hear lower pitches better.</p>
        <div class="field"><span class="label">Pitch</span>
          <div class="choice-row">${WHISTLE_PITCHES.map(p => `<button class="choice" data-pitch="${p.hz}" aria-pressed="${s.whistleHz === p.hz}">${esc(p.label)}</button>`).join('')}</div>
        </div>
        <div class="field"><span class="label">Pattern</span>
          <div class="choice-row">${WHISTLE_PATTERNS.map(p => `<button class="choice" data-pattern="${p.id}" aria-pressed="${s.whistlePattern === p.id}">${esc(p.label)}</button>`).join('')}</div>
        </div>
        <span class="label" style="font-weight:700">Sound check</span>
        <div class="btn-row" style="margin-top:6px">
          <button class="btn btn-quiet" id="test-click">Test click</button>
          <button class="btn btn-quiet" id="test-whistle">Test whistle</button>
        </div>
      </section>

      <section class="card">
        <h2>Daily reminder</h2>
        <p class="small muted">Phones only let websites send notifications through a server. OpenLeash doesn't have one — no accounts, no tracking — so your calendar does the reminding.</p>
        <div class="field">
          <label for="remtime">Time</label>
          <input id="remtime" class="input" type="time" value="${esc(s.reminderTime)}">
        </div>
        <div class="list">
          <button class="btn btn-quiet btn-block" data-act="ics">Add to Apple / Outlook calendar</button>
          <button class="btn btn-quiet btn-block" data-act="gcal">Add to Google Calendar</button>
        </div>
        <p class="small muted" style="margin-top:10px">Or set a repeating alarm in your phone's Clock or Reminders app.</p>
      </section>

      <section class="card">
        <h2>Keep your progress safe</h2>
        <p class="small muted">Everything is stored on this device only. Back it up now and then, or to move to a new phone.</p>
        ${installHelp}
        <div class="btn-row" style="margin-top:8px">
          <button class="btn btn-quiet" data-act="export">Back up</button>
          <button class="btn btn-quiet" data-act="import">Restore</button>
        </div>
        <input type="file" id="import-file" accept="application/json,.json" class="visually-hidden" tabindex="-1">
      </section>

      <section class="card">
        <h2>About OpenLeash</h2>
        <p>Free dog training. Reward-based only. No account, no paywall, no ads, no tracking — ever.</p>
        <a class="btn btn-ghost" href="#/guide/promise">Our reward-based promise</a>
      </section>

      <section class="card">
        <h2>Erase data</h2>
        <p class="small muted">Deletes all sessions, progress and settings on this device.</p>
        <button class="btn btn-danger btn-block" data-act="reset">Erase all OpenLeash data</button>
      </section>`;

    $('#test-click').addEventListener('click', () => Sound.click());
    $('#test-whistle').addEventListener('click', () => {
      if (state.settings.whistlePattern === 'hold') {
        Sound.holdStart(state.settings.whistleHz);
        setTimeout(() => Sound.holdStop(), 900);
      } else {
        Sound.whistle(state.settings.whistlePattern, state.settings.whistleHz);
      }
    });
    $('#remtime').addEventListener('change', e => {
      if (/^\d{2}:\d{2}$/.test(e.target.value)) { state.settings.reminderTime = e.target.value; save(); }
    });
    $('#import-file').addEventListener('change', importBackup);
  }

  /* ───────────────── Reminders (calendar) ───────────────── */

  function reminderTimes() {
    const [hh, mm] = (state.settings.reminderTime || '18:00').split(':').map(Number);
    const now = new Date();
    let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh || 0, mm || 0, 0);
    if (start <= now) start = addDays(start, 1);
    const end = new Date(start.getTime() + 10 * 60000);
    return { start, end };
  }
  const icsDate = d => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
  const icsEsc = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  function icsFold(line) {
    const chars = Array.from(line);
    if (chars.length <= 70) return line;
    const out = [];
    for (let i = 0; i < chars.length; i += 70) out.push((i ? ' ' : '') + chars.slice(i, i + 70).join(''));
    return out.join('\r\n');
  }
  function reminderTitle() {
    return 'Train ' + (state.dogName || 'your dog') + ' (5 min)';
  }

  function addIcs() {
    const { start, end } = reminderTimes();
    const url = appUrl();
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//OpenLeash//Daily reminder//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:openleash-daily-' + Date.now() + '@openleash',
      'DTSTAMP:' + stamp,
      'DTSTART:' + icsDate(start),
      'DTEND:' + icsDate(end),
      'RRULE:FREQ=DAILY',
      'SUMMARY:' + icsEsc(reminderTitle()),
      'DESCRIPTION:' + icsEsc('Open OpenLeash and tap Start training: ' + url),
      'URL:' + url,
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + icsEsc(reminderTitle()), 'TRIGGER:PT0M', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'
    ];
    const ics = lines.map(icsFold).join('\r\n') + '\r\n';
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    if (isIOS) {
      // iOS shows an "Add to Calendar" preview when it opens the file.
      const u = URL.createObjectURL(blob);
      const w = window.open(u, '_blank');
      if (!w) location.href = u;
      setTimeout(() => URL.revokeObjectURL(u), 60000);
      toast('Tap “Add All” to add the daily reminder.');
    } else {
      download(blob, 'openleash-daily-reminder.ics');
      toast('Open the downloaded file to add it to your calendar.');
    }
  }

  function addGoogle() {
    const { start, end } = reminderTimes();
    let tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* ignore */ }
    const link = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + encodeURIComponent(reminderTitle()) +
      '&details=' + encodeURIComponent('Open OpenLeash and tap Start training: ' + appUrl()) +
      '&dates=' + icsDate(start) + '/' + icsDate(end) +
      '&recur=' + encodeURIComponent('RRULE:FREQ=DAILY') +
      (tz ? '&ctz=' + encodeURIComponent(tz) : '');
    window.open(link, '_blank', 'noopener');
  }

  /* ───────────────── Backup ───────────────── */

  function exportBackup() {
    const payload = JSON.stringify({ app: 'OpenLeash', exportedAt: new Date().toISOString(), data: Object.assign({}, state, { draft: null }) }, null, 2);
    const name = 'openleash-backup-' + dayKey(Date.now()) + '.json';
    const blob = new Blob([payload], { type: 'application/json' });
    try {
      const file = new File([blob], name, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [file] }) && (isIOS || /Android/i.test(navigator.userAgent))) {
        navigator.share({ files: [file], title: 'OpenLeash backup' }).catch(() => {});
        return;
      }
    } catch (e) { /* fall through to download */ }
    download(blob, name);
    toast('Backup downloaded.');
  }

  function importBackup(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let parsed;
      try { parsed = JSON.parse(reader.result); } catch (err) { toast("That file isn't an OpenLeash backup."); return; }
      const data = parsed && parsed.data ? parsed.data : parsed;
      if (!data || typeof data !== 'object' || !Array.isArray(data.sessions)) { toast("That file isn't an OpenLeash backup."); return; }
      const next = normalize(data);
      if (!confirm('Replace everything on this device with this backup? (' + next.sessions.length + ' sessions)')) return;
      next.draft = null;
      state = next;
      save();
      toast('Backup restored.');
      go('/today');
    };
    reader.readAsText(file);
  }

  /* ───────────────── Events ───────────────── */

  const view = $('#view');

  view.addEventListener('click', e => {
    const el = e.target.closest('[data-act],[data-train],[data-train-step],[data-set-step],[data-rate],[data-add],[data-pitch],[data-pattern],[data-del]');
    if (!el || el.disabled) return;
    const ds = el.dataset;

    if (ds.train) return startSession(ds.train);
    if (ds.trainStep != null) return startSession(ds.pid, +ds.trainStep);
    if (ds.setStep != null) {
      setStep(ds.pid, +ds.setStep);
      toast('Step ' + (+ds.setStep + 1) + ' is now your current step.');
      return render();
    }
    if (ds.rate) return saveSession(+ds.rate);
    if (ds.add) {
      if (state.active.length >= MAX_ACTIVE) { toast('Today holds up to 3 programs.'); return; }
      if (!state.active.includes(ds.add)) state.active.push(ds.add);
      save();
      return render();
    }
    if (ds.pitch) {
      state.settings.whistleHz = +ds.pitch; save();
      Sound.whistle('pips', state.settings.whistleHz);
      return render();
    }
    if (ds.pattern) {
      state.settings.whistlePattern = ds.pattern; save();
      return render();
    }
    if (ds.del) {
      if (!confirm('Delete this session from your log?')) return;
      state.sessions = state.sessions.filter(s => s.id !== ds.del);
      save();
      return render();
    }

    const d = state.draft;
    switch (ds.act) {
      case 'yes':
      case 'no': {
        if (!d) return;
        d[ds.act]++;
        const out = $('#' + ds.act);
        if (out) out.textContent = d[ds.act];
        if (navigator.vibrate) { try { navigator.vibrate(8); } catch (_) { /* ignore */ } }
        save();
        return;
      }
      case 'prev-step':
      case 'next-step': {
        if (!d) return;
        const p = BY_ID[d.programId];
        d.step = Math.min(Math.max(0, d.step + (ds.act === 'next-step' ? 1 : -1)), p.steps.length - 1);
        setStep(d.programId, d.step);
        return render();
      }
      case 'finish':
        if (!d) return;
        d.end = Date.now();
        d.phase = 'summary';
        save();
        return render();
      case 'resume-train':
        if (!d) return;
        d.phase = 'train';
        delete d.end;
        save();
        return render();
      case 'discard': {
        if (!d) return go('/today');
        const busy = d.clicks || d.yes || d.no || (Date.now() - d.start > 60000);
        if (busy && !confirm('Discard this session? It won\'t be logged.')) return;
        endDraft();
        return go('/today');
      }
      case 'discard-draft':
        if (!confirm('Discard the unfinished session?')) return;
        endDraft();
        return render();
      case 'advance':
        if (d) {
          setStep(d.programId, d.step + 1);
          toast('Moved to step ' + (d.step + 2) + '.');
        }
        endDraft();
        return go('/today');
      case 'go-back-step':
        if (d) {
          setStep(d.programId, d.step - 1);
          toast('Back to step ' + d.step + '.');
        }
        endDraft();
        return go('/today');
      case 'done':
        endDraft();
        return go('/today');
      case 'toggle-today': {
        const pid = ds.pid;
        if (state.active.includes(pid)) {
          state.active = state.active.filter(x => x !== pid);
          toast('Removed from Today.');
        } else {
          if (state.active.length >= MAX_ACTIVE) { toast('Today holds up to 3 programs. Remove one first.'); return; }
          state.active.push(pid);
          toast('Added to Today.');
        }
        save();
        return render();
      }
      case 'dismiss-install':
        state.flags.installDismissed = true;
        save();
        return render();
      case 'install':
        if (deferredInstall) {
          deferredInstall.prompt();
          deferredInstall.userChoice.finally(() => { deferredInstall = null; render(); });
        }
        return;
      case 'ics': return addIcs();
      case 'gcal': return addGoogle();
      case 'export': return exportBackup();
      case 'import': return $('#import-file').click();
      case 'reset':
        if (!confirm('Erase all OpenLeash data on this device? This can\'t be undone.')) return;
        state = defaults();
        save();
        toast('All data erased.');
        return go('/today');
    }
  });

  view.addEventListener('change', e => {
    if (e.target.id === 'dogname') {
      state.dogName = e.target.value.trim().slice(0, 40);
      save();
      toast(state.dogName ? 'Saved.' : 'Name cleared.');
    }
  });

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstall = e;
    const r = parseHash().name;
    if (r === 'today' || r === 'settings') render();
  });

  window.addEventListener('storage', e => {
    if (e.key === STORE_KEY && parseHash().name !== 'session') { state = load(); render(); }
  });

  /* ───────────────── Start ───────────────── */

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  render();
})();
