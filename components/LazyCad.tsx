'use client';
import {useEffect,useRef,useState} from 'react';
import dynamic from 'next/dynamic';
const CadBooth=dynamic(()=>import('./CadBooth'),{ssr:false});
export default function LazyCad(){const ref=useRef<HTMLDivElement>(null);const [ready,setReady]=useState(false);useEffect(()=>{const o=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setReady(true);o.disconnect()}},{rootMargin:'-150px 0px'});if(ref.current)o.observe(ref.current);return()=>o.disconnect()},[]);return <div ref={ref} id="cad-viewer" style={{minHeight:600}}>{ready?<CadBooth/>:<p style={{padding:48}}>Explore the CAD model below.</p>}</div>}

