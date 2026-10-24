import { config, waMessages } from '../../site.config.mjs';
import { esc, makeUrl, siteUrl, isClean, pending } from '../lib.mjs';
import { icon } from '../icons.mjs';
import { page, waButton } from '../layout.mjs';
import { servicePages, specialties } from '../content.mjs';

/** Página de un servicio: /servicios/<slug>/ . Texto general e informativo; sin normas, plazos ni promesas. */
export function servicePage(s) {
  const depth = 2;
  const u = makeUrl(depth);
  const isSpec = specialties.some((x) => x.slug === s.slug);
  const related = servicePages.filter((x) => x.slug !== s.slug).slice(0, 4);
  const main = `<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Ruta de navegación"><a href="${u.page('index')}">Inicio</a><span aria-hidden="true">/</span><a href="${u.page('index#areas')}">Áreas de práctica</a><span aria-hidden="true">/</span><span aria-current="page">${esc(s.name)}</span></nav>
    <div class="page-hero__row"><span class="page-hero__icon">${icon(s.icon, { size: 40 })}</span><div>
      <h1>${esc(s.name)}${isSpec ? '' : ' en Bogotá y todo el país'}</h1>
      <p class="lead">${esc(s.text)}</p>
    </div></div>
    <div class="page-hero__cta">${waButton({ message: waMessages.topic(s.asunto), label: 'Consultar por WhatsApp', variant: 'gold', size: 'lg' })}</div>
  </div>
</section>
<section class="section section--tight">
  <div class="container svc">
    <article class="prose">
      ${s.detailHtml || (isClean ? '' : `<p class="slot">${pending('texto del servicio, a confirmar con el abogado')}</p>`)}
      <h2>Qué tener en cuenta</h2>
      <p>Cada situación tiene particularidades: las personas involucradas, los bienes, los documentos disponibles y los acuerdos previos pueden cambiar el camino a seguir. Por eso la información de esta página es general y no sustituye una evaluación jurídica de su caso.</p>
      <p>Las condiciones de la asesoría se informan directamente, después de conocer su situación.</p>
      <div class="prose__aside">
        <h2>¿Tiene una situación relacionada?</h2>
        <p>Cuéntele al abogado, de manera general, qué necesita. Por favor no envíe documentos ni datos sensibles en el primer mensaje.</p>
        ${waButton({ message: waMessages.topic(s.asunto), label: 'Escribir por WhatsApp' })}
      </div>
      <p class="disclaimer">Contenido informativo. No sustituye una evaluación jurídica individual ni garantiza resultados.</p>
    </article>
    <aside class="svc__side" aria-label="Otros servicios">
      <h2>Otros asuntos</h2>
      <ul>${related.map((r) => `<li><a href="${u.prefix}servicios/${r.slug}/">${icon(r.icon, { size: 20 })}<span>${esc(r.name)}</span></a></li>`).join('')}</ul>
      <a class="btn btn--outline btn--sm" href="${u.page('index#areas')}"><span>Ver todas las áreas</span></a>
    </aside>
  </div>
</section>`;
  const ld = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      description: s.text,
      areaServed: [{ '@type': 'City', name: 'Bogotá' }, { '@type': 'Country', name: 'Colombia' }],
      provider: { '@type': 'LegalService', name: config.brand.name },
      ...(siteUrl ? { url: `${siteUrl}/servicios/${s.slug}/` } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', ...(siteUrl ? { item: siteUrl + '/' } : {}) },
        { '@type': 'ListItem', position: 2, name: s.name },
      ],
    },
  ]);
  return page({
    depth,
    title: `${s.name} en Bogotá | Álzate - Abogados`,
    description: `${s.text} Atención personalizada desde Bogotá para todo el país.`.slice(0, 300),
    path: `/servicios/${s.slug}/`,
    ld,
    main,
  });
}
