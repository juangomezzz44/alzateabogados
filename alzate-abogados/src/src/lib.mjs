import { config, waMessages } from '../site.config.mjs';

/* ---------- Modo ---------- */
const MODE = process.env.ALZATE_MODE || 'draft';
/** producción: indexable y exige datos. */
export const isProd = MODE === 'production';
/** preview o producción: sin avisos de borrador visibles (para mostrar al cliente). */
export const isClean = MODE === 'production' || MODE === 'preview';

export const waNumberRaw = config.contact.whatsappNumber;
export const waNumberValid = typeof waNumberRaw === 'string' && /^57\d{10}$/.test(waNumberRaw);
export const siteUrl = config.site.url ? config.site.url.replace(/\/+$/, '') : null;

/** Escapa texto para HTML. */
export const esc = (s) =>
  String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/** Enlace de WhatsApp: se construye en un único lugar. */
export function waLink(message) {
  if (!waNumberValid) return '#whatsapp-pendiente';
  return `https://wa.me/${waNumberRaw}?text=${encodeURIComponent(message)}`;
}
export const waPendingAttr = () => (waNumberValid ? '' : ' data-wa-pending="true"');

export { waMessages };

/** Resuelve rutas relativas según la profundidad de la página (funciona en cualquier carpeta). */
export function makeUrl(depth) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  const asset = (p) => `${prefix}assets/${p}`;
  const page = (p) => {
    if (p === 'index') return prefix;
    if (p.startsWith('index#')) return `${prefix}${p.slice(5)}`;
    return `${prefix}${p}/`;
  };
  return { prefix, asset, page };
}

/** Marcador visible de dato pendiente (solo en borrador). */
export const pending = (label) =>
  isClean ? '' : `<span class="pending" title="Dato pendiente">[POR COMPLETAR: ${esc(label)}]</span>`;

export const canonicalFor = (path) => (siteUrl ? `${siteUrl}${path}` : null);
