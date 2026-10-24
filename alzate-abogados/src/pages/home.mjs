import { config, waMessages } from '../../site.config.mjs';
import { esc, makeUrl, waLink, waPendingAttr, waNumberValid, isProd, isClean, pending } from '../lib.mjs';
import { icon, waIcon } from '../icons.mjs';
import { page, waButton, homeJsonLd } from '../layout.mjs';
import { familyServices, civilArea, commercialArea, pillars, steps, faqs, articles, comingSoon } from '../content.mjs';

const depth = 0;
const u = makeUrl(depth);

const waAttrs = () => `data-wa${waPendingAttr()}${waNumberValid ? ' target="_blank" rel="noopener noreferrer"' : ''}`;

function serviceCard(s, { featured = false } = {}) {
  return `<article class="card reveal ${featured ? 'card--featured' : ''}">
    <span class="card__icon">${icon(s.icon, { size: 26 })}</span>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.text)}</p>
    <a class="card__link" href="${esc(waLink(waMessages.topic(s.asunto)))}" ${waAttrs()} aria-label="Consultar por WhatsApp sobre: ${esc(s.name)}">${waIcon(18)}<span>Consultar por WhatsApp</span>${icon('arrow', { size: 16 })}</a>
  </article>`;
}

function hero() {
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true"></div>
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow eyebrow--light">Álzate - Abogados <span class="sep">|</span> Derecho de familia y civil</p>
      <h1 id="hero-title">Su caso merece <em>atención jurídica personal</em>.</h1>
      <p class="lead">Asesoría jurídica en asuntos de familia y derecho civil, con una trayectoria profesional consolidada de más de 25 años y un enfoque cercano, directo y personalizado.</p>
      <div class="hero__actions">
        ${waButton({ message: waMessages.hero, label: 'Conversemos sobre su caso', variant: 'light', size: 'lg' })}
        <a class="btn btn--ghost btn--lg" href="#abogado"><span>Conozca al abogado</span>${icon('arrow', { size: 18 })}</a>
      </div>
      <ul class="hero__facts" aria-label="Datos destacados">
        <li>${icon('check', { size: 18 })} Más de 25 años de experiencia profesional</li>
        <li>${icon('check', { size: 18 })} Comunicación directa con el abogado</li>
        <li>${icon('check', { size: 18 })} Trabaja desde Bogotá y atiende en todo el país</li>
      </ul>
    </div>
    <figure class="hero__visual">
      <div class="arch">
        <img src="${u.asset('img/gilberto-retrato.webp')}" width="640" height="810" alt="El abogado Gilberto Álzate, de pie junto a la biblioteca de su despacho" fetchpriority="high" decoding="async">
      </div>
      <figcaption class="hero__chip">
        <span class="hero__chip-name">${esc(config.brand.lawyer)}</span>
        <span class="hero__chip-role">Abogado · +25 años de trayectoria</span>
      </figcaption>
    </figure>
  </div>
</section>`;
}

function values() {
  return `<section class="section" id="atencion" aria-labelledby="valor-title">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow">Una atención más personal</p>
      <h2 id="valor-title">Más que un trámite, una situación que merece ser comprendida</h2>
      <p class="section__lead">En Álzate - Abogados la prioridad es escuchar, comprender las particularidades de cada situación y acompañar con claridad.</p>
    </header>
    <div class="pillars">
      ${pillars
        .map(
          (p, i) => `<article class="pillar reveal" style="--d:${i * 90}ms">
        <span class="pillar__icon">${icon(p.icon, { size: 30 })}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`,
        )
        .join('')}
    </div>
  </div>
</section>`;
}

function specializedArea() {
  return `<section class="section section--ivory" id="especialidades" aria-labelledby="espec-title">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow">Especialidad destacada</p>
      <h2 id="espec-title">Sucesiones, Fideicomisos Civiles y Herencias</h2>
      <p class="section__lead">Proteja el legado familiar con una gestión jurídica rigurosa y humana. Nos especializamos en la organización y liquidación de patrimonios para garantizar la tranquilidad de las próximas generaciones.</p>
    </header>
    <div class="secondary reveal">
      <article class="card card--wide">
        <span class="card__icon">${icon('scale', { size: 26 })}</span>
        <h3>Sucesiones y Herencias</h3>
        <p>Trámites de liquidación de herencias, ya sean mutuo acuerdo o contenciosas. Aseguramos una distribución justa y legal del patrimonio siguiendo la normativa vigente.</p>
        <a class="card__link" href="${esc(waLink(waMessages.topic('sucesiones')))}" ${waAttrs()} aria-label="Consultar sobre sucesiones">${waIcon(18)}<span>Consultar por WhatsApp</span>${icon('arrow', { size: 16 })}</a>
      </article>
      <article class="card card--wide">
        <span class="card__icon">${icon('shield', { size: 26 })}</span>
        <h3>Fideicomisos Civiles</h3>
        <p>Creación y administración de fideicomisos para asegurar que los bienes lleguen a los beneficiarios designados bajo las condiciones exactas que usted desea.</p>
        <a class="card__link" href="${esc(waLink(waMessages.topic('fideicomiso')))}" ${waAttrs()} aria-label="Consultar sobre fideicomisos">${waIcon(18)}<span>Consultar por WhatsApp</span>${icon('arrow', { size: 16 })}</a>
      </article>
    </div>
    <div class="center reveal" style="margin-top:32px">
      ${waButton({ message: waMessages.hero, label: 'Asesoremos su patrimonio', variant: 'outline' })}
    </div>
  </div>
</section>`;
}

function areas() {
  return `<section class="section section--ivory" id="areas" aria-labelledby="areas-title">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow">Áreas de práctica</p>
      <h2 id="areas-title">Asesoría jurídica en los asuntos que más importan en la vida personal y familiar</h2>
      <p class="section__lead">Cada explicación es general e informativa. Para saber cómo aplica a su situación, conversemos.</p>
    </header>

    <div class="family reveal">
      <div class="family__intro">
        <span class="family__badge">Área principal</span>
        <h3>Derecho de familia</h3>
        <p>Acompañamiento en las decisiones familiares y patrimoniales que marcan un antes y un después, con lenguaje claro y atención directa.</p>
      </div>
      <div class="family__grid">
        ${familyServices.filter((s) => !(s.slug === 'sucesiones' && config.content.sucesiones === 'propia')).map((s) => serviceCard(s, { featured: true })).join('')}
      </div>
    </div>

    <div class="secondary">
      ${config.content.sucesiones === 'propia' ? serviceCard(familyServices.find((s) => s.slug === 'sucesiones')).replace('class="card reveal', 'class="card card--wide reveal') : ''}
      <article class="card card--wide reveal">
        <span class="card__icon">${icon(civilArea.icon, { size: 26 })}</span>
        <h3>${esc(civilArea.name)}</h3>
        <p>${esc(civilArea.text)}</p>
        ${isClean ? '' : `<p>${pending('listado de asuntos civiles que el abogado atiende')}</p>`}
        <a class="card__link" href="${esc(waLink(waMessages.topic(civilArea.asunto)))}" ${waAttrs()} aria-label="Consultar por WhatsApp sobre derecho civil">${waIcon(18)}<span>Consultar por WhatsApp</span>${icon('arrow', { size: 16 })}</a>
      </article>
      <article class="card card--wide card--quiet reveal">
        <span class="card__icon">${icon(commercialArea.icon, { size: 26 })}</span>
        <h3>${esc(commercialArea.name)}</h3>
        <p>${esc(commercialArea.text)}</p>
        ${isClean ? '' : `<p>${pending('alcance confirmado de la asesoría en sociedades comerciales')}</p>`}
        <a class="card__link" href="${esc(waLink(waMessages.topic(commercialArea.asunto)))}" ${waAttrs()} aria-label="Consultar por WhatsApp sobre sociedades comerciales">${waIcon(18)}<span>Consultar por WhatsApp</span>${icon('arrow', { size: 16 })}</a>
      </article>
    </div>
  </div>
</section>`;
}

/** Hotspots sobre la fotografía real del despacho. Coordenadas en % de la imagen 1280x960. */
function officeExplorer() {
  const showCreds = config.profile.showCredentialsFromPhoto;
  const pins = [
    {
      id: 'biblioteca',
      x: 11,
      y: 77,
      title: 'La biblioteca del despacho',
      text: 'Textos de derecho de familia, derecho civil y derecho procesal al alcance de la mano.',
      zoom: null,
    },
    ...(showCreds
      ? [
          {
            id: 'especialista',
            x: 77,
            y: 33,
            title: 'Especialista en Derecho de Familia',
            text: 'Diploma de la Pontificia Universidad Javeriana en el despacho.',
            zoom: 'img/diploma-especialista.webp',
            zoomAlt: 'Diploma de Especialista en Derecho de Familia de la Pontificia Universidad Javeriana',
          },
          {
            id: 'abogado',
            x: 78,
            y: 79,
            title: 'Título de Abogado',
            text: 'Diploma de la Pontificia Universidad Javeriana en el despacho.',
            zoom: 'img/diploma-abogado.webp',
            zoomAlt: 'Diploma de Abogado de la Pontificia Universidad Javeriana',
          },
        ]
      : []),
  ];
  return `<div class="explorer reveal" data-explorer>
    <figure class="explorer__frame">
      <img src="${u.asset('img/despacho.webp')}" width="1280" height="960" alt="El abogado Gilberto Álzate en su despacho, junto a su biblioteca jurídica y sus diplomas enmarcados" loading="lazy" decoding="async">
      ${pins
        .map(
          (p) => `<button class="pin" type="button" style="left:${p.x}%;top:${p.y}%" data-pin="${p.id}" data-title="${esc(p.title)}" data-text="${esc(p.text)}"${p.zoom ? ` data-zoom="${u.asset(p.zoom)}" data-zoom-alt="${esc(p.zoomAlt)}"` : ''} aria-label="Ver detalle: ${esc(p.title)}" aria-pressed="false"><span class="pin__dot"></span></button>`,
        )
        .join('')}
    </figure>
    <div class="explorer__panel" aria-live="polite">
      <p class="explorer__hint" data-hint>${icon('zoom', { size: 18 })} <span>Toque los puntos de la fotografía para conocer su despacho.</span></p>
      <div class="explorer__detail" data-detail hidden>
        <h4 data-detail-title></h4>
        <p data-detail-text></p>
        <button class="btn btn--text" type="button" data-zoom-btn hidden>${icon('zoom', { size: 18 })}<span>Ver diploma ampliado</span></button>
      </div>
    </div>
  </div>
  <dialog class="lightbox" data-lightbox aria-label="Imagen ampliada">
    <form method="dialog"><button class="lightbox__close" aria-label="Cerrar">${icon('close', { size: 24 })}</button></form>
    <img src="" alt="" data-lightbox-img>
  </dialog>`;
}

function profile() {
  const cfg = config.profile;
  const bio = cfg.bio
    ? `<p>${esc(cfg.bio)}</p>`
    : isClean
      ? ''
      : `<p class="slot">${pending('biografía verificada por el abogado')}</p>`;
  const photoSlot = isClean ? '' : `<p class="slot">${pending('fotografía profesional en alta resolución (la actual es de 1280×960)')}</p>`;
  const credentials = cfg.showCredentialsFromPhoto
    ? `<div class="formation reveal">
        <h3>Formación</h3>
        <ul class="formation__list">
          <li>${icon('check', { size: 18 })}<span><strong>Abogado</strong> — Pontificia Universidad Javeriana</span></li>
          <li>${icon('check', { size: 18 })}<span><strong>Especialista en Derecho de Familia</strong> — Pontificia Universidad Javeriana</span></li>
        </ul>
        ${isClean ? '' : `<p class="slot">${pending('validar formación con el abogado; añadir otra formación, experiencia y cargos autorizados')}</p>`}
      </div>`
    : isClean
      ? ''
      : `<div class="formation"><p class="slot">${pending('formación académica y credenciales autorizadas')}</p></div>`;
  return `<section class="section" id="abogado" aria-labelledby="abogado-title">
  <div class="container profile">
    <div class="profile__media">
      ${officeExplorer()}
      ${photoSlot}
    </div>
    <div class="profile__copy">
      <p class="eyebrow reveal">El abogado</p>
      <h2 id="abogado-title" class="reveal">Trayectoria que aporta perspectiva. Atención que pone a las personas en el centro</h2>
      <div class="since reveal" aria-label="Más de 25 años de trayectoria">
        <span class="since__label">Experiencia profesional</span>
        <span class="since__year">+25 años</span>
      </div>
      <p class="reveal"><strong>${esc(config.brand.lawyer)}</strong> ejerce en el ámbito jurídico con una trayectoria de más de 25 años. Esa experiencia se traduce en conocimiento profundo del ejercicio del derecho y una perspectiva que ayuda a comprender cada asunto en su contexto.</p>
      <p class="reveal">La experiencia no está reñida con una atención actual, accesible y cercana: escuchar con atención la situación de cada persona, explicarla con claridad y acompañar con criterio.</p>
      ${bio}
      ${credentials}
      <div class="reveal profile__cta">${waButton({ message: waMessages.profile, label: 'Escribir al doctor Gilberto' })}</div>
    </div>
  </div>
</section>`;
}

function how() {
  return `<section class="section section--ivory" id="como-funciona" aria-labelledby="como-title">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow">Cómo funciona la atención</p>
      <h2 id="como-title">Tres pasos para empezar</h2>
    </header>
    <ol class="steps">
      ${steps
        .map(
          (s, i) => `<li class="step reveal" style="--d:${i * 90}ms">
        <span class="step__num" aria-hidden="true">${i + 1}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </li>`,
        )
        .join('')}
    </ol>
    <p class="note reveal">${icon('shield', { size: 20 })}<span>El contacto inicial no implica aceptación automática del caso, representación legal ni garantía de resultados.</span></p>
  </div>
</section>`;
}

function faq() {
  return `<section class="section" id="preguntas-frecuentes" aria-labelledby="faq-title">
  <div class="container container--narrow">
    <header class="section__head reveal">
      <p class="eyebrow">Preguntas frecuentes</p>
      <h2 id="faq-title">Resolvamos sus primeras dudas</h2>
      <p class="section__lead">Respuestas generales e informativas. No reemplazan una evaluación jurídica de su caso particular.</p>
    </header>
    <div class="faq reveal">
      ${faqs
        .map(
          (f, i) => `<details class="faq__item" name="faq">
        <summary id="faq-q${i}"><span>${esc(f.q)}</span><span class="faq__icon" aria-hidden="true">${icon('plus', { size: 22 })}</span></summary>
        <div class="faq__answer" role="region" aria-labelledby="faq-q${i}">${f.a.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
      </details>`,
        )
        .join('')}
    </div>
    ${isClean || config.content.legalReviewDone ? '' : `<p class="slot">${pending('revisión y aprobación del abogado de estas respuestas')}</p>`}
    <div class="faq__cta reveal">${waButton({ message: waMessages.faq, label: '¿Otra pregunta? Escríbanos', variant: 'outline' })}</div>
  </div>
</section>`;
}

function articlesTeaser() {
  return `<section class="section section--ivory" id="orientacion" aria-labelledby="art-title">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow">Orientación jurídica</p>
      <h2 id="art-title">Conozca sus derechos</h2>
      <p class="section__lead">Una sección para comprender conceptos y procedimientos generales. Los artículos se publican después de su revisión jurídica.</p>
    </header>
    <ul class="topics">
      ${articles
        .map((a) => `<li class="topic reveal"><a href="${u.page('articulos')}${a.slug}/"><span>${esc(a.title)}</span></a></li>`)
        .join('')}
      ${comingSoon
        .map((a) => `<li class="topic topic--soon reveal"><span class="topic__title">${esc(a.title)}</span><small>Próximamente</small></li>`)
        .join('')}
    </ul>
    <p class="center reveal"><a class="btn btn--outline" href="${u.page('articulos')}"><span>Ver orientación jurídica</span>${icon('arrow', { size: 18 })}</a></p>
  </div>
</section>`;
}

function finalCta() {
  return `<section class="cta" id="contacto" aria-labelledby="cta-title">
  <img class="cta__mark" src="${u.asset('img/logo-mark-ivory.webp')}" alt="" width="360" height="275" loading="lazy" decoding="async" aria-hidden="true">
  <div class="container cta__inner reveal">
    <h2 id="cta-title">Cada situación tiene sus particularidades. Hablemos de la suya</h2>
    <p>Cuéntenos qué necesita y explore con Álzate - Abogados las posibilidades de recibir orientación jurídica para su situación.</p>
    ${waButton({ message: waMessages.cta, label: 'Contactar por WhatsApp', variant: 'light', size: 'lg' })}
    <p class="cta__small">Por favor no envíe documentos ni datos sensibles en el primer mensaje.</p>
  </div>
</section>`;
}

export function homePage() {
  return page({
    depth,
    title: 'Abogado de familia y derecho civil en Bogotá | Álzate - Abogados',
    description:
      'Asesoría jurídica en Bogotá y todo el país en derecho de familia y civil: divorcios, unión marital de hecho, sociedad conyugal y patrimonial, custodia, alimentos, paternidad y sucesiones. Atención personalizada.',
    path: '/',
    ld: homeJsonLd(),
    ld2: isProd && config.content.legalReviewDone ? faqJsonLd() : null,
    main: [hero(), values(), specializedArea(), areas(), profile(), how(), faq(), articlesTeaser(), finalCta()].join('\n'),
  });
}

export const faqJsonLd = () =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') },
    })),
  });
