import sharp from 'sharp';
for(const name of ['offline','audio','gallery','camera','sharing','customization'])await sharp(`output/feature-images/${name}.png`).resize({width:900,withoutEnlargement:true}).webp({quality:85}).toFile(`public/landing/features/${name}.webp`);
