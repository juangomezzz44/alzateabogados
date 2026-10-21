# Datos y revisiones pendientes antes de publicar

Leyenda: **[Desarrollo]** necesario para seguir construyendo · **[Publicar]** indispensable para publicar · **[Recomendado]**

## Datos
| Dato | Nivel | Dónde se configura |
|---|---|---|
| Número oficial de WhatsApp (57 + 10 dígitos) | **[Publicar]** | `contact.whatsappNumber` |
| Dominio / URL final del sitio | **[Publicar]** | `site.url` (canonical, Open Graph, sitemap) |
| Responsable del tratamiento, canal de consultas y fecha de la política de datos | **[Publicar]** | `privacy.*` |
| Validación de la política por el abogado / profesional competente | **[Publicar]** | `privacy.validatedByLawyer` |
| Aprobación del abogado de FAQ y textos de servicios | **[Publicar]** | `content.legalReviewDone` |
| Confirmar que los títulos visibles en los diplomas (Abogado; Especialista en Derecho de Familia, Pontificia Universidad Javeriana) se pueden publicar | **[Publicar]** | `profile.showCredentialsFromPhoto` (poner `false` para ocultarlos) |
| Modalidad de atención (presencial / virtual). Ciudad: Bogotá, cobertura nacional (confirmado) | [Recomendado] | `contact.modality` |
| Correo, dirección, horarios | [Recomendado] | `contact.*` |
| Biografía verificada | [Recomendado] | `profile.bio` |
| Tarjeta profesional (si desea publicarla) | [Recomendado] | `profile.professionalCard` |
| Fotografía profesional en alta resolución | [Recomendado] | reemplazar fuente en `tools/prepare-assets.py` |
| Asuntos civiles que atiende | [Recomendado] | tarjeta "Derecho civil" en `src/content.mjs` |
| Alcance de sociedades comerciales | [Recomendado] | tarjeta en `src/content.mjs` |
| Confirmar que "Sucesiones" se ofrece y cómo clasificarlo | **[Publicar]** | `familyServices` en `src/content.mjs` |
| Condiciones de consulta y honorarios | [Recomendado] | FAQ "¿Cuánto cuesta…?" |
| Artículos reales con fecha, fuentes oficiales y revisión | [Recomendado] | panel /admin → Artículos jurídicos |

## Revisión jurídica
Las respuestas de las preguntas frecuentes son generales y no citan normas, plazos ni jurisprudencia. Deben ser leídas y aprobadas por el abogado. La referencia a la Ley 1581 de 2012 en la política de datos es solo orientativa y debe verificarse.

## Panel de administración
| Pendiente | Nivel |
|---|---|
| Crear el repositorio en GitHub y poner el nombre real en `public/admin/config.yml` (`repo:`) | **[Para activar el panel]** |
| Conectar Netlify al repositorio (ver `GUIA-ADMIN.md`) | **[Para activar el panel]** |
| Decidir cómo entra el abogado: GitHub (opción A) o Decap Turbo con correo y contraseña (opción B, gratis solo 1 usuario) | **[Para activar el panel]** |
| Cambiar `ALZATE_MODE` a `production` en `netlify.toml` al publicar | **[Publicar]** |
