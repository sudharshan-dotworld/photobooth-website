'use client';
import {useEffect,useRef} from 'react';
const eventPhotos = [
 ['carousel-event-1.webp','A couple laughing at their wedding'],
 ['carousel-event-2.webp','Friends laughing around a birthday cake'],
 ['carousel-event-3.webp','Colleagues cheering at a company party'],
 ['carousel-event-4.webp','Two friends smiling under colorful party lights'],
 ['carousel-event-5.webp','Guests laughing together at an outdoor reception'],
 ['carousel-event-6.webp','Wedding guests posing for a group photo'],
];
const photos = [...eventPhotos, ...eventPhotos];
export default function PhotoCarousel(){
 const root=useRef<HTMLDivElement>(null),cards=useRef<(HTMLDivElement|null)[]>([]),phase=useRef(0);
 useEffect(()=>{
  const el=root.current;if(!el)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');let reduced=motion.matches,visible=true,frame=0,last=0;
  const arrange=()=>{
   const width=el.clientWidth;
   const cardWidth=Math.min(220,Math.max(100,width*.145));
   const radius=width*3.5;
   const step=cardWidth*1.24;
   const span=photos.length*step;
   cards.current.forEach((card,i)=>{
    if(!card)return;
    const offset=((i-phase.current+photos.length)%photos.length)*step-span/2;
    const x=offset;
    const angle=Math.asin(Math.max(-.95,Math.min(.95,x/radius)));
    const y=10+cardWidth*.65+radius*(1-Math.cos(angle));
    const edge=Math.max(0,Math.min(1,(width/2+cardWidth/2-Math.abs(x))/(cardWidth*.5)));
    card.style.width=`${cardWidth}px`;
    card.style.height=`${cardWidth*1.3}px`;
    card.style.transform=`translate(-50%,-50%) translate(${x}px,${y}px) rotate(${angle*180/Math.PI}deg)`;
    card.style.opacity=String(edge);
    card.style.zIndex=String(photos.length-Math.round(Math.abs(offset)/step));
   });
  };
  const tick=(now:number)=>{const dt=last?Math.min((now-last)/1000,.1):0;last=now;if(!reduced&&visible){phase.current=(phase.current+dt*.18)%photos.length;arrange();}frame=requestAnimationFrame(tick);};
  const resize=new ResizeObserver(arrange);resize.observe(el);const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=0});observer.observe(el);const change=()=>{reduced=motion.matches;last=0};motion.addEventListener('change',change);arrange();frame=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();motion.removeEventListener('change',change)};
 },[]);
 return <div className="photo-carousel" ref={root} role="region" aria-label="Photo memories carousel"><div className="carousel-halo" aria-hidden="true"/><div className="carousel-photos">{photos.map(([name,alt],i)=><div className="carousel-photo" key={i} ref={el=>{cards.current[i]=el}}><img src={`/landing/${name}`} alt={alt} loading="lazy" draggable={false}/></div>)}</div></div>
}










