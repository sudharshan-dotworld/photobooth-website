import sharp from 'sharp';
for(const name of ['local-computer','booth-audio','gallery-screen','photo-editor','digital-photo','management-screen'])await sharp(`output/feature-images/devices/${name}.png`).resize({width:1000,withoutEnlargement:true}).webp({quality:87}).toFile(`public/landing/features/${name}.webp`);
