import { faqs, familyServices, civilArea, commercialArea } from '../src/content.mjs';
import { writeFileSync } from 'node:fs';
writeFileSync(process.argv[2], JSON.stringify({ faqs, familyServices, civilArea, commercialArea }));
