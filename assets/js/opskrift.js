(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ------------------------------------------------------------------
     Lille besked nederst på skærmen
     ------------------------------------------------------------------ */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  /* ------------------------------------------------------------------
     1. PERSONER: skalerer ingredienslisten
     ------------------------------------------------------------------ */
  const BASE_PERSONS = 4;        // mængderne i HTML er skrevet til 4 personer
  const MIN_PERSONS  = 1;
  const MAX_PERSONS  = 24;
  let persons = BASE_PERSONS;

  const minusBtn = $('#servings-minus');
  const plusBtn  = $('#servings-plus');
  const label    = $('#servings-label');
  const status   = $('#servings-status');
  const numberFmt = new Intl.NumberFormat('da-DK', { maximumFractionDigits: 2 });

  const ingredients = $$('#ingredient-list li').map(li => ({
    base:  li.dataset.amount ? parseFloat(li.dataset.amount) : null,
    type:  li.dataset.type || 'count',
    qtyEl: $('.qty', li),
    nameEl: $('.name', li),
  }));

  // Stykker/spiseskeer: rund til nærmeste kvart og vis som ¼ ½ ¾
  const FRACTIONS = { 0: '', 0.25: '¼', 0.5: '½', 0.75: '¾' };
  function formatCount(value) {
    const q = Math.max(0.25, Math.round(value * 4) / 4);
    const whole = Math.floor(q);
    return { text: (whole || '') + FRACTIONS[q - whole], quantity: q };
  }

  // Vægt: hele gram, én decimal under 10 g, og kg fra 1000 g
  function formatWeight(value) {
    if (value >= 1000) return { text: numberFmt.format(Math.round(value / 10) / 100) + 'kg', quantity: value };
    if (value >= 10)   return { text: numberFmt.format(Math.round(value)) + 'g',            quantity: value };
    return { text: numberFmt.format(Math.round(value * 10) / 10) + 'g',                    quantity: value };
  }

  function renderIngredients() {
    ingredients.forEach(item => {
      if (item.base === null) return;                         // fx "uanede mængder"
      const scaled = item.base * persons / BASE_PERSONS;
      const { text, quantity } = item.type === 'weight' ? formatWeight(scaled) : formatCount(scaled);
      item.qtyEl.textContent = text;

      const { sg, pl } = item.nameEl.dataset;                 // ental / flertal
      if (sg && pl) item.nameEl.textContent = quantity > 1 ? pl : sg;
    });

    const text = persons === 1 ? '1 person' : persons + ' personer';
    label.textContent  = text;
    status.textContent = 'Ingredienser vist til ' + text;
    minusBtn.disabled = persons <= MIN_PERSONS;
    plusBtn.disabled  = persons >= MAX_PERSONS;
  }

  minusBtn.addEventListener('click', () => { if (persons > MIN_PERSONS) { persons--; renderIngredients(); } });
  plusBtn.addEventListener('click',  () => { if (persons < MAX_PERSONS) { persons++; renderIngredients(); } });
  renderIngredients();

  /* ------------------------------------------------------------------
     2. MODALER
     Åbnes ved klik på kortet. Lukkes med kryds, klik udenfor eller Esc.
     ------------------------------------------------------------------ */
  $$('[data-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dialog = document.getElementById(trigger.dataset.open);
      if (!dialog) return;
      dialog.showModal();
      document.documentElement.classList.add('modal-open');   // lås baggrundens scroll
    });
  });

  $$('dialog.modal').forEach(dialog => {
    // Kryds i hjørnet
    $('.modal__close', dialog).addEventListener('click', () => dialog.close());

    // Klik udenfor (på baggrunden). Kræver at både museklik ned og op sker på baggrunden,
    // så man ikke lukker ved et uheld, når man markerer tekst og slipper udenfor.
    let pressedOnBackdrop = false;
    dialog.addEventListener('pointerdown', e => { pressedOnBackdrop = e.target === dialog; });
    dialog.addEventListener('click', e => {
      if (e.target === dialog && pressedOnBackdrop) dialog.close();
      pressedOnBackdrop = false;
    });

    // Sker ved alle former for lukning (også Esc)
    dialog.addEventListener('close', () => {
      if (!$('dialog.modal[open]')) document.documentElement.classList.remove('modal-open');
    });
  });

  /* ------------------------------------------------------------------
     3. RELATEREDE OPSKRIFTER: horisontal scroll + egen scrollbar
     ------------------------------------------------------------------ */
  const rail   = $('#rail');
  const track  = $('#rail-track');
  const thumb  = $('#rail-thumb');
  const prev   = $('#rail-prev');
  const next   = $('#rail-next');

  function updateRail() {
    const max   = rail.scrollWidth - rail.clientWidth;
    const ratio = Math.min(1, rail.clientWidth / rail.scrollWidth);
    thumb.style.width = (ratio * 100) + '%';
    thumb.style.left  = (max > 0 ? (rail.scrollLeft / max) * (1 - ratio) * 100 : 0) + '%';
    prev.disabled = rail.scrollLeft <= 1;
    next.disabled = rail.scrollLeft >= max - 1;
  }

  function stepSize() {
    const card = rail.firstElementChild;
    const gap  = parseFloat(getComputedStyle(rail).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  prev.addEventListener('click', () => rail.scrollBy({ left: -stepSize(), behavior: 'smooth' }));
  next.addEventListener('click', () => rail.scrollBy({ left:  stepSize(), behavior: 'smooth' }));
  rail.addEventListener('scroll', updateRail, { passive: true });
  window.addEventListener('resize', updateRail);

  // Træk i scrollbaren / klik på sporet
  let dragging = false, startX = 0, startScroll = 0;
  thumb.addEventListener('pointerdown', e => {
    dragging = true; startX = e.clientX; startScroll = rail.scrollLeft;
    thumb.setPointerCapture(e.pointerId);
    rail.style.scrollSnapType = 'none';
    e.stopPropagation();
  });
  thumb.addEventListener('pointermove', e => {
    if (!dragging) return;
    const free = track.clientWidth - thumb.offsetWidth;
    const max  = rail.scrollWidth - rail.clientWidth;
    if (free > 0) rail.scrollLeft = startScroll + ((e.clientX - startX) / free) * max;
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    rail.style.scrollSnapType = '';
  };
  thumb.addEventListener('pointerup', endDrag);
  thumb.addEventListener('pointercancel', endDrag);

  track.addEventListener('pointerdown', e => {
    if (e.target === thumb) return;
    const rect = track.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    rail.scrollTo({ left: fraction * (rail.scrollWidth - rail.clientWidth), behavior: 'smooth' });
  });

  updateRail();

  // Hjerter på kortene (favorit – kun visuelt)
  $$('.heart').forEach(btn => btn.addEventListener('click', () => {
    btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') !== 'true');
  }));

  /* ------------------------------------------------------------------
     4. VÆRKTØJSLINJE: kopiér ingredienser, gem, del, udskriv
     ------------------------------------------------------------------ */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch {}
      ta.remove();
      return ok;
    }
  }

  $('#btn-copy').addEventListener('click', async () => {
    const lines = $$('#ingredient-list li').map(li => li.textContent.replace(/\s+/g, ' ').trim());
    const head  = 'Forloren Hare – ingredienser til ' + label.textContent;
    toast(await copyText(head + '\n' + lines.join('\n')) ? 'Ingredienser kopieret' : 'Kunne ikke kopiere');
  });

  const saveBtn = $('#btn-save');
  saveBtn.addEventListener('click', () => {
    const saved = saveBtn.getAttribute('aria-pressed') !== 'true';
    saveBtn.setAttribute('aria-pressed', saved);
    toast(saved ? 'Opskrift gemt' : 'Opskrift fjernet fra gemte');
    // TODO: kobl til din egen "gemte opskrifter"-funktion her
  });

  $('#btn-share').addEventListener('click', async () => {
    const data = { title: document.title, url: location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch { /* brugeren annullerede */ }
    } else {
      toast(await copyText(data.url) ? 'Link kopieret' : 'Kunne ikke kopiere linket');
    }
  });

  $('#btn-print').addEventListener('click', () => window.print());

  /* ------------------------------------------------------------------
     5. GIV VURDERING
     ------------------------------------------------------------------ */
  const stars = $$('.rate__star');
  const rateMsg = $('#rate-msg');
  let chosen = 0;

  const paint = n => stars.forEach((s, i) => s.classList.toggle('on', i < n));

  stars.forEach((star, i) => {
    star.addEventListener('mouseenter', () => paint(i + 1));
    star.addEventListener('focus',      () => paint(i + 1));
    star.addEventListener('blur',       () => paint(chosen));
    star.addEventListener('click', () => {
      chosen = i + 1;
      paint(chosen);
      stars.forEach((s, j) => s.setAttribute('aria-pressed', j === i));
      rateMsg.textContent = 'Tak for din vurdering: ' + chosen + ' ud af 5';
      // TODO: send vurderingen til din backend her
    });
  });
  $('#rate-stars').addEventListener('mouseleave', () => paint(chosen));
})();
