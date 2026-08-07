// Meta Pixel — inicialización condicional por ruta.
// El Pixel NO debe cargarse en rutas internas con datos de pacientes
// (portal médico), por privacidad y por las restricciones de categoría
// "Salud y bienestar" de Meta.
const PIXEL_ID = "1252713866126347";
const EXCLUDED_ROUTES = ["/admin", "/auth"];

let loaded = false;

const isExcluded = (pathname: string) =>
  EXCLUDED_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));

/** Inyecta fbevents.js e inicializa el Pixel (una sola vez). */
const loadPixel = () => {
  if (loaded) return;
  loaded = true;
  /* eslint-disable */
  !(function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode!.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", PIXEL_ID);
};

/** Llamar en cada cambio de ruta. Carga el Pixel solo en rutas públicas. */
export const trackMetaPageView = (pathname: string) => {
  if (isExcluded(pathname)) return;
  loadPixel();
  window.fbq("track", "PageView");
};

/**
 * Evento estándar de Meta (Contact, Schedule, Lead...).
 * eventId opcional: mismo ID que usaría el servidor para deduplicar
 * si en el futuro se agrega Conversions API.
 */
export const trackMetaEvent = (
  eventName: string,
  params?: Record<string, string>,
  eventId?: string
) => {
  if (!loaded || isExcluded(window.location.pathname)) return;
  (window.fbq as unknown as (...args: unknown[]) => void)(
    "track",
    eventName,
    params ?? {},
    eventId ? { eventID: eventId } : undefined
  );
};
