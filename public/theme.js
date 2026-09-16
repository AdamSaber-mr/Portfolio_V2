/**
 * Zet het thema vóór de eerste paint, zodat je geen witte flits ziet wanneer je
 * voorkeur "donker" is.
 *
 * Dit staat als apart bestand in public/ en niet inline, omdat de
 * Content-Security-Policy `script-src 'self'` afdwingt: een inline script zou
 * 'unsafe-inline' vereisen en daarmee de hele policy verzwakken.
 */
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
