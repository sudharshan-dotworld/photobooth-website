async page => {
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:3000/features');
 const headings=page.locator('.complete-features h4');if(await headings.count()!==19)throw Error('Feature coverage incomplete');
 for(const title of ['Works online & offline','Configurable audio','Photo gallery','Flexible camera setup','QR digital copies','Dynamic home screen','Built-in photo editing','Ready when they are','Two screens. Two jobs.','Fun mode & ID mode','Prints in their hands','Digital sharing','Your location, your identity','One connected platform','Brand every experience','Gallery management','Device management','Room to grow','Everyday controls'])if(!await page.getByRole('heading',{name:title,exact:true}).count())throw Error('Missing '+title);
 for(const category of await page.locator('.feature-category').all()){await category.scrollIntoViewIfNeeded();await page.waitForTimeout(500);}
 await page.locator('.feature-category').nth(0).screenshot({path:'output/playwright/features-complete-capture.png'});
 await page.locator('.feature-category').nth(1).screenshot({path:'output/playwright/features-complete-hardware.png'});
 await page.locator('.feature-category').nth(2).screenshot({path:'output/playwright/features-complete-management.png'});
 await page.setViewportSize({width:390,height:844});await page.locator('.feature-category').nth(1).screenshot({path:'output/playwright/features-complete-mobile.png'});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
 await page.goto('http://127.0.0.1:3000');if(await page.locator('.complete-features h4').count()!==19)throw Error('Landing features missing');
}
