async page => {
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:3000');await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('.particle-copy').getByRole('button',{name:'Enquire about a booth'}).click();
 await page.getByRole('dialog').waitFor();
 if(await page.getByRole('dialog').getByRole('link').count()!==2)throw Error('Expected two booth choices');
 await page.getByRole('dialog').screenshot({path:'output/playwright/booth-enquiry-chooser.png'});
 await page.getByRole('dialog').getByRole('link',{name:/Automat Booth/}).click();
 await page.waitForURL('**/contact?interest=Automat%20Booth');
 if(await page.locator('select[name=interest]').inputValue()!=='Automat Booth')throw Error('Automat selection lost');
 await page.goto('http://127.0.0.1:3000');await page.locator('.particle-copy').getByRole('button',{name:'Download software'}).click();
 if(!await page.getByRole('dialog').getByText('Installer coming soon',{exact:true}).isVisible())throw Error('Mock download missing');
 await page.keyboard.press('Escape');if(await page.getByRole('dialog').isVisible())throw Error('Escape did not close');
 await page.locator('.particle-hero').screenshot({path:'output/playwright/hero-with-actions.png'});
 await page.locator('#software').getByRole('button',{name:'Enquire about a booth'}).click();
 await page.getByRole('dialog').getByRole('link',{name:/Event Booth/}).click();
 await page.waitForURL('**/contact?interest=Event%20Booth');
 if(await page.locator('select[name=interest]').inputValue()!=='Event Booth')throw Error('Event selection lost');
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:3000');
 await page.locator('.particle-copy').getByRole('button',{name:'Enquire about a booth'}).click();await page.getByRole('dialog').screenshot({path:'output/playwright/booth-enquiry-mobile.png'});
 await page.keyboard.press('Escape');await page.locator('.particle-hero').screenshot({path:'output/playwright/hero-actions-mobile.png'});
}
