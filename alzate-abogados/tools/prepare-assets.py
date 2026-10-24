import sys
from PIL import Image, ImageDraw, ImageChops
import numpy as np

UP = "/mnt/user-data/uploads/"
OUT = "public/assets/img/"
logo = Image.open(UP + "Emblema_jurídico_Álzate_-_Abogados.png").convert("RGB")
photo = Image.open(UP + "WhatsApp_Image_2026-10-12_at_6_56_03_PM.jpeg").convert("RGB")

BG = np.array([14, 45, 31], float)
FG = np.array([247, 245, 239], float)

# --- Logo: se extrae el canal alfa del archivo oficial (misma forma, sin redibujar) ---
arr = np.asarray(logo).astype(float)
lum = arr.mean(axis=2)
a = np.clip((lum - BG.mean()) / (FG.mean() - BG.mean()), 0, 1)
a = np.where(a < 0.08, 0, a)  # limpia ruido JPEG residual del fondo

def recolor(alpha, rgb):
    h, w = alpha.shape
    out = np.zeros((h, w, 4), np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = rgb
    out[..., 3] = (alpha * 255).astype(np.uint8)
    return Image.fromarray(out, "RGBA")

def crop_bbox(img, box, pad=8):
    x0, y0, x1, y1 = box
    return img.crop((x0 - pad, y0 - pad, x1 + pad, y1 + pad))

def bbox_of(alpha, box):
    x0, y0, x1, y1 = box
    sub = alpha[y0:y1, x0:x1] > 0.25
    ys, xs = np.where(sub)
    return (x0 + xs.min(), y0 + ys.min(), x0 + xs.max(), y0 + ys.max())

mark_box = bbox_of(a, (300, 250, 960, 720))      # monograma GA
full_box = bbox_of(a, (100, 250, 1150, 960))     # monograma + nombre + descriptor
print("mark", mark_box, "full", full_box)

for name, box, width in (("mark", mark_box, 360), ("full", full_box, 900)):
    for cname, rgb in (("ivory", (247, 245, 239)), ("green", (14, 45, 31))):
        im = crop_bbox(recolor(a, rgb), box)
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
        im.save(f"{OUT}logo-{name}-{cname}.png", optimize=True)
        im.save(f"{OUT}logo-{name}-{cname}.webp", quality=92, method=6)

# Logo oficial completo, sin modificar (para OG / respaldo)
logo.resize((900, 900), Image.LANCZOS).save(OUT + "logo-oficial.webp", quality=90, method=6)
logo.resize((630, 630), Image.LANCZOS).save(OUT + "logo-oficial-630.png", optimize=True)

# --- Favicon / íconos: monograma sobre el verde de la marca ---
mark = crop_bbox(recolor(a, (247, 245, 239)), mark_box, 0)
def icon(size, pad_ratio=0.2):
    canvas = Image.new("RGB", (size, size), tuple(int(v) for v in BG))
    inner = int(size * (1 - 2 * pad_ratio))
    m = mark.copy(); m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return canvas
icon(512).save(OUT + "icon-512.png", optimize=True)
icon(192).save(OUT + "icon-192.png", optimize=True)
icon(180, 0.18).save(OUT + "apple-touch-icon.png", optimize=True)
icon(32, 0.1).save("public/favicon-32.png", optimize=True)
icon(64, 0.1).save("public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

# --- Fotografía del abogado: recortes de la misma foto (sin retoque de la persona) ---
def save(img, name, q=84, size=None):
    if size: img = img.resize(size, Image.LANCZOS)
    img.save(OUT + name, quality=q, method=6)
    print(name, img.size)

# Retrato para el arco del hero
save(photo.crop((137, 130, 712, 849)), "gilberto-retrato.webp", 88)
# Despacho completo (explorador interactivo)
save(photo, "despacho.webp", 84)
# Diplomas (detalle)
save(photo.crop((712, 92, 1280, 560)), "diploma-especialista.webp", 88)
save(photo.crop((748, 578, 1258, 938)), "diploma-abogado.webp", 88)
# Avatar circular (botón flotante)
save(photo.crop((385, 285, 615, 515)), "gilberto-avatar.webp", 86, (176, 176))

# --- Imagen Open Graph 1200x630 ---
og = Image.new("RGB", (1200, 630), tuple(int(v) for v in BG))
lg = logo.resize((630, 630), Image.LANCZOS)
og.paste(lg, (10, 0))
# retrato en arco
pw, ph = 380, 500
src = photo.crop((137, 130, 712, 849))
scale = max(pw / src.width, ph / src.height)
src = src.resize((round(src.width * scale), round(src.height * scale)), Image.LANCZOS)
ox = (src.width - pw) // 2
pt = src.crop((ox, 0, ox + pw, ph))
mask = Image.new("L", (pw, ph), 0)
d = ImageDraw.Draw(mask)
d.rounded_rectangle((0, 0, pw, ph), radius=0, fill=255)
d.rectangle((0, 0, pw, ph), fill=0)
d.pieslice((0, 0, pw, pw), 180, 360, fill=255)
d.rectangle((0, pw // 2, pw, ph), fill=255)
ring = Image.new("RGB", (pw + 16, ph + 16), (247, 245, 239))
rmask = Image.new("L", (pw + 16, ph + 16), 0)
d2 = ImageDraw.Draw(rmask)
d2.pieslice((0, 0, pw + 16, pw + 16), 180, 360, fill=255)
d2.rectangle((0, (pw + 16) // 2, pw + 16, ph + 16), fill=255)
og.paste(ring, (700, 56), rmask)
og.paste(pt, (708, 64), mask)
og.save(OUT + "og-image.jpg", quality=88, optimize=True)
print("ok")

# --- Recortes adicionales de la misma fotografía (detalles reales del despacho) ---
save(photo.crop((0, 395, 300, 960)), "detalle-biblioteca.webp", 90)
save(photo.crop((0, 0, 335, 400)), "detalle-banderas.webp", 90)
