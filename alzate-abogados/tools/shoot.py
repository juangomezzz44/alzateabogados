import sys
from playwright.sync_api import sync_playwright
S="/tmp/claude-0/-home-claude/df097b86-e9f1-5ff7-af1c-c42f7eec7e27/scratchpad/"
base=sys.argv[1] if len(sys.argv)>1 else "http://localhost:4173"
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,vp,mob in (("desk",{"width":1440,"height":900},False),("mob",{"width":390,"height":844},True)):
        ctx=b.new_context(viewport=vp,device_scale_factor=1,is_mobile=mob,has_touch=mob,reduced_motion="reduce")
        pg=ctx.new_page()
        errs=[]
        pg.on("console",lambda m: errs.append(m.text) if m.type in("error","warning") else None)
        pg.on("requestfailed",lambda r: errs.append("FAILED "+r.url))
        pg.on("response",lambda r: errs.append(f"{r.status} {r.url}") if r.status>=400 else None)
        pg.goto(base+"/",wait_until="networkidle")
        H=pg.evaluate("document.documentElement.scrollHeight")
        for y in range(0,H,500): pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(60)
        pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(300)
        pg.screenshot(path=S+f"{name}-fold.png")
        pg.screenshot(path=S+f"{name}-full.png",full_page=True)
        h=pg.evaluate("document.documentElement.scrollHeight"); sw=pg.evaluate("document.documentElement.scrollWidth")
        print(name,"height",h,"scrollWidth",sw,"vw",vp["width"],"errors",errs)
        ctx.close()
    b.close()
