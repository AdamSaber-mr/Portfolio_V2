/**
 * Zet het thema vóór de eerste paint.
 *
 * Dit bestand is de enige eigenaar van `data-theme` op <html> tijdens het laden.
 * Eerder schreef het naar <html> terwijl de CSS `.root[data-theme]` las — een div
 * die React pas na het laden aanmaakt — waardoor het script niets deed en light
 * mode bij elke load een zwarte flits gaf.
 *
 * Apart bestand omdat de Content-Security-Policy `script-src 'self'` afdwingt.
 */
(function () {
  var PAPER = '#f4f1ea';
  var NIGHT = '#16130f';
  var theme = 'light';
  try {
    var stored = localStorage.getItem('theme');
    theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) {
    theme = 'light';
  }
  var el = document.documentElement;
  el.setAttribute('data-theme', theme);
  // Geldt in de paar milliseconden voordat de stylesheet binnen is.
  el.style.colorScheme = theme;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? NIGHT : PAPER);
})();
