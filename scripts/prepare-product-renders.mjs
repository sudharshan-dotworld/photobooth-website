import sharp from 'sharp';
for(const [name,source] of [['event-booth','event-booth'],['automat-booth','automat-booth']])await sharp(`output/renders/${source}-cad-render.png`).resize({width:1200,withoutEnlargement:true}).webp({quality:92,alphaQuality:100}).toFile(`public/landing/${name}-render.webp`);
