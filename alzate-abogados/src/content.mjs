/**
 * Contenido del sitio. Lo editable desde el panel (/admin) vive en la carpeta content/:
 *   content/servicios.json · content/faq.json · content/articulos/*.md · content/settings.json
 * Los textos jurídicos son BORRADORES de carácter general y deben ser revisados y aprobados
 * por el abogado antes de publicarse. No citan normas, plazos ni jurisprudencia a propósito.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';

const dir = fileURLToPath(new URL('../content/', import.meta.url));
const readJson = (f) => JSON.parse(readFileSync(path.join(dir, f), 'utf8'));

const servicios = readJson('servicios.json');
const clean = (s) => (s || '').toString();
const slugify = (t) => clean(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// El texto de los servicios y artículos se escribe en Markdown. HTML incrustado se descarta por seguridad.
const md = new Marked({ gfm: true, renderer: { html: () => '' } });

const svc = (s) => {
  const name = clean(s.name).trim();
  return {
    ...s,
    name,
    slug: slugify(s.slug) || slugify(name) || 'servicio',
    asunto: clean(s.asunto).trim() || name.toLowerCase(),
    icon: s.icon || 'document',
    detailHtml: clean(s.detail).trim() ? md.parse(clean(s.detail).trim()) : '',
  };
};

/** Especialidades destacadas (primera pantalla y banda propia). */
export const specialties = (servicios.especialidades || []).map(svc);
export const familyServices = (servicios.familia || []).map(svc);
export const civilArea = svc(servicios.civil);
export const commercialArea = svc(servicios.comercial);
/** Servicios que tienen página propia en /servicios/<slug>/ */
export const servicePages = [...specialties, ...familyServices];

export const pillars = [
  {
    icon: 'ear',
    title: 'Atención personalizada',
    text: 'Cada situación tiene particularidades que deben comprenderse antes de definir una estrategia jurídica.',
  },
  {
    icon: 'chat',
    title: 'Comunicación directa',
    text: 'Priorizamos una relación cercana y una comunicación clara con el abogado durante el acompañamiento.',
  },
  {
    icon: 'compass',
    title: 'Trayectoria y criterio jurídico',
    text: 'Una práctica profesional construida a lo largo de los años, aplicada a la comprensión de cada asunto.',
  },
];

export const steps = [
  {
    title: 'Cuéntenos su situación',
    text: 'Usted inicia el contacto y explica, de manera general, qué necesita.',
  },
  {
    title: 'Revisemos su consulta',
    text: 'Se establece la comunicación necesaria para conocer el asunto y determinar el tipo de asesoría pertinente.',
  },
  {
    title: 'Definamos los siguientes pasos',
    text: 'El abogado le informa sobre las alternativas jurídicas aplicables, el alcance del servicio y las condiciones correspondientes, después de evaluar el caso.',
  },
];


export const faqs = (readJson('faq.json').items || [])
  .map((f) => ({ q: clean(f.q).trim(), a: (f.a || []).map((p) => clean(typeof p === 'string' ? p : p.text ?? p.parrafo)).filter((p) => p.trim()) }))
  .filter((f) => f.q && f.a.length);

/* ---------- Artículos (content/articulos/*.md) ---------- */
export const articleWarnings = [];

// Fecha sin hora (AAAA-MM-DD) llega como medianoche UTC: se muestra tal cual para no correrla un día.
const dateLabel = (iso) =>
  new Intl.DateTimeFormat('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric',
    timeZone: iso.endsWith('T00:00:00.000Z') ? 'UTC' : 'America/Bogota',
  }).format(new Date(iso));

function loadArticles() {
  const list = [];
  for (const file of readdirSync(path.join(dir, 'articulos')).filter((f) => f.endsWith('.md')).sort()) {
    // URL segura: minúsculas, sin tildes ni símbolos (aunque el archivo se haya nombrado distinto).
    const slug = file.replace(/\.md$/, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'articulo';
    const { data, content } = matter(readFileSync(path.join(dir, 'articulos', file), 'utf8'));
    const body = content.trim();
    const dateIso = data.date ? new Date(data.date).toISOString() : null;
    const wantsPublish = data.published === true;
    // Un artículo solo se publica si está marcado, tiene fecha real y tiene texto.
    const published = wantsPublish && !!dateIso && body.length > 0;
    if (wantsPublish && !published) articleWarnings.push(`"${data.title || slug}": marcado como publicado pero falta ${!dateIso ? 'la fecha' : 'el texto'}; no se publicó.`);
    list.push({
      slug,
      title: clean(data.title).trim() || slug,
      description: clean(data.description).trim(),
      date: dateIso,
      dateLabel: dateIso ? dateLabel(dateIso) : null,
      published,
      comingSoon: !published && data.comingSoon === true,
      topic: clean(data.topic).trim() || `el tema «${clean(data.title).trim() || slug}»`,
      outline: Array.isArray(data.outline) ? data.outline : [],
      html: published ? md.parse(body) : '',
    });
  }
  // Publicados: más recientes primero. Luego los "próximamente".
  list.sort((a, b) => (a.published === b.published ? (b.date || '').localeCompare(a.date || '') : a.published ? -1 : 1));
  return list;
}
export const allArticles = loadArticles();
/** Solo los publicados tienen página propia. Los borradores NO se generan (no quedan accesibles por URL). */
export const articles = allArticles.filter((a) => a.published);
/** Temas anunciados como "Próximamente" (sin enlace). */
export const comingSoon = allArticles.filter((a) => a.comingSoon);
