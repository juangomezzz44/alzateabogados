/* Iconos SVG minimalistas (trazo 1.6, 24x24). Decorativos: aria-hidden. */
const P = {
  whatsapp:
    '<path d="M20.5 3.5A11 11 0 0 0 3.2 17.1L2 22l5-1.3A11 11 0 0 0 22 12a10.9 10.9 0 0 0-1.5-8.5Z" fill="none"/><path d="M8.6 7.4c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .4-.1.6l-.5.7c-.1.2-.1.4 0 .5.5 1 1.6 2.1 2.8 2.7.2.1.4.1.5-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .6-.3 1.3-1 1.7-.6.4-1.5.5-2.5.2-2.8-.8-5.1-2.9-6-5.3-.4-1.100-.1-2.200.7-3.100Z" stroke-width="1.1"/>',
  rings: '<circle cx="9" cy="14" r="5"/><circle cx="15.5" cy="14" r="5"/><path d="m7 5 2 2.2L11 5l-1.200-2H8.200z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1"/><path d="M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1"/>',
  'scale-balance': '<path d="M4 19V8l8-4 8 4v11"/><path d="M4 19h16"/><path d="M9 19v-6h6v6"/>',
  home: '<path d="M3 11.500 12 4l9 7.500"/><path d="M5.500 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
  child: '<circle cx="12" cy="7" r="3.200"/><path d="M5.500 20a6.500 6.500 0 0 1 13 0"/><path d="M9.500 14.500 12 17l2.500-2.500"/>',
  coins: '<ellipse cx="12" cy="6.500" rx="7" ry="3"/><path d="M5 6.500v5c0 1.700 3.100 3 7 3s7-1.300 7-3v-5"/><path d="M5 11.500v5c0 1.700 3.100 3 7 3s7-1.300 7-3v-5"/>',
  'search-person': '<circle cx="10" cy="8" r="3.200"/><path d="M3.500 19a6.500 6.500 0 0 1 9-5.800"/><circle cx="16.500" cy="16.500" r="3"/><path d="m18.700 18.700 2.300 2.300"/>',
  document: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>',
  book: '<path d="M4 5.500A2.500 2.500 0 0 1 6.500 3H20v15H6.500A2.500 2.500 0 0 0 4 20.500z"/><path d="M4 20.500A2.500 2.500 0 0 0 6.500 23H20v-5"/>',
  building: '<path d="M4 21V5l8-2v18"/><path d="M12 9h8v12"/><path d="M8 8h1M8 12h1M8 16h1M15 13h1M15 17h1"/><path d="M3 21h18"/>',
  ear: '<path d="M7 9a5 5 0 0 1 10 0c0 2.500-1.500 3.500-2.500 4.700-.8 1-.5 2.300-1.500 3.300a2.500 2.500 0 0 1-4-1"/><path d="M10 9a2 2 0 0 1 4 0"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.500h8M8 12.500h5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.500 8.500-2 5-5 2 2-5z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12.500 4.500 4.500L19 7.500"/>',
  zoom: '<circle cx="11" cy="11" r="6.500"/><path d="m20 20-4.200-4.200M11 8.500v5M8.500 11h5"/>',
  shield: '<path d="M12 3 5 6v6c0 4.300 3 7.500 7 9 4-1.500 7-4.700 7-9V6z"/><path d="m9 12 2.200 2.200L15.500 10"/>',
};

export function icon(name, { size = 24, cls = '' } = {}) {
  const fill = name === 'whatsapp' ? 'currentColor' : 'none';
  const stroke = name === 'whatsapp' ? 'none' : 'currentColor';
  return `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name] ?? ''}</svg>`;
}

/** Ícono de WhatsApp (relleno, marca reconocible). */
export function waIcon(size = 20) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.04 2a9.9 9.9 0 0 0-8.43 15.1L2 22l5.05-1.55A9.94 9.94 0 1 0 12.04 2Zm0 1.8a8.14 8.14 0 1 1-4.2 15.1l-.3-.18-3 .92.97-2.9-.2-.3A8.14 8.14 0 0 1 12.04 3.8Zm-3 3.7c-.2 0-.5.07-.75.35-.25.27-.97.95-.97 2.3s1 2.7 1.13 2.9c.14.18 1.95 3.1 4.8 4.2 2.4.95 2.88.76 3.4.7.52-.05 1.67-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.2-.55-.34s-1.67-.83-1.93-.92c-.26-.1-.45-.14-.64.14-.19.28-.74.92-.9 1.1-.17.2-.33.22-.62.08-.28-.14-1.2-.44-2.28-1.4-.84-.76-1.4-1.68-1.57-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.63-1.5-.86-2.06-.22-.54-.45-.47-.63-.48h-.54Z"/></svg>`;
}
