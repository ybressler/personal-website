(function () {
  const target = document.getElementById('game-target');
  if (!target) return;

  const STORAGE_KEY = 'headshotGame.v1';
  const clicksEl = document.getElementById('game-clicks');
  const lifetimeEl = document.getElementById('game-lifetime');
  const feedbackEl = document.getElementById('game-feedback');
  const achList = document.getElementById('game-achievements');
  const resetBtn = document.getElementById('game-reset');
  const gameRoot = document.querySelector('.headshot-game');
  const powerEl = document.getElementById('game-power');
  const powerFillEl = document.getElementById('game-power-fill');
  const logToggle = document.getElementById('game-log-toggle');
  const logPanel = document.getElementById('game-log');
  const logList = document.getElementById('game-log-list');
  const headshotImg = document.getElementById('game-headshot');

  const state = loadState();
  const thresholds = Array.from(achList.querySelectorAll('li'))
    .map(li => parseInt(li.dataset.threshold, 10))
    .sort((a, b) => a - b);
  const COMBO_WINDOW = 1500;
  const COMBO_MAX_STREAK = 10;
  const DAILY_CURSES = [
    { id: 'tomato-surplus', name: 'Tomato Surplus', trigger: 'swipe-left' },
    { id: 'forbidden-sky', name: 'Forbidden Sky', trigger: 'swipe-up' },
    { id: 'warm-fingers', name: 'Warm Fingers', trigger: 'combo-4' },
    { id: 'mirror-face', name: 'Mirror Face', trigger: 'swipe-right' }
  ];
  const HEADSHOT_THRESHOLDS = [100, 200, 300, 400, 500, 600, 700, 800, 1000];
  const headshotSources = collectHeadshotSources();
  const preloadedHeadshots = {};
  const dailyCurse = setupDailyCurse();
  preloadHellHeadshots();

  const SWIPE_THRESHOLD = 90;
  const CLICK_MAX_MOVE = 8;
  const card = document.getElementById('game-card') || target;
  const drag = { active: false, startX: 0, startY: 0, dx: 0, dy: 0 };
  let suppressClickUntil = 0;
  let consecutiveUps = 0;

  target.addEventListener('pointerdown', onPointerDown);
  target.addEventListener('click', onClick);
  resetBtn.addEventListener('click', onReset);
  if (logToggle && logPanel) logToggle.addEventListener('click', onLogToggle);
  clicksEl.addEventListener('click', onSecretClick);
  window.addEventListener('blur', endDrag);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) endDrag();
  });
  setInterval(updatePowerBar, 120);
  render();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults();
      const parsed = JSON.parse(raw);
      return Object.assign(defaults(), parsed);
    } catch (e) {
      return defaults();
    }
  }
  function defaults() {
    return {
      clicks: 0,
      lifetime: 0,
      unlocked: [],
      unlockedSecrets: [],
      rageCount: 0,
      secretClicks: 0,
      combo: { streak: 0, best: 0, lastAt: 0, lastAction: null },
      dailyCurse: null,
      logs: []
    };
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function collectHeadshotSources() {
    if (!headshotImg) return {};
    const sources = { normal: headshotImg.dataset.normalSrc || headshotImg.src };
    HEADSHOT_THRESHOLDS.forEach(function (threshold) {
      const src = headshotImg.getAttribute('data-hell-' + threshold);
      if (src) sources[threshold] = src;
    });
    return sources;
  }

  function preloadHeadshot(src) {
    if (!src || preloadedHeadshots[src]) return;
    preloadedHeadshots[src] = true;
    const img = new Image();
    img.src = src;
  }

  function preloadHellHeadshots() {
    HEADSHOT_THRESHOLDS.forEach(function (threshold) {
      preloadHeadshot(headshotSources[threshold]);
    });
  }

  function render() {
    state.combo = Object.assign({ streak: 0, best: 0, lastAt: 0, lastAction: null }, state.combo || {});
    state.logs = Array.isArray(state.logs) ? state.logs : [];
    updateClicksDisplay();
    updateLifetimeDisplay();
    updatePowerBar();
    renderLogs();
    if (state.clicks !== 0) target.classList.add('has-clicked');
    achList.querySelectorAll('li[data-threshold]').forEach(li => {
      const t = parseInt(li.dataset.threshold, 10);
      if (state.unlocked.includes(t)) li.classList.add('unlocked');
    });
    (state.unlockedSecrets || []).forEach(id => {
      const li = achList.querySelector('li[data-secret="' + id + '"]');
      if (li) li.classList.add('unlocked');
    });
    checkAchievements();
  }

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function setupDailyCurse() {
    const date = todayKey();
    const curse = DAILY_CURSES[hashString(date) % DAILY_CURSES.length];
    if (!state.dailyCurse || state.dailyCurse.date !== date || state.dailyCurse.id !== curse.id) {
      state.dailyCurse = { date: date, id: curse.id, found: false };
      persist();
    }
    if (state.dailyCurse.found && gameRoot) gameRoot.classList.add('daily-curse-found');
    return curse;
  }

  function updateClicksDisplay() {
    clicksEl.textContent = state.clicks.toLocaleString();
    clicksEl.classList.toggle('negative', state.clicks < 0);
    if (gameRoot) gameRoot.classList.toggle('is-negative', state.clicks < 0);
    updateHellMode();
  }

  function updateHellMode() {
    const depth = state.clicks <= -100 ? Math.min(10, Math.floor(Math.abs(state.clicks) / 100)) : 0;
    document.body.style.setProperty('--hell-depth', (depth / 10).toFixed(2));
    document.body.style.setProperty('--hell-step', String(depth));
    document.body.classList.toggle('abyss-mode', depth >= 10);
    updateHeadshotForDepth(depth);
    toggleHellMode(depth > 0);
  }

  function updateHeadshotForDepth(depth) {
    if (!headshotImg) return;
    const threshold = depth >= 10 ? 1000 : depth * 100;
    const nextSrc = depth > 0 ? (headshotSources[threshold] || headshotSources[800] || headshotSources.normal) : headshotSources.normal;
    if (!nextSrc || headshotImg.getAttribute('src') === nextSrc) return;
    headshotImg.classList.remove('is-swapping');
    card.classList.remove('is-corrupting');
    void headshotImg.offsetWidth;
    headshotImg.classList.add('is-swapping');
    card.classList.add('is-corrupting');
    headshotImg.src = nextSrc;
    setTimeout(function () {
      headshotImg.classList.remove('is-swapping');
      card.classList.remove('is-corrupting');
    }, 620);
  }

  function toggleHellMode(on) {
    const isOn = document.body.classList.contains('hell-mode');
    if (on === isOn) return;
    document.body.classList.toggle('hell-mode', on);
    if (on) {
      spawnHellDemons();
    } else {
      document.body.style.removeProperty('--hell-depth');
      document.body.style.removeProperty('--hell-step');
      document.body.classList.remove('abyss-mode');
      removeHellDemons();
    }
  }

  function spawnHellDemons() {
    if (document.getElementById('hell-demons')) return;
    const container = document.createElement('div');
    container.id = 'hell-demons';
    container.className = 'hell-demons';
    container.setAttribute('aria-hidden', 'true');
    const glyphs = ['👹', '😈', '👺', '💀', '🔥'];
    for (let i = 0; i < 9; i++) {
      const d = document.createElement('span');
      d.className = 'hell-demon';
      d.textContent = glyphs[i % glyphs.length];
      d.style.left = (Math.random() * 95) + 'vw';
      d.style.fontSize = (32 + Math.random() * 56) + 'px';
      d.style.animationDuration = (10 + Math.random() * 8) + 's';
      d.style.animationDelay = (-Math.random() * 18) + 's';
      container.appendChild(d);
    }
    document.body.appendChild(container);
  }

  function removeHellDemons() {
    const c = document.getElementById('hell-demons');
    if (c) c.remove();
  }

  function updateLifetimeDisplay() {
    lifetimeEl.textContent = state.lifetime.toLocaleString();
    lifetimeEl.classList.toggle('negative', state.lifetime < 0);
  }

  function onPointerDown(e) {
    if (drag.active) endDrag();
    drag.active = true;
    drag.pointerId = e.pointerId;
    drag.startX = e.clientX;
    drag.startY = e.clientY;
    drag.dx = 0;
    drag.dy = 0;
    try { target.setPointerCapture(e.pointerId); } catch (_) {}
    target.classList.add('dragging');
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!drag.active) return;
    if (drag.pointerId != null && e.pointerId !== drag.pointerId) return;
    drag.dx = e.clientX - drag.startX;
    drag.dy = e.clientY - drag.startY;
    const rot = Math.max(-16, Math.min(16, drag.dx * 0.05));
    card.style.transform = 'translate(' + drag.dx + 'px, ' + (drag.dy * 0.3) + 'px) rotate(' + rot + 'deg)';
    const ratio = Math.min(1, Math.abs(drag.dx) / SWIPE_THRESHOLD);
    const likeLabel = card.querySelector('.swipe-label--like');
    const nopeLabel = card.querySelector('.swipe-label--nope');
    if (likeLabel) likeLabel.style.setProperty('--label-opacity', drag.dx > 0 ? ratio : 0);
    if (nopeLabel) nopeLabel.style.setProperty('--label-opacity', drag.dx < 0 ? ratio : 0);
  }

  function onPointerUp(e) {
    if (!drag.active) return;
    if (drag.pointerId != null && e && e.pointerId !== drag.pointerId) return;
    const dx = drag.dx;
    const dy = drag.dy;
    endDrag(e);

    const dist = Math.hypot(dx, dy);
    let dir = null;
    if (dist >= SWIPE_THRESHOLD) {
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      if (angle >= -45 && angle < 45) dir = 'right';
      else if (angle >= 45 && angle < 135) dir = 'down';
      else if (angle >= -135 && angle < -45) dir = 'up';
      else dir = 'left';
    }
    if (dir) {
      suppressClickUntil = Date.now() + 250;
      triggerSwipe(dir);
    } else if (dist > CLICK_MAX_MOVE) {
      suppressClickUntil = Date.now() + 250;
    }
  }

  function endDrag(e) {
    if (!drag.active) {
      cleanupDragListeners();
      return;
    }
    drag.active = false;
    if (drag.pointerId != null) {
      try { target.releasePointerCapture(drag.pointerId); } catch (_) {}
    }
    drag.pointerId = null;
    target.classList.remove('dragging');
    const likeLabel = card.querySelector('.swipe-label--like');
    const nopeLabel = card.querySelector('.swipe-label--nope');
    if (likeLabel) likeLabel.style.removeProperty('--label-opacity');
    if (nopeLabel) nopeLabel.style.removeProperty('--label-opacity');
    card.style.transform = '';
    cleanupDragListeners();
  }

  function cleanupDragListeners() {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('pointercancel', onPointerUp);
  }

  function onLogToggle() {
    const open = logPanel.hasAttribute('hidden');
    if (open) {
      logPanel.removeAttribute('hidden');
      logToggle.setAttribute('aria-expanded', 'true');
      logToggle.classList.add('is-open');
      if (!state.logs.length) addLog('The record was empty until you looked.', true);
    } else {
      logPanel.setAttribute('hidden', '');
      logToggle.setAttribute('aria-expanded', 'false');
      logToggle.classList.remove('is-open');
    }
  }

  function addLog(message, force) {
    if (!force && Math.random() > 0.22) return;
    state.logs = Array.isArray(state.logs) ? state.logs : [];
    if (state.logs[0] === message) return;
    state.logs.unshift(message);
    state.logs = state.logs.slice(0, 8);
    renderLogs();
    persist();
  }

  function renderLogs() {
    if (!logList) return;
    logList.innerHTML = '';
    (state.logs || []).forEach(function (message) {
      const li = document.createElement('li');
      li.textContent = message;
      logList.appendChild(li);
    });
  }

  function dailyFound() {
    return state.dailyCurse && state.dailyCurse.date === todayKey() && state.dailyCurse.id === dailyCurse.id && state.dailyCurse.found;
  }

  function maybeFindDailyCurse(action) {
    if (dailyFound()) return;
    const combo = state.combo || {};
    const found = dailyCurse.trigger === action || (dailyCurse.trigger === 'combo-4' && (combo.streak || 0) >= 4);
    if (!found) return;
    state.dailyCurse.found = true;
    if (gameRoot) gameRoot.classList.add('daily-curse-found');
    unlockSecret('daily');
    addLog('You found the daily curse: ' + dailyCurse.name + '.', true);
    triggerDailyCurseReveal();
  }

  function triggerDailyCurseReveal() {
    document.body.classList.add('daily-curse-reveal');
    setTimeout(function () { document.body.classList.remove('daily-curse-reveal'); }, 2600);
    const rect = target.getBoundingClientRect();
    spawnPopAt({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height * 0.08,
      text: 'Daily curse found',
      color: '#a56600',
      slow: true
    });
    spawnEmojiBurst('🧿', 0, 0);
    spawnEmojiBurst('🔥', 0, 0);
    if (typeof window.confetti === 'function') {
      const x = (rect.left + rect.right) / 2 / window.innerWidth;
      const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
      const colors = ['#ff8a1f', '#ff3b1f', '#a07dff', '#ffd166', '#1a222c'];
      [0, 260, 520].forEach(function (delay) {
        setTimeout(function () {
          window.confetti({
            particleCount: 110,
            spread: 115,
            startVelocity: 48,
            origin: { x: x, y: Math.max(0.1, y - 0.08) },
            colors: colors,
            scalar: 1.15
          });
        }, delay);
      });
    }
  }

  function applyDailyCurse(delta, action) {
    if (!dailyFound()) return delta;
    if (dailyCurse.id === 'tomato-surplus' && action === 'swipe-left' && delta > 0) return delta + 5;
    if (dailyCurse.id === 'forbidden-sky' && action === 'swipe-up') return delta - 10;
    if (dailyCurse.id === 'warm-fingers' && action === 'click' && delta > 0 && (state.combo.streak || 0) >= COMBO_MAX_STREAK) return delta + 1;
    if (dailyCurse.id === 'mirror-face' && action === 'swipe-right' && delta > 0) return delta + 5;
    return delta;
  }

  function scoreAction(delta, lifetimeDelta, action) {
    const now = Date.now();
    state.combo = Object.assign({ streak: 0, best: 0, lastAt: 0, lastAction: null }, state.combo || {});
    const positive = delta > 0;
    const rapid = positive && state.combo.lastAt && now - state.combo.lastAt <= COMBO_WINDOW;
    const alternatingGesture = rapid &&
      action.indexOf('swipe-') === 0 &&
      state.combo.lastAction &&
      state.combo.lastAction.indexOf('swipe-') === 0 &&
      state.combo.lastAction !== action;

    if (positive) {
      state.combo.streak = rapid ? state.combo.streak + 1 : 1;
      if (alternatingGesture) state.combo.streak += 1;
      state.combo.best = Math.max(state.combo.best || 0, state.combo.streak);
      state.combo.lastAt = now;
      state.combo.lastAction = action;
    } else {
      state.combo.streak = 0;
      state.combo.lastAt = 0;
      state.combo.lastAction = action;
    }

    maybeFindDailyCurse(action);

    const baseDelta = applyDailyCurse(delta, action);
    const baseLifetimeDelta = baseDelta === delta ? lifetimeDelta : baseDelta;
    let adjustedDelta = baseDelta;
    let adjustedLifetimeDelta = baseLifetimeDelta;
    let bonus = 0;
    if (positive && state.combo.streak >= COMBO_MAX_STREAK) {
      bonus = Math.max(1, Math.ceil(Math.abs(baseDelta) * 0.5));
      adjustedDelta += bonus;
      adjustedLifetimeDelta += bonus;
    }

    state.clicks += adjustedDelta;
    state.lifetime += adjustedLifetimeDelta;
    updatePowerBar();

    if (state.combo.streak === 4) addLog('The face noticed the rhythm.', true);
    else if (state.combo.streak === 8) addLog('The power bar became a little too honest.', true);
    else if (alternatingGesture) addLog('The face accepted the alternating current.', false);

    return {
      delta: adjustedDelta,
      lifetimeDelta: adjustedLifetimeDelta,
      baseDelta: baseDelta,
      baseLifetimeDelta: baseLifetimeDelta,
      bonus: bonus,
      streak: state.combo.streak
    };
  }

  function updatePowerBar() {
    if (!powerEl || !powerFillEl) return;
    state.combo = Object.assign({ streak: 0, best: 0, lastAt: 0, lastAction: null }, state.combo || {});
    const elapsed = state.combo.lastAt ? Date.now() - state.combo.lastAt : COMBO_WINDOW;
    const heat = Math.max(0, 1 - (elapsed / COMBO_WINDOW));
    const streakLevel = Math.min(1, (state.combo.streak || 0) / COMBO_MAX_STREAK);
    const level = Math.max(heat * streakLevel, 0);
    powerEl.classList.toggle('is-active', level > 0.08);
    powerEl.classList.toggle('is-hot', (state.combo.streak || 0) >= 4 && level > 0.2);
    powerEl.classList.toggle('is-maxed', (state.combo.streak || 0) >= COMBO_MAX_STREAK && level > 0.85);
    powerFillEl.style.transform = 'scaleX(' + level.toFixed(3) + ')';
    if (level <= 0 && state.combo.streak) {
      state.combo.streak = 0;
      state.combo.lastAt = 0;
      state.combo.lastAction = null;
    }
  }

  function triggerSwipe(dir) {
    target.classList.remove('swipe-right', 'swipe-left', 'swipe-up', 'swipe-down');
    void target.offsetWidth;
    target.classList.add('swipe-' + dir);
    target.addEventListener('animationend', function handler(ev) {
      if (ev.animationName.indexOf('swipe-fly-') === 0) {
        target.classList.remove('swipe-right', 'swipe-left', 'swipe-up', 'swipe-down');
        target.removeEventListener('animationend', handler);
      }
    });

    let delta = 0;
    let lifetimeDelta = 0;
    let popText = '';
    let popColor = '#285BB1';
    let emoji = '✨';
    let signX = 0, signY = -1;
    let rage = false;

    if (dir === 'right') {
      delta = 5; lifetimeDelta = 5;
      popText = '+5 Liked!'; popColor = '#1bb46a';
      emoji = '💚'; signX = 1; signY = -1;
      consecutiveUps = 0;
    } else if (dir === 'left') {
      delta = 5; lifetimeDelta = 5;
      popText = '+5 Nope!'; popColor = '#e64545';
      emoji = '🍅'; signX = -1; signY = -1;
      consecutiveUps = 0;
    } else if (dir === 'up') {
      delta = -10; lifetimeDelta = -10;
      popText = '-10 BAD!'; popColor = '#e64545';
      emoji = '💢'; signX = 0; signY = -1;
      consecutiveUps += 1;
      const rageThreshold = ((state.rageCount || 0) + 1) * 3;
      if (consecutiveUps >= rageThreshold) {
        rage = true;
        delta = -25;
        lifetimeDelta = -25;
        popText = '-25 RAGE!!!'; popColor = '#ff3b1f';
        emoji = '🤬'; signX = 0; signY = 0;
        consecutiveUps = 0;
        state.rageCount = (state.rageCount || 0) + 1;
        unlockSecret('rage');
      }
    } else if (dir === 'down') {
      delta = -10; lifetimeDelta = -10;
      popText = '-10 BAD!'; popColor = '#e64545';
      emoji = '💢'; signX = 0; signY = 1;
      consecutiveUps = 0;
    }

    const scored = scoreAction(delta, lifetimeDelta, 'swipe-' + dir);
    if (scored.baseDelta !== delta) {
      const prefix = scored.delta > 0 ? '+' : '';
      popText = prefix + scored.baseDelta + ' Cursed!';
    }
    bumpStat(clicksEl);
    if (scored.lifetimeDelta) bumpStat(lifetimeEl);
    updateClicksDisplay();
    updateLifetimeDisplay();
    checkAchievements();
    persist();

    const rect = target.getBoundingClientRect();
    spawnPopAt({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height * 0.18,
      text: popText,
      color: popColor
    });
    spawnEmojiBurst(emoji, signX, signY);
    if (scored.bonus) spawnPowerBurst(scored.bonus);

    if (rage) {
      addLog('Rage opened its mouth.', true);
      triggerRage(rect);
    } else if (typeof window.confetti === 'function' && (dir === 'right' || dir === 'left')) {
      const x = (rect.left + rect.right) / 2 / window.innerWidth;
      const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
      window.confetti({
        particleCount: 60,
        spread: 60,
        startVelocity: 35,
        origin: { x, y },
        colors: dir === 'right'
          ? ['#1bb46a', '#7be0a6', '#ffffff']
          : ['#e64545', '#ffb3b3', '#ffffff']
      });
    }
    if (dir === 'left') addLog('A tomato has been accepted.', false);
    if (dir === 'down') addLog('The face disliked the descent.', false);
  }

  function triggerRage(rect) {
    document.body.classList.add('rage-mode');
    setTimeout(function () { document.body.classList.remove('rage-mode'); }, 3000);

    const stormEmojis = ['🤬', '💢', '😡', '⚡', '🌩️'];
    for (let i = 0; i < 6; i++) {
      setTimeout(function () {
        spawnEmojiBurst(stormEmojis[i % stormEmojis.length], 0, 0);
      }, i * 350);
    }

    if (typeof window.confetti === 'function') {
      const ragePalette = ['#ff0000', '#ff3b1f', '#cc0000', '#990000', '#ff8a1f', '#000000'];
      const baseX = (rect.left + rect.right) / 2 / window.innerWidth;
      const baseY = (rect.top + rect.bottom) / 2 / window.innerHeight;
      for (let i = 0; i < 5; i++) {
        setTimeout(function () {
          window.confetti({
            particleCount: 90,
            spread: 360,
            startVelocity: 55,
            origin: {
              x: Math.max(0.1, Math.min(0.9, baseX + (Math.random() * 0.3 - 0.15))),
              y: Math.max(0.1, Math.min(0.9, baseY + (Math.random() * 0.3 - 0.15)))
            },
            colors: ragePalette
          });
        }, i * 500);
      }
    }
  }

  function spawnEmojiBurst(emoji, signX, signY) {
    const count = signX === 0 && signY === 0 ? 16 : 10;
    const fbRect = feedbackEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const cx = (targetRect.left + targetRect.width / 2) - fbRect.left;
    const cy = (targetRect.top + targetRect.height / 2) - fbRect.top;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'emoji-burst';
      el.textContent = emoji;
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      const dx = signX === 0
        ? (Math.random() * 360 - 180)
        : signX * (60 + Math.random() * 160);
      const dy = signY === 0
        ? (Math.random() * 360 - 180)
        : signY * (40 + Math.random() * 160);
      el.style.setProperty('--dx', dx + 'px');
      el.style.setProperty('--dy', dy + 'px');
      el.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      el.style.setProperty('--delay', (i * 30) + 'ms');
      feedbackEl.appendChild(el);
      setTimeout(function () { el.remove(); }, 1300 + i * 30);
    }
  }

  function spawnPopAt(opts) {
    const fbRect = feedbackEl.getBoundingClientRect();
    const pop = document.createElement('span');
    pop.className = 'pop' + (opts.slow ? ' pop--slow' : '');
    pop.style.left = (opts.x - fbRect.left) + 'px';
    pop.style.top = (opts.y - fbRect.top) + 'px';
    if (opts.color) pop.style.color = opts.color;
    pop.textContent = opts.text;
    feedbackEl.appendChild(pop);
    setTimeout(function () { pop.remove(); }, opts.slow ? 1800 : 900);
  }

  function spawnPowerBurst(bonus) {
    if (!powerEl) return;
    powerEl.classList.remove('burst');
    void powerEl.offsetWidth;
    powerEl.classList.add('burst');
    if (!feedbackEl) return;
    const fbRect = feedbackEl.getBoundingClientRect();
    const rect = powerEl.getBoundingClientRect();
    const count = Math.max(1, Math.min(5, bonus));
    for (let i = 0; i < count; i++) {
      const pop = document.createElement('span');
      pop.className = 'pop pop--power';
      pop.textContent = bonus === 1 ? '+1' : '+' + Math.ceil(bonus / count);
      pop.style.left = (rect.right - fbRect.left + (Math.random() * 18 - 4)) + 'px';
      pop.style.top = (rect.top + rect.height / 2 - fbRect.top + (Math.random() * 18 - 9)) + 'px';
      pop.style.setProperty('--dx', (28 + Math.random() * 86) + 'px');
      pop.style.setProperty('--dy', (-52 - Math.random() * 78) + 'px');
      pop.style.setProperty('--rot', (Math.random() * 34 - 17) + 'deg');
      pop.style.setProperty('--delay', (i * 35) + 'ms');
      feedbackEl.appendChild(pop);
      setTimeout(function () { pop.remove(); }, 950 + i * 35);
    }
    setTimeout(function () { powerEl.classList.remove('burst'); }, 520);
  }

  function onClick(e) {
    if (Date.now() < suppressClickUntil) return;
    consecutiveUps = 0;
    const scored = scoreAction(1, 1, 'click');
    target.classList.add('has-clicked');

    bumpStat(clicksEl);
    bumpStat(lifetimeEl);

    spawnPop(e, scored);
    if (scored.bonus) spawnPowerBurst(scored.bonus);
    spinIfDue();
    confettiIfDue();
    checkAchievements();
    persist();
    updateClicksDisplay();
    updateLifetimeDisplay();
  }

  function onReset() {
    state.clicks = 0;
    state.unlocked = [];
    state.secretClicks = 0;
    state.combo = { streak: 0, best: state.combo && state.combo.best || 0, lastAt: 0, lastAction: null };
    consecutiveUps = 0;
    addLog('The run was reset. The face did not forget.', true);
    persist();
    updateClicksDisplay();
    updatePowerBar();
    achList.querySelectorAll('li[data-threshold]').forEach(li => li.classList.remove('unlocked'));
    target.classList.remove('has-clicked');
  }

  function onSecretClick(e) {
    e.stopPropagation();
    state.secretClicks = (state.secretClicks || 0) + 1;
    const n = state.secretClicks;
    const r = clicksEl.getBoundingClientRect();
    const popOpts = {
      x: r.left + r.width / 2,
      y: r.top + r.height / 2 - 6
    };

    let delta = 0;
    let popText = 'ok, no more secret points for you';
    let popColor = '#5b6472';

    if (n >= 1 && n <= 3) {
      delta = 5;
      popText = '+5 😉';
      popColor = '#1bb46a';
    } else if (n === 13) {
      delta = 10;
      popText = 'Fiiiiine. But no more! +10';
      popColor = '#1bb46a';
    } else if (n === 18) {
      delta = -50;
      popText = 'I told you no more!! -50';
      popColor = '#e64545';
      triggerRage(target.getBoundingClientRect());
      unlockSecret('rage');
    }

    if (delta !== 0) {
      state.clicks += delta;
      state.lifetime += delta;
      addLog(delta > 0 ? 'The score leaked secret points.' : 'The score bit back.', true);
      bumpStat(clicksEl);
      bumpStat(lifetimeEl);
      updateClicksDisplay();
      updateLifetimeDisplay();
      checkAchievements();
    }
    persist();
    spawnPopAt({ x: popOpts.x, y: popOpts.y, text: popText, color: popColor, slow: true });
  }

  function bumpStat(el) {
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
  }

  function spawnPop(e, scored) {
    const rect = target.getBoundingClientRect();
    const fbRect = feedbackEl.getBoundingClientRect();
    const x = (e && e.clientX !== undefined ? e.clientX : rect.left + rect.width / 2) - fbRect.left;
    const y = (e && e.clientY !== undefined ? e.clientY : rect.top + rect.height / 2) - fbRect.top;
    const pop = document.createElement('span');
    pop.className = 'pop';
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
    pop.textContent = labelForClick(state.clicks, scored);
    feedbackEl.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
  }

  function labelForClick(n, scored) {
    if (scored && scored.baseDelta > 1) {
      return '+' + scored.baseDelta;
    }
    if (n === 1) return 'Hello!';
    if (n > 0 && n % 100 === 0) return n.toLocaleString() + '!';
    if (n > 0 && n % 25 === 0) return 'Combo ' + n + '!';
    return '+1';
  }

  function spinIfDue() {
    if (state.clicks <= 0) return;
    if (state.clicks === 1 || state.clicks % 10 === 0) {
      target.classList.remove('spin');
      void target.offsetWidth;
      target.classList.add('spin');
      target.addEventListener('animationend', () => {
        target.classList.remove('spin');
      }, { once: true });
    }
  }

  function confettiIfDue() {
    if (state.clicks <= 0) return;
    if (typeof window.confetti !== 'function') return;
    const isMilestone = state.clicks === 1 || state.clicks % 25 === 0;
    if (!isMilestone) return;
    const rect = target.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2 / window.innerWidth;
    const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
    const big = state.clicks % 100 === 0;
    window.confetti({
      particleCount: big ? 220 : 120,
      spread: big ? 100 : 70,
      startVelocity: big ? 55 : 40,
      origin: { x, y }
    });
  }

  function checkAchievements() {
    thresholds.forEach(t => {
      if (state.clicks >= t && !state.unlocked.includes(t)) {
        state.unlocked.push(t);
        const li = achList.querySelector('li[data-threshold="' + t + '"]');
        if (li) {
          li.classList.add('unlocked', 'just-unlocked');
          setTimeout(() => li.classList.remove('just-unlocked'), 700);
        }
        addLog('A threshold clicked open: ' + t + '.', t === 1 || t === 100);
        if (t === 100) {
          addLog('The unicorn clause executed successfully.', true);
          triggerUnicornFlyover();
        }
      }
    });
    if (state.clicks <= -100 && !(state.unlockedSecrets || []).includes('abyss')) {
      addLog('The abyss updated your file.', true);
      unlockSecret('abyss');
    }
  }

  function unlockSecret(id) {
    state.unlockedSecrets = state.unlockedSecrets || [];
    if (state.unlockedSecrets.includes(id)) return;
    state.unlockedSecrets.push(id);
    const li = achList.querySelector('li[data-secret="' + id + '"]');
    if (li) {
      li.classList.add('unlocked', 'just-unlocked');
      setTimeout(function () { li.classList.remove('just-unlocked'); }, 700);
    }
    persist();
  }

  function triggerUnicornFlyover() {
    const container = document.createElement('div');
    container.className = 'unicorn-flyover';
    const unicornCount = 7;
    for (let i = 0; i < unicornCount; i++) {
      const u = document.createElement('span');
      u.className = 'unicorn';
      u.textContent = '🦄';
      u.style.top = (8 + Math.random() * 70) + 'vh';
      u.style.fontSize = (40 + Math.random() * 36) + 'px';
      u.style.animationDelay = (i * 280) + 'ms';
      u.style.animationDuration = (4 + Math.random() * 2.5) + 's';
      container.appendChild(u);
    }
    document.body.appendChild(container);
    setTimeout(function () { container.remove(); }, 9000);

    if (typeof window.confetti === 'function') {
      const rainbow = ['#ff6ec7', '#ffb84d', '#ffe34d', '#65d96f', '#4dd0ff', '#a07dff'];
      [0, 800, 1600].forEach(function (delay) {
        setTimeout(function () {
          window.confetti({
            particleCount: 120,
            spread: 80,
            startVelocity: 45,
            origin: { x: 0.5, y: 0.4 },
            colors: rainbow
          });
        }, delay);
      });
    }
  }
})();
