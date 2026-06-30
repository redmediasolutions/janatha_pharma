import { chromium } from 'playwright';
const base = 'http://localhost:4326';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });

await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'shot-home2.png', fullPage: true });

await page.goto(base + '/all-products/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: 'shot-products2.png', fullPage: true });

console.log('errors:', JSON.stringify(errors));
await browser.close();
