async page => {
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('http://127.0.0.1:3000');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('#products').scrollIntoViewIfNeeded();await page.waitForTimeout(2000);
 await page.locator('#products').screenshot({path:'output/playwright/cad-products-desktop.png'});
 await page.locator('#use-cases').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
 await page.locator('#use-cases').screenshot({path:'output/playwright/cad-booth-pair.png'});
 await page.setViewportSize({width:390,height:844});
 await page.locator('#products').screenshot({path:'output/playwright/cad-products-mobile.png'});
 await page.goto('http://127.0.0.1:3000/products/event-booth');
 if(!await page.locator('img[src="/landing/event-booth-render.webp"]').count())throw Error('Event image missing');
 await page.goto('http://127.0.0.1:3000/products/static-booth');
 if(!await page.locator('img[src="/landing/automat-booth-render.webp"]').count())throw Error('Automat image missing');
}
