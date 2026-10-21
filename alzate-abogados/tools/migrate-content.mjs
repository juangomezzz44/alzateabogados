// Migración única: exporta el contenido que estaba en código a content/ (editable desde el panel).
import { writeFileSync, mkdirSync } from 'node:fs';
import { config } from '../site.config.mjs';
import { familyServices, civilArea, commercialArea, faqs, articles } from '../src/content.mjs';

const n = (v) => (v == null ? '' : v);
const w = (p, o) => writeFileSync(p, JSON.stringify(o, null, 2) + '\n');

w('content/settings.json', {
  contact: {
    whatsappNumber: config.contact.whatsappNumber,
    email: n(config.contact.email),
    city: n(config.contact.city),
    coverage: n(config.contact.coverage),
    address: n(config.contact.address),
    hours: n(config.contact.hours),
    modality: n(config.contact.modality),
  },
  profile: {
    bio: n(config.profile.bio),
    professionalCard: n(config.profile.professionalCard),
    showCredentialsFromPhoto: config.profile.showCredentialsFromPhoto,
  },
  privacy: { ...config.privacy },
  site: { url: n(config.site.url) },
  content: { sucesiones: config.content.sucesiones, legalReviewDone: config.content.legalReviewDone },
});
w('content/servicios.json', {
  familia: familyServices,
  civil: civilArea,
  comercial: commercialArea,
});
w('content/faq.json', { items: faqs });

mkdirSync('content/articulos', { recursive: true });
const y = (s) => JSON.stringify(s); // JSON es YAML válido para cadenas
for (const a of articles) {
  const fm = [
    '---',
    `title: ${y(a.title)}`,
    `description: ${y(a.description)}`,
    'date: ',
    'published: false',
    'comingSoon: true',
    `topic: ${y(a.topic)}`,
    'outline:',
    ...a.outline.map((o) => `  - ${y(o)}`),
    '---',
    '',
  ].join('\n');
  writeFileSync(`content/articulos/${a.slug}.md`, fm);
}
console.log('content/ generado');
