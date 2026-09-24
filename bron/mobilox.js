/* CXclusives – zet de Mobilox-voorraad om naar CXclusives-autokaarten.
   Het Mobilox-script (voorraad.js) laadt onzichtbaar in .cxc-mox-src; dit script leest
   de auto's daaruit en tekent ze als .cxc-card. Lukt dat niet, dan wordt de originele
   Mobilox-weergave getoond. */
(function () {
  var box = document.querySelector('.cxc-mox');
  if (!box) return;
  var src = box.querySelector('.cxc-mox-src');
  var out = box.querySelector('.cxc-mox__cards');
  var limit = parseInt(box.getAttribute('data-limit') || '0', 10);
  var firstBadge = box.getAttribute('data-badge') || '';
  var CAR = out.querySelector('svg') ? out.querySelector('svg').outerHTML : '';
  var TWO_WORD = /^(land rover|alfa romeo|aston martin|rolls royce|mini cooper|lynk & co)\b/i;
  var parsedOnce = false, timer = null;

  // Tekst met spaties tussen elementen (het bronblok is onzichtbaar, dus innerText werkt niet).
  function txt(el) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), parts = [], n;
    while ((n = w.nextNode())) if (!/^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentNode.nodeName)) parts.push(n.nodeValue);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function hasImg(el) { return el.querySelector('img,[style*="background-image"]') || (el.style && /background-image/.test(el.getAttribute('style') || '')); }
  var DATA = /€|km\b|\b(19[89]\d|20[0-4]\d)\b|prijs|aanvraag/i;

  // The car list = the element with the most children that each hold a photo and car data.
  function findItems() {
    var best = [], nodes = src.querySelectorAll('*');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (/^(SCRIPT|STYLE|SELECT|OPTION|NOSCRIPT|SVG)$/i.test(el.tagName)) continue;
      var kids = [];
      for (var j = 0; j < el.children.length; j++) {
        var c = el.children[j];
        if (hasImg(c) && DATA.test(txt(c))) kids.push(c);
      }
      if (kids.length && kids.length >= best.length) best = kids;
    }
    return best;
  }

  function imgOf(item) {
    var img = item.querySelector('img');
    if (img) {
      var s = img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || img.getAttribute('data-original') || img.currentSrc || img.getAttribute('src') || '';
      if (!s && img.getAttribute('srcset')) s = img.getAttribute('srcset').split(',')[0].trim().split(' ')[0];
      if (s && !/^data:image\/(gif|svg)/.test(s)) return { src: s, alt: img.getAttribute('alt') || '' };
    }
    var bg = item.querySelector('[style*="background-image"]') || item;
    var m = (bg.getAttribute('style') || '').match(/url\(["']?([^"')]+)/);
    return m ? { src: m[1], alt: '' } : null;
  }

  function parse(item) {
    var t = txt(item);
    var a = item.tagName === 'A' ? item : item.querySelector('a[href]');
    var h = item.querySelector('h1,h2,h3,h4,h5,h6,[class*="title"],[class*="titel"],[class*="naam"],[class*="name"],strong,b');
    var img = imgOf(item);
    var title = h ? txt(h) : (img && img.alt) || '';
    var mb = title.match(TWO_WORD);
    var brand = mb ? mb[0] : title.split(' ')[0];
    var model = title.slice(brand.length).trim();
    var price = t.match(/€\s?[\d.]+(?:,(?:\d{2}|-{1,2}))?/);
    var km = t.match(/\b(\d{1,3}(?:\.\d{3})+|\d+)\s?km\b/i);
    var year = t.match(/\b(19[89]\d|20[0-4]\d)\b/);
    var fuel = t.match(/plug-in hybride|hybride|benzine|diesel|elektrisch|lpg|cng|waterstof/i);
    var gear = t.match(/semi-automaat|automaat|handgeschakeld|handmatig/i);
    var lab = item.querySelector('[class*="label"],[class*="badge"],[class*="sticker"],[class*="ribbon"],[class*="status"]');
    var badge = lab && txt(lab).length < 22 ? txt(lab) : '';
    function cap(m) { return m ? m[0].charAt(0).toUpperCase() + m[0].slice(1).toLowerCase() : ''; }
    return {
      a: a, href: a ? a.getAttribute('href') : '', img: img, brand: brand, model: model || brand,
      specs: [year && year[0], km && km[1] + ' km', cap(gear), cap(fuel)].filter(Boolean).join(' · '),
      price: price ? price[0].replace(/\s/, ' ') : (/aanvraag/i.test(t) ? 'Prijs op aanvraag' : 'Vraag naar prijs'),
      badge: badge
    };
  }

  function realUrl(h) { return h && h !== '#' && !/^javascript:/i.test(h) && h.charAt(0) !== '#'; }

  function native() { box.classList.add('is-native'); }

  function render() {
    if (box.classList.contains('is-native')) return;
    var items = findItems();
    if (!items.length) return;
    var cars = items.map(parse).filter(function (c) { return c.brand; });
    if (!cars.length) return;
    if (limit) cars = cars.slice(0, limit);
    parsedOnce = true;
    out.innerHTML = cars.map(function (c, i) {
      var badge = c.badge || (i === 0 ? firstBadge : '');
      var media = c.img ? '<img src="' + esc(c.img.src) + '" alt="' + esc(c.brand + ' ' + c.model) + '" loading="lazy">' : CAR;
      var href = realUrl(c.href) ? c.href : '#';
      return '<article class="cxc-card">' +
        '<div class="cxc-card__media">' + (badge ? '<span class="cxc-badge">' + esc(badge) + '</span>' : '') + media + '</div>' +
        '<div class="cxc-card__body">' +
        '<p class="cxc-card__brand">' + esc(c.brand) + '</p>' +
        '<h3 class="cxc-card__title">' + esc(c.model) + '</h3>' +
        (c.specs ? '<p class="cxc-card__specs">' + esc(c.specs) + '</p>' : '') +
        '<div class="cxc-card__price"><strong>' + esc(c.price) + '</strong><span>Lease mogelijk</span></div>' +
        '<a class="cxc-card__btn" href="' + esc(href) + '" data-i="' + i + '">Bekijk voertuig</a>' +
        '</div></article>';
    }).join('');
    // Mobilox-detailpagina's die via JavaScript openen: toon dan de Mobilox-weergave.
    out.querySelectorAll('.cxc-card__btn').forEach(function (btn) {
      var c = cars[+btn.getAttribute('data-i')];
      if (realUrl(c.href) || !c.a) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault(); native();
        c.a.click();
        box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function schedule() { clearTimeout(timer); timer = setTimeout(render, 250); }
  if (window.MutationObserver) new MutationObserver(schedule).observe(src, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'data-src', 'style', 'href'] });
  window.addEventListener('load', schedule);
  // Een gedeelde link naar een auto (#...) direct in de Mobilox-weergave openen.
  if (location.hash.length > 1 && !limit) native();
  // Na 12 seconden niets kunnen omzetten? Toon Mobilox zelf, of de reservelink als er niets laadde.
  setTimeout(function () {
    if (parsedOnce) return;
    if (txt(src) || src.querySelector('iframe,img')) native();
    else box.classList.add('is-empty');
  }, 12000);
  var back = box.querySelector('.cxc-mox__back');
  if (back) back.addEventListener('click', function (e) { e.preventDefault(); location.href = location.pathname; });
})();
