import re, urllib.parse, sys
from playwright.sync_api import sync_playwright
base="http://localhost:4174"
ok=True
def check(c,msg):
    global ok
    print(("PASS " if c else "FAIL ")+msg); ok = ok and c
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_context(viewport={"width":1440,"height":900}).new_page()
    errs=[]; pg.on("console",lambda m: errs.append(m.text) if m.type=="error" else None); pg.on("pageerror",lambda e: errs.append(str(e)))
    pg.goto(base+"/",wait_until="networkidle")
    # WhatsApp
    hrefs=pg.eval_on_selector_all("a[data-wa]","els=>els.map(e=>e.href)")
    check(len(hrefs)>=17, f"{len(hrefs)} enlaces de WhatsApp")
    check(all(h.startswith("https://wa.me/573000000000?text=") for h in hrefs),"todos usan wa.me con el número único de config")
    msgs={urllib.parse.unquote(h.split("text=")[1]) for h in hrefs}
    check(any(m.startswith("Hola, doctor Gilberto. Estoy interesado(a) en recibir información sobre una consulta jurídica") for m in msgs),"mensaje general del prompt presente")
    check(len(msgs)>=10,f"{len(msgs)} mensajes distintos (contextuales)")
    # secciones
    for sid in ["abogado","areas","contacto","preguntas-frecuentes","como-funciona"]:
        check(pg.locator(f"#{sid}").count()==1,f"ancla #{sid}")
    # nav anchors destino
    for h in pg.eval_on_selector_all(".nav__list a:not(.btn)","els=>els.map(e=>e.getAttribute('href'))"):
        print("   nav ->",h)
    # explorador
    pg.locator("#abogado").scroll_into_view_if_needed()
    pg.locator('.pin[data-pin="especialista"]').click()
    check(pg.locator("[data-detail]").is_visible(),"pin muestra detalle")
    pg.locator("[data-zoom-btn]").click()
    check(pg.locator("dialog[open]").count()==1,"lightbox de diploma abre")
    pg.keyboard.press("Escape"); check(pg.locator("dialog[open]").count()==0,"Esc cierra lightbox")
    # FAQ
    pg.locator("#faq-q0").click(); check(pg.locator("details.faq__item[open]").count()==1,"acordeón abre")
    pg.locator("#faq-q1").click(); check(pg.locator("details.faq__item[open]").count()==1,"acordeón exclusivo")
    # flotante
    pg.evaluate("window.scrollTo(0,1200)"); pg.wait_for_timeout(500)
    check(pg.locator(".wa-float.is-visible").count()==1,"WhatsApp flotante aparece al desplazarse")
    # imágenes
    broken=pg.evaluate("[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)")
    check(not broken,f"imágenes rotas: {broken}")
    check(not errs,f"errores de consola: {errs}")
    # metadatos
    check(pg.locator('link[rel=canonical]').get_attribute("href")=="https://ejemplo.invalid/","canonical")
    check(pg.locator('meta[property="og:image"]').count()==1,"og:image")
    check("LegalService" in pg.locator('script[type="application/ld+json"]').inner_text(),"JSON-LD LegalService")
    ld=pg.locator('script[type="application/ld+json"]').inner_text()
    check(not re.search(r"telephone|address|aggregateRating|review",ld),"JSON-LD sin datos inventados")
    # móvil
    m=b.new_context(viewport={"width":390,"height":844},is_mobile=True,has_touch=True).new_page()
    m.goto(base+"/",wait_until="networkidle")
    tg=m.locator(".nav__toggle"); check(tg.is_visible(),"botón de menú móvil visible")
    check(m.locator(".nav__list").is_hidden(),"menú cerrado inicialmente")
    tg.click(); check(m.locator(".nav__list").is_visible() and tg.get_attribute("aria-expanded")=="true","menú abre (aria-expanded=true)")
    check(m.locator(".nav__cta .btn").is_visible(),"botón WhatsApp dentro del menú móvil")
    m.keyboard.press("Escape"); check(m.locator(".nav__list").is_hidden(),"Esc cierra el menú")
    tg.click(); m.locator('.nav__list a[href$="#areas"]').click(); m.wait_for_timeout(400)
    check(m.locator(".nav__list").is_hidden(),"navegar cierra el menú")
    sw=m.evaluate("document.documentElement.scrollWidth"); check(sw<=390,f"sin scroll horizontal en móvil ({sw})")
    small=m.evaluate("[...document.querySelectorAll('a.btn,button,.card__link,.nav__list a,.pin,summary')].filter(e=>e.offsetParent&&(e.getBoundingClientRect().height<43)).map(e=>e.className+':'+Math.round(e.getBoundingClientRect().height))")
    check(not small,f"objetivos táctiles <44px: {small}")
    # subpáginas y enlaces internos
    seen=set(); queue=["/"]; bad=[]
    ctx=b.new_context(); q=ctx.new_page()
    while queue:
        u=queue.pop()
        if u in seen: continue
        seen.add(u)
        r=q.goto(base+u,wait_until="domcontentloaded")
        if r.status!=200: bad.append((u,r.status)); continue
        for h in q.eval_on_selector_all("a[href]","els=>els.map(e=>e.getAttribute('href'))"):
            if h.startswith(("http","mailto","#")) : continue
            full=urllib.parse.urljoin(base+u,h).replace(base,"").split("#")[0]
            if full not in seen: queue.append(full)
    check(not bad,f"{len(seen)} páginas rastreadas, enlaces rotos: {bad}")
    print(sorted(seen))
    b.close()
print("TODO OK" if ok else "HAY FALLOS")
