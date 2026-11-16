/* MAJORGLORY WEB CONTROL — advisory GitHub Pages suspension UI.
 * This is NOT access security: HTML, assets and direct URLs remain public.
 */
(() => {
  'use strict';
  const config = window.MAJORGLORY_CONFIG;
  if (!config) { console.warn('MAJORGLORY config missing'); return; }
  const endpoint = `${config.supabaseUrl}/rest/v1/rpc/afrifesto_public_status`;
  const key = config.supabasePublishableKey;
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const cover = document.createElement('div');
  cover.id = 'major-glory-status-cover';
  cover.setAttribute('role', 'status');
  cover.setAttribute('aria-live', 'polite');
  cover.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#101c19;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui,Arial,sans-serif;text-align:center';
  cover.innerHTML = '<div style="max-width:520px"><div style="font-size:12px;letter-spacing:3px;color:#a8bdb4;font-weight:700">AFRIFESTO BBQ & GRILL</div><h1 style="font-size:clamp(28px,5vw,44px);line-height:1.1;margin:18px 0">Checking website availability</h1><p style="color:#c2d0ca;line-height:1.7">Please wait a moment.</p></div>';
  document.documentElement.appendChild(cover);
  const message = (title, body, retry) => {
    cover.innerHTML = '';
    const inner = document.createElement('div'); inner.style.maxWidth='520px';
    const brand = document.createElement('div'); brand.textContent='AFRIFESTO BBQ & GRILL'; brand.style.cssText='font-size:12px;letter-spacing:3px;color:#a8bdb4;font-weight:700';
    const h = document.createElement('h1'); h.textContent=title; h.style.cssText='font-size:clamp(28px,5vw,44px);line-height:1.1;margin:18px 0';
    const p = document.createElement('p'); p.textContent=body; p.style.cssText='color:#c2d0ca;line-height:1.7';
    inner.append(brand,h,p);
    if(retry){const b=document.createElement('button'); b.textContent='Try again'; b.style.cssText='background:#b9e44b;color:#14220b;border:0;border-radius:8px;padding:13px 22px;cursor:pointer;font-weight:700;margin-top:16px'; b.onclick=check;inner.append(b);}
    cover.append(inner);cover.style.display='flex';
  };
  let running=false;
  async function check(){
    if(running)return;running=true;
    try {
      const controller = new AbortController(); const timer=setTimeout(()=>controller.abort(),7000);
      let response;
      try { response=await fetch(endpoint,{method:'POST',headers:{'apikey':key,'Content-Type':'application/json'},body:'{}',cache:'no-store',signal:controller.signal}); }
      finally {clearTimeout(timer);}
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const data=await response.json();
      if(data.status==='active'){cover.style.display='none';}
      else if(data.status==='suspended'){message('Website temporarily unavailable','This website is temporarily unavailable. Please contact Afrifesto BBQ & Grill for assistance.',false);}
      else {message('Website setup in progress','This website is not yet connected to its management record.',true);}
    } catch(err) { console.warn('Availability check failed:',err); message('Unable to verify availability','Please check your connection and try again.',true); }
    finally {running=false;}
  }
  check();
  // Poll while the page is open, so a resumed site becomes visible without reloading.
  setInterval(check,60000);
})();
