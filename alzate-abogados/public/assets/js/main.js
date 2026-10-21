/* Álzate - Abogados — comportamiento mínimo y progresivo (sin dependencias) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var list = document.getElementById('nav-list');
  function setMenu(open) {
    if (!toggle || !list) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    list.classList.toggle('is-open', open);
  }
  if (toggle && list) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('.site-header')) setMenu(false);
    });
  }

  /* ---------- Encabezado compacto al desplazarse + WhatsApp flotante ---------- */
  var header = document.querySelector('.site-header');
  var float = document.querySelector('.wa-float');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (float) float.classList.toggle('is-visible', y > 480);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Revelado al entrar en pantalla ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Explorador de la fotografía del despacho ---------- */
  document.querySelectorAll('[data-explorer]').forEach(function (box) {
    var pins = box.querySelectorAll('.pin');
    var hint = box.querySelector('[data-hint]');
    var detail = box.querySelector('[data-detail]');
    var title = box.querySelector('[data-detail-title]');
    var text = box.querySelector('[data-detail-text]');
    var zoomBtn = box.querySelector('[data-zoom-btn]');
    var dlg = document.querySelector('[data-lightbox]');
    var dlgImg = document.querySelector('[data-lightbox-img]');
    var current = null;

    pins.forEach(function (pin) {
      pin.addEventListener('click', function () {
        pins.forEach(function (p) { p.setAttribute('aria-pressed', 'false'); });
        pin.setAttribute('aria-pressed', 'true');
        current = pin;
        hint.hidden = true;
        detail.hidden = false;
        title.textContent = pin.dataset.title;
        text.textContent = pin.dataset.text;
        zoomBtn.hidden = !pin.dataset.zoom;
      });
    });
    zoomBtn.addEventListener('click', function () {
      if (!current || !current.dataset.zoom || !dlg || typeof dlg.showModal !== 'function') return;
      dlgImg.src = current.dataset.zoom;
      dlgImg.alt = current.dataset.zoomAlt || '';
      dlg.showModal();
    });
    if (dlg) dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  });

  /* ---------- Aviso si falta el número de WhatsApp (solo borrador) ---------- */
  var toast = document.getElementById('toast');
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-wa-pending]');
    if (!a) return;
    e.preventDefault();
    if (!toast) return;
    toast.textContent = 'Modo borrador: falta configurar el número de WhatsApp (config.contact.whatsappNumber). Ver README.';
    toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.hidden = true; }, 5000);
  });

  /* ---------- Analítica con consentimiento (inactiva salvo configuración) ---------- */
  var cfg = window.ALZATE_ANALYTICS;
  if (cfg && cfg.provider === 'ga4' && cfg.id) {
    var KEY = 'alzate-consent';
    var stored; try { stored = localStorage.getItem(KEY); } catch (_) {}
    var load = function () {
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.id);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', cfg.id, { anonymize_ip: true });
    };
    if (stored === 'granted') load();
    else if (stored !== 'denied') {
      var bar = document.createElement('div');
      bar.setAttribute('role', 'dialog'); bar.setAttribute('aria-label', 'Preferencias de analítica');
      bar.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:150;background:#fff;color:#303630;border:1px solid rgba(14,45,31,.2);border-radius:12px;padding:16px;box-shadow:0 20px 40px -16px rgba(0,0,0,.4);display:flex;flex-wrap:wrap;gap:12px;align-items:center;max-width:720px;margin:auto';
      bar.innerHTML = '<p style="margin:0;flex:1 1 280px;font-size:.92rem">Usamos analítica para mejorar el sitio solo si usted lo autoriza. Consulte la política de tratamiento de datos.</p>';
      ['Aceptar', 'Rechazar'].forEach(function (label, i) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = label;
        b.className = 'btn btn--sm ' + (i === 0 ? 'btn--primary' : 'btn--outline');
        b.addEventListener('click', function () {
          try { localStorage.setItem(KEY, i === 0 ? 'granted' : 'denied'); } catch (_) {}
          if (i === 0) load(); bar.remove();
        });
        bar.appendChild(b);
      });
      document.body.appendChild(bar);
    }
  }
})();
