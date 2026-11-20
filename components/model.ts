export type PartId='display'|'camera'|'touch'|'enclosure'|'printer'|'tray'|'vents'|'base'|'computer'|'power'|'cooling';
export const parts: {id:PartId;name:string;offset:[number,number,number];anchor:[number,number,number]}[]=[
 {id:'display',name:'Photo display + QR delivery',offset:[0,.66,-.12],anchor:[0,1.46,.27]},
 {id:'camera',name:'Internal DSLR camera',offset:[0,.40,.73],anchor:[0,1.73,.39]},
 {id:'touch',name:'Advertising + instructions',offset:[0,.22,.72],anchor:[0,1.12,.45]},
 {id:'enclosure',name:'Metal enclosure',offset:[-.91,0,-.10],anchor:[-.34,.83,.30]},
 {id:'printer',name:'Dual DNP print engines',offset:[0,0,.85],anchor:[0,.66,.10]},
 {id:'tray',name:'Dual photo output trays',offset:[.48,0,1.13],anchor:[.18,.49,.49]},
 {id:'vents',name:'Side ventilation panels',offset:[.81,0,0],anchor:[.40,.63,-.02]},
 {id:'base',name:'Base structure',offset:[0,-.22,0],anchor:[0,.09,.30]},
 {id:'computer',name:'Mini PC + display outputs',offset:[-.65,.2,.35],anchor:[-.1,.94,.02]},
 {id:'power',name:'Power + electrical distribution',offset:[-.6,-.05,.1],anchor:[-.19,.3,-.1]},
 {id:'cooling',name:'Four fans / both sides',offset:[.45,0,-.15],anchor:[.29,.65,-.02]},
];
export const clamp=(x:number)=>Math.min(1,Math.max(0,x));
export const smooth=(x:number)=>{const t=clamp(x);return t*t*(3-2*t)};
export const formationOrder:PartId[]=['base','power','printer','computer','cooling','tray','camera','display','touch','vents','enclosure'];
export function formationAt(time:number,id:PartId){const index=formationOrder.indexOf(id);const start=.8+index*.52;return {wire:smooth(time/.9)*(1-smooth((time-start-1.4)/1.2)),solid:smooth((time-start)/1.6),done:time>=9.2};}
export function printAt(t:number){return {flash:t>=1.0&&t<1.35?Math.sin((t-1)/.35*Math.PI):0,preview:t>=1.35,feed:smooth((t-2.4)/5.0),rollers:t>=2.4&&t<7.4,done:t>=8};}
export function tourAt(t:number){return {explode:t<1?0:t<4?smooth((t-1)/3):t<6?1:t<9?1-smooth((t-6)/3):0,printTime:t>=10?t-10:-1,done:t>=18};}
