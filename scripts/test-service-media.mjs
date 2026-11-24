import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const base=process.env.SITE_URL||'http://127.0.0.1:41983';
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--no-proxy-server']});
try{
for(const width of [375,1280]){
 const page=await browser.newPage({viewport:{width,height:850},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/servicios/fotografia-gastronomica/',{waitUntil:'networkidle'});
 const slide=page.locator('.food-hero-slide img');
 const seen=new Set();
 for(let i=0;i<5;i++){
   await page.waitForFunction(()=>document.querySelector('.food-hero-slide img')?.naturalWidth>0);
   seen.add(await slide.getAttribute('src'));
   await page.getByRole('button',{name:'Fotografía siguiente'}).click();
 }
 assert.equal(seen.size,5);
 assert.equal(await slide.getAttribute('src'),'/images/gastronomia/L019.webp');
 await page.getByRole('button',{name:'Fotografía anterior'}).click();
 assert.equal(await slide.getAttribute('src'),'/images/gastronomia/L001.webp');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
 for(const path of ['video-comercial','edicion-video']){
   await page.goto(base+'/servicios/'+path+'/',{waitUntil:'domcontentloaded'});
   const cards=page.locator('.service-project-media');assert.equal(await cards.count(),3);
   for(let i=0;i<3;i++){
     const card=cards.nth(i);
     await card.getByRole('button',{name:/Reproducir video completo/}).click();
     const video=card.locator('video.project-full-video');
     await video.evaluate(v=>{v.muted=true;return v.play()});
     await page.waitForFunction(v=>v.currentTime>0&&v.readyState>=2,await video.elementHandle(),{timeout:15000});
     await card.getByRole('button',{name:/Cerrar video completo/}).click();
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
 }
 assert.deepEqual(errors,[]);
 console.log('MEDIA_PASS',width,'5 carousel images; 6 videos played; no overflow or JS errors');
 await page.close();
}
}finally{await browser.close()}
