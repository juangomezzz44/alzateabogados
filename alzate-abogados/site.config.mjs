/**
 * ============================================================
 *  CONFIGURACIÓN CENTRAL — Álzate - Abogados
 * ============================================================
 *  Todo lo que cambia entre "borrador" y "producción" vive aquí.
 *  Los valores en `null` son DATOS PENDIENTES: en modo borrador el sitio
 *  muestra avisos visibles; en producción (`npm run build:prod`) la
 *  compilación se detiene si falta alguno de los obligatorios.
 *
 *  El número de WhatsApp también puede pasarse por variable de entorno:
 *      ALZATE_WA_NUMBER=573001234567 npm run build
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const env = process.env;

/** Datos editables desde el panel /admin: content/settings.json */
const settings = JSON.parse(readFileSync(fileURLToPath(new URL('./content/settings.json', import.meta.url)), 'utf8'));
/** Texto vacío del panel → null (dato pendiente). */
const val = (v) => (typeof v === 'string' ? (v.trim() === '' ? null : v.trim()) : (v ?? null));

export const config = {
  // ---------- MARCA (se cambia en el código, no desde el panel) ----------
  brand: {
    name: 'Álzate - Abogados',
    lawyer: 'Gilberto Álzate',
    lawyerFullNameInDiplomas: 'Gilberto Álzate Cardona', // tal como aparece en los diplomas de la fotografía
    practiceSince: 1985, // dato confirmado por el cliente
    descriptor: 'Derecho de familia y civil',
    colors: {
      green: '#0E2D1F', // medido del logo oficial (14, 45, 31)
      greenDeep: '#123D2C',
      greenInk: '#0A2217',
      white: '#FFFFFF',
      ivory: '#F7F5EF',
      text: '#303630',
      gold: '#B5A078',
    },
  },

  // ---------- CONTACTO (editable en el panel) ----------
  contact: {
    // WhatsApp oficial: 57 + 10 dígitos, sin espacios ni signos. Variable de entorno ALZATE_WA_NUMBER tiene prioridad.
    whatsappNumber: env.ALZATE_WA_NUMBER || val(settings.contact.whatsappNumber),
    email: val(settings.contact.email),
    city: val(settings.contact.city),
    coverage: val(settings.contact.coverage),
    address: val(settings.contact.address),
    hours: val(settings.contact.hours),
    modality: val(settings.contact.modality),
  },

  // ---------- PUBLICACIÓN ----------
  site: {
    // URL final sin barra final. Variable ALZATE_SITE_URL tiene prioridad; en Netlify también sirve la URL del sitio.
    url: env.ALZATE_SITE_URL || val(settings.site.url),
    locale: 'es-CO',
    lang: 'es',
  },

  // ---------- PERFIL DEL ABOGADO (editable) ----------
  profile: {
    bio: val(settings.profile.bio),
    professionalCard: val(settings.profile.professionalCard),
    showCredentialsFromPhoto: settings.profile.showCredentialsFromPhoto !== false,
  },

  // ---------- DATOS PERSONALES (editable) ----------
  privacy: {
    responsible: val(settings.privacy.responsible),
    contactChannel: val(settings.privacy.contactChannel),
    lastUpdated: val(settings.privacy.lastUpdated),
    validatedByLawyer: settings.privacy.validatedByLawyer === true,
  },

  // ---------- ANALÍTICA (apagada) ----------
  analytics: {
    provider: null, // 'ga4' cuando se decida usarla
    measurementId: null, // p. ej. 'G-XXXXXXXXXX'
  },

  // ---------- CONTENIDO JURÍDICO (editable) ----------
  content: {
    // 'familia' = Sucesiones dentro de Derecho de familia | 'propia' = tarjeta independiente
    sucesiones: env.ALZATE_SUCESIONES || (settings.content.sucesiones === 'propia' ? 'propia' : 'familia'),
    legalReviewDone: settings.content.legalReviewDone === true,
  },
};

// ---------- MENSAJES DE WHATSAPP (sin datos confidenciales) ----------
export const waMessages = {
  general:
    'Hola, doctor Gilberto. Estoy interesado(a) en recibir información sobre una consulta jurídica. ¿Podría indicarme cómo funciona la atención?',
  header: 'Hola, doctor Gilberto. Quisiera conocer cómo puedo consultar con usted. ¿Podría orientarme?',
  hero: 'Hola, doctor Gilberto. Me gustaría conversar sobre mi situación. ¿Podría indicarme cómo funciona la atención?',
  float: 'Hola, doctor Gilberto. Estoy interesado(a) en una consulta jurídica. ¿Podría indicarme cómo funciona la atención?',
  cta: 'Hola, doctor Gilberto. Vi su página web y quisiera recibir orientación jurídica. ¿Cómo podemos empezar?',
  profile: 'Hola, doctor Gilberto. Conocí su perfil en la página web y quisiera conversar con usted sobre una consulta.',
  faq: 'Hola, doctor Gilberto. Tengo una consulta y quisiera saber cómo funciona la atención y sus condiciones.',
  topic: (asunto) =>
    `Hola, doctor Gilberto. Quisiera recibir información sobre ${asunto}. ¿Podría indicarme cómo funciona la atención?`,
};

// ---------- NAVEGACIÓN ----------
export const nav = [
  { label: 'Inicio', href: 'index' },
  { label: 'El abogado', href: 'index#abogado' },
  { label: 'Áreas de práctica', href: 'index#areas' },
  { label: 'Artículos jurídicos', href: 'articulos' },
  { label: 'Contacto', href: 'index#contacto' },
];
