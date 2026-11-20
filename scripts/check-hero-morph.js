async page => {
 await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:3000');
 await page.locator('.particle-art canvas').waitFor({timeout:60000});
 await page.getByRole('button',{name:'Replay formation'}).click();
 await page.waitForTimeout(10300);await page.locator('.particle-hero').screenshot({path:'output/playwright/morph-automat.png'});
 await page.waitForTimeout(4500);await page.locator('.particle-hero').screenshot({path:'output/playwright/morph-event.png'});
 await page.waitForTimeout(6000);await page.locator('.particle-hero').screenshot({path:'output/playwright/morph-return.png'});
}
