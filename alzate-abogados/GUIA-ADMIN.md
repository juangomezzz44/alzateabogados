# Guía de puesta en marcha del panel de administración (para ti)

Qué vas a lograr: que el abogado entre a `https://TU-SITIO/admin`, cambie textos, datos de contacto y artículos, y que el sitio se actualice solo.

Cómo funciona: el panel guarda los cambios en **GitHub** y **Netlify** vuelve a publicar el sitio solo (1–2 minutos). Hoy subes la carpeta a mano; con este sistema Netlify lee el proyecto desde GitHub.

## Parte 1 — Subir el proyecto a GitHub (una sola vez)
1. En GitHub crea un repositorio **privado**, por ejemplo `alzate-abogados` (sin README).
2. Sube TODO el contenido de la carpeta del proyecto (no la carpeta `dist`). Con Git:
   ```bash
   cd alzate-abogados
   git init && git add -A && git commit -m "Sitio Álzate - Abogados"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/alzate-abogados.git
   git push -u origin main
   ```
   (o arrastra los archivos en "uploading an existing file" desde la web de GitHub).
3. Abre `public/admin/config.yml` y cambia `repo: USUARIO/REPOSITORIO` por `repo: TU_USUARIO/alzate-abogados`. Guarda y sube el cambio.

## Parte 2 — Conectar Netlify al repositorio
1. En Netlify: **Add new site → Import an existing project → GitHub** y elige el repositorio. Netlify toma sola la configuración de `netlify.toml` (comando `node build.mjs`, carpeta `dist`).
2. Cuando termine, abre el sitio: debe verse igual que ahora. Si ya tenías un sitio creado por arrastre, crea este nuevo y luego mueve el dominio.

## Parte 3 — Permitir el inicio de sesión (opción A: GitHub)
Es la opción activa por defecto. Quien edite necesita una cuenta de GitHub con acceso al repositorio.
1. En GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Homepage URL: la dirección de tu sitio en Netlify.
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Copia el **Client ID** y genera el **Client Secret**.
2. En Netlify: **Site configuration → Access & security → OAuth → Install provider → GitHub** y pega el Client ID y el Secret.
3. Agrega al abogado como colaborador del repositorio (Settings → Collaborators) con permiso de escritura. Él necesita crear una cuenta gratuita de GitHub con su correo.
4. Entra a `https://TU-SITIO/admin` → "Login with GitHub".

## Opción B: que el abogado entre con correo y contraseña (sin GitHub)
Recomendada si no quieres que tenga cuenta de GitHub. Usa **Decap Turbo**, el servicio oficial de Decap CMS:
1. Crea una cuenta en https://decapcms.org (Turbo), conecta GitHub (instalar la app de Turbo en tu repositorio) y crea un "site" con la URL de tu panel (`https://TU-SITIO/admin`).
2. Copia el **Site ID**. En `public/admin/config.yml` comenta el bloque `backend: name: github` y activa el bloque `turbo-github` con ese ID.
3. En Turbo, en la pestaña **Overview** del sitio, agrega la dirección del panel (`https://TU-SITIO/admin/`) en "Admin interface URLs". Sin este paso el inicio de sesión no funciona.
4. Invita al abogado por correo desde Turbo; él entra con correo y contraseña (sin cuenta de GitHub).

Límites verificados en la documentación de Turbo: el plan gratis incluye **un sitio y un usuario**; el cobro es por usuario. No pude confirmar los precios de los planes de pago: míralos en Turbo antes de decidir. Con el plan gratis solo cabe una persona con acceso: si el abogado es el único usuario, tú puedes seguir haciendo cambios directamente en GitHub cuando haga falta.
Alternativa gratuita (no verificada por mí): DecapBridge, que dice permitir hasta 10 colaboradores con correo y contraseña. Revisa su documentación antes de depender de él.

## Pasar a producción (cuando tengan dominio)
1. En el panel: **Datos del sitio → Contacto, perfil y datos legales**: escribe la Dirección del sitio (dominio), marca "El abogado validó esta política" y "El abogado aprobó las preguntas frecuentes y los textos".
2. En `netlify.toml` cambia `ALZATE_MODE = "preview"` por `"production"` y sube el cambio.
3. Si falta algo obligatorio, la publicación se detiene y el sitio sigue como estaba. En Netlify → Deploys verás el motivo.

## Qué puede salir mal
- **Un cambio no aparece:** revisa Netlify → Deploys. Si el último está en rojo, el motivo está en el registro (por ejemplo, número de WhatsApp mal escrito). El sitio anterior sigue publicado.
- **El panel no carga:** necesita internet (carga Decap CMS desde jsDelivr, versión fija 3.17.1).
- Quien tenga acceso al repositorio puede cambiar todo el contenido del sitio. Da acceso solo a personas de confianza.
