import { config, waMessages } from '../../site.config.mjs';
import { esc, makeUrl, isProd, isClean, pending, siteUrl } from '../lib.mjs';
import { icon } from '../icons.mjs';
import { page, waButton } from '../layout.mjs';
import { articles, comingSoon } from '../content.mjs';

const hasPublished = articles.length > 0;

/* ---------- Índice de artículos ---------- */
export function articlesIndexPage() {
  const depth = 1;
  const u = makeUrl(depth);
  const main = `<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Ruta de navegación"><a href="${u.page('index')}">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Orientación jurídica</span></nav>
    <p class="eyebrow eyebrow--light">Orientación jurídica</p>
    <h1>Conozca sus derechos</h1>
    <p class="lead">Información general para comprender conceptos y procedimientos de derecho de familia y derecho civil en Colombia. Es orientación informativa: no sustituye una evaluación jurídica individual.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    ${hasPublished ? '' : '<p class="section__lead reveal">Estamos preparando los primeros artículos. Se publicarán después de verificarse con fuentes oficiales y de ser revisados por el abogado.</p>'}
    <div class="article-grid">
      ${articles
        .map(
          (a) => `<article class="card article-card reveal">
        <h2><a href="${a.slug}/">${esc(a.title)}</a></h2>
        <p>${esc(a.description)}</p>
        <p class="meta"><time datetime="${esc(a.date)}">${esc(a.dateLabel)}</time></p>
        <a class="card__link" href="${a.slug}/"><span>Leer artículo</span>${icon('arrow', { size: 16 })}</a>
      </article>`,
        )
        .join('')}
      ${comingSoon
        .map(
          (a) => `<article class="card article-card article-card--soon reveal">
        <h2>${esc(a.title)}</h2>
        <p>${esc(a.description)}</p>
        <p class="meta">Próximamente · en revisión jurídica</p>
      </article>`,
        )
        .join('')}
    </div>
    <p class="note reveal">${icon('shield', { size: 20 })}<span>Los contenidos se publican únicamente después de verificarse con fuentes oficiales colombianas y de ser revisados por el abogado.</span></p>
  </div>
</section>`;
  return page({
    depth,
    title: 'Orientación jurídica: derecho de familia y civil | Álzate - Abogados',
    description: 'Orientación jurídica general sobre divorcio, unión marital de hecho, sociedad conyugal y patrimonial, custodia, alimentos, sucesiones y paternidad en Colombia.',
    path: '/articulos/',
    noindex: !hasPublished,
    main,
  });
}

/* ---------- Página de artículo (solo se generan los publicados) ---------- */
export function articlePage(a) {
  const depth = 2;
  const u = makeUrl(depth);
  const main = `<section class="page-hero">
  <div class="container container--narrow">
    <nav class="breadcrumb" aria-label="Ruta de navegación"><a href="${u.page('index')}">Inicio</a><span aria-hidden="true">/</span><a href="${u.page('articulos')}">Orientación jurídica</a><span aria-hidden="true">/</span><span aria-current="page">Artículo</span></nav>
    <h1>${esc(a.title)}</h1>
    <p class="meta meta--light">Publicado el <time datetime="${esc(a.date)}">${esc(a.dateLabel)}</time></p>
  </div>
</section>
<section class="section">
  <article class="container container--narrow prose">
    ${a.html}
    <aside class="prose__aside" aria-label="Consulta">
      <h2>¿Tiene una situación relacionada con este tema?</h2>
      <p>Esta información es general. Para conocer cómo aplica a su caso, converse con el abogado.</p>
      ${waButton({ message: waMessages.topic(a.topic), label: 'Consultar por WhatsApp' })}
    </aside>
    <p class="disclaimer">Contenido informativo. No sustituye una evaluación jurídica individual.</p>
  </article>
</section>`;
  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    inLanguage: 'es-CO',
    author: { '@type': 'Person', name: config.brand.lawyer },
    publisher: { '@type': 'Organization', name: config.brand.name },
  });
  return page({
    depth,
    title: `${a.title} | Álzate - Abogados`,
    description: a.description,
    path: `/articulos/${a.slug}/`,
    ld,
    ogType: 'article',
    main,
  });
}

/* ---------- Política de tratamiento de datos (BORRADOR a validar) ---------- */
export function privacyPage() {
  const depth = 1;
  const u = makeUrl(depth);
  const p = config.privacy;
  const val = (v, label) => (v ? esc(v) : pending(label) || '<em>(dato a completar antes de publicar)</em>');
  const main = `<section class="page-hero">
  <div class="container container--narrow">
    <nav class="breadcrumb" aria-label="Ruta de navegación"><a href="${u.page('index')}">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Política de datos</span></nav>
    <h1>Política de tratamiento de datos personales</h1>
  </div>
</section>
<section class="section">
  <div class="container container--narrow prose">
    ${isClean ? '' : `<p class="note note--warn">${icon('shield', { size: 20 })}<span><strong>Borrador.</strong> Este texto debe ser completado y validado por el responsable del tratamiento (y, si corresponde, por un profesional competente) antes de publicar el sitio. No constituye una revisión jurídica.</span></p>`}
    <h2>1. Responsable del tratamiento</h2>
    <p>Responsable: ${val(p.responsible, 'nombre o razón social del responsable')}.<br>Canal de contacto para consultas y reclamos: ${val(p.contactChannel, 'correo o dirección para consultas y reclamos')}.</p>
    <h2>2. Qué datos se tratan hoy</h2>
    <p>Este sitio web <strong>no contiene formularios</strong> y no solicita datos personales directamente. El contacto se inicia por voluntad del visitante a través de WhatsApp, un servicio de un tercero que se rige por sus propios términos y políticas. Los datos que usted decida compartir en esa conversación (por ejemplo, su nombre y número de teléfono) serán utilizados para atender su consulta.</p>
    <p>${config.analytics.provider ? 'El sitio puede utilizar herramientas de analítica únicamente si usted otorga su consentimiento.' : 'En esta versión el sitio no utiliza herramientas de analítica ni de publicidad.'}</p>
    <h2>3. Finalidad</h2>
    <p>Atender y responder las consultas recibidas, informar sobre el funcionamiento de la atención y, si se llega a un acuerdo de servicios, gestionar la relación profesional.</p>
    <h2>4. Recomendación sobre la información que comparte</h2>
    <p>Le sugerimos no enviar documentos de identidad, datos de menores ni información sensible en el primer mensaje. El abogado le indicará qué información se requiere y cómo entregarla.</p>
    <h2>5. Derechos de los titulares</h2>
    <p>Como titular de datos personales usted tiene derecho de hábeas data: puede conocer, actualizar, rectificar y solicitar la supresión de sus datos, así como revocar la autorización otorgada, en los términos de la normativa colombiana aplicable (referencia inicial: Ley 1581 de 2012 y sus normas reglamentarias, cuya vigencia y alcance deben verificarse). Para ejercer estos derechos, incluida la solicitud de eliminación de su información, escriba al correo indicado en el numeral 1.</p>
    <h2>6. Confidencialidad</h2>
    <p>La información que usted comparta será tratada con la reserva que corresponda. Las comunicaciones por plataformas de terceros pueden estar sujetas a las condiciones propias de cada plataforma.</p>
    <h2>7. Vigencia y cambios</h2>
    <p>Última actualización: ${val(p.lastUpdated, 'fecha de la versión validada')}. Esta política podrá ser modificada; la versión vigente será la publicada en esta página.</p>
  </div>
</section>`;
  return page({
    depth,
    title: 'Política de tratamiento de datos personales | Álzate - Abogados',
    description: 'Política de tratamiento de datos personales de Álzate - Abogados.',
    path: '/politica-de-tratamiento-de-datos/',
    noindex: true,
    main,
  });
}

/* ---------- Aviso informativo ---------- */
export function noticePage() {
  const depth = 1;
  const u = makeUrl(depth);
  const main = `<section class="page-hero">
  <div class="container container--narrow">
    <nav class="breadcrumb" aria-label="Ruta de navegación"><a href="${u.page('index')}">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Aviso informativo</span></nav>
    <h1>Aviso sobre el contenido informativo</h1>
  </div>
</section>
<section class="section">
  <div class="container container--narrow prose">
    <p>Los textos, artículos y respuestas publicados en este sitio tienen carácter exclusivamente informativo y general. No constituyen asesoría ni concepto jurídico sobre un caso particular y no sustituyen una evaluación jurídica individual.</p>
    <p>El contacto inicial con Álzate - Abogados, incluso por WhatsApp, no implica la aceptación automática del caso, la existencia de una relación de representación legal ni una garantía de resultados.</p>
    <p>La información publicada puede cambiar por modificaciones normativas o jurisprudenciales. Antes de tomar decisiones, consulte su situación particular directamente con el abogado.</p>
    <p>No se publican tarifas, tiempos de respuesta ni resultados de casos. Las condiciones de cualquier servicio se informan directamente, después de conocer el asunto.</p>
    <div class="prose__aside">${waButton({ message: waMessages.general, label: 'Consultar por WhatsApp' })}</div>
  </div>
</section>`;
  return page({
    depth,
    title: 'Aviso sobre el contenido informativo | Álzate - Abogados',
    description: 'Los contenidos de este sitio son informativos y no sustituyen una evaluación jurídica individual.',
    path: '/aviso-informativo/',
    noindex: true,
    main,
  });
}
