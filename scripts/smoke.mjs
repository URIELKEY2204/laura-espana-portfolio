import {chromium} from 'playwright';
import fs from 'node:fs';
const base=process.env.SITE_URL || 'http://127.0.0.1:4187';
const cands=['/home/urielk/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome','/home/urielk/.cache/ms-playwright/chromium-1248/chrome-linux/chrome','/home/urielk/.cache/ms-playwright/chromium_headless_shell-1255/chrome-linux/headless_shell'];
const executablePath=cands.find(p=>fs.existsSync(p));
console.log('BROWSER',executablePath||chromium.executablePath());
const browser=await chromium.launch({headless:true,executablePath:executablePath||undefined,args:['--no-sandbox']});
const results=[],errors=[];
for(const width of [375,768,1280]){
 const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(width+' '+e.message));
 await page.goto(base+'/',{waitUntil:'networkidle',timeout:20000});
 const home=await page.evaluate(()=>({vw:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth,hero:Math.round(document.querySelector('.hero-visual')?.getBoundingClientRect().width??0),fontCalls:performance.getEntriesByType('resource').filter(r=>/fonts.googleapis.com|fonts.gstatic.com/.test(r.name)).length,portrait:!!document.querySelector('.hero-portrait')?.naturalWidth,form:!!document.querySelector('form[name="laura-consultas-audiovisuales"]')}));
 if(width===375){await page.locator('.mobile-menu summary').click();home.menu=await page.getByRole('link',{name:'Portafolio'}).count()>0;await page.locator('.mobile-menu summary').click();}
 await page.goto(base+'/portafolio/',{waitUntil:'networkidle',timeout:20000});
 const portfolio=await page.evaluate(()=>({vw:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth,portrait:Math.round(document.querySelector('.portfolio-intro-portrait')?.getBoundingClientRect().width??0),food:document.querySelectorAll('.food-tile').length}));
 await page.locator('.food-filter').filter({hasText:'Café Roma'}).click();const roma=await page.locator('.food-tile').count();
 await page.locator('.food-filter').filter({hasText:"Lali's"}).click();const lali=await page.locator('.food-tile').count();
 await page.locator('.food-filter').filter({hasText:'Todos'}).click();
 await page.locator('.food-tile').first().click();const opened=await page.locator('dialog.food-lightbox').evaluate(e=>e.open);
 await page.keyboard.press('Escape');const closed=await page.locator('dialog.food-lightbox').evaluate(e=>!e.open);
 results.push({width,home,portfolio,roma,lali,lightbox:{opened,closed}});
 await page.close();
}
await browser.close();
console.log('RESULTS',JSON.stringify(results,null,2));
console.log('ERRORS',JSON.stringify(errors));
const ok=errors.length===0&&results.every(x=>x.home.sw<=x.width+1&&x.portfolio.sw<=x.width+1&&x.portfolio.food===25&&x.roma===6&&x.lali===19&&x.lightbox.opened&&x.lightbox.closed&&x.home.form&&x.home.fontCalls===0);
console.log('SMOKE_STATUS',ok?'PASS':'FAIL');
process.exit(ok?0:2);
