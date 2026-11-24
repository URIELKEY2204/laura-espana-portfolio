import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const base=process.argv[2]||'http://127.0.0.1:41997';
const b=await chromium.launch({headless:true,args:['--no-sandbox','--no-proxy-server']});
try{
for(const [width,touch] of [[320,true],[390,true],[768,false],[1440,false]]){
 const p=await b.newPage({viewport:{width,height:900},hasTouch:touch,isMobile:touch,reducedMotion:touch?'reduce':'no-preference'});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 const r=await p.goto(base+'/',{waitUntil:'networkidle',timeout:25000});assert.equal(r.status(),200);
 assert.equal(await p.locator('.service-preview-card').count(),4);assert.equal(await p.locator('.service-banner a').count(),4);
 assert.equal(await p.locator('.camera-sound-toggle').getAttribute('aria-pressed'),'false');
 await p.locator('.camera-sound-toggle').click();assert.equal(await p.locator('.camera-sound-toggle').getAttribute('aria-pressed'),'true');
 await p.locator('.camera-sound-toggle').click();assert.equal(await p.locator('.camera-sound-toggle').getAttribute('aria-pressed'),'false');
 for(const card of await p.locator('.service-preview-card').all()){
  await card.scrollIntoViewIfNeeded();
  const media=card.locator('.service-preview-media');const count=await card.locator('.service-preview-image').count();
  for(const img of await card.locator('.service-preview-image').all())await img.evaluate(i=>i.decode());
  const initial=await card.locator('.service-frame-caption').innerText();
  if(touch){await card.locator('.service-preview-next').click();assert.notEqual(await card.locator('.service-frame-caption').innerText(),initial);}
  else {const box=await media.boundingBox();await p.mouse.move(box.x+box.width*.02,box.y+box.height*.5);await p.mouse.move(box.x+box.width*.97,box.y+box.height*.5);await p.waitForFunction(({id,count})=>document.querySelector('#'+id+' .service-frame-caption').textContent.includes(String(count).padStart(2,'0')+' / '+String(count).padStart(2,'0')),{id:await card.getAttribute('id'),count});}
 }
 if(!touch){const media=p.locator('#servicio-video .service-preview-media');await media.scrollIntoViewIfNeeded();const box=await media.boundingBox();await p.mouse.move(box.x+box.width*.08,box.y+box.height*.5);await p.waitForFunction(()=>{const v=document.querySelector('#servicio-video video');return v&&v.readyState>=2&&!v.paused&&v.currentTime>0;});await p.mouse.move(0,0);await p.waitForFunction(()=>!document.querySelector('#servicio-video video'));}
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'overflow '+width);
 const links=await p.locator('.service-open').evaluateAll(es=>es.map(e=>e.href));
 for(const href of links){const res=await p.request.get(href,{timeout:15000});assert.equal(res.status(),200);}
 assert.deepEqual(errors,[]);
 console.log('PASS',width,touch?'touch / reduced motion':'hover / video playback','four galleries, sound toggle, links, no overflow');
 await p.close();
}
}finally{await b.close();}
