'use client';
import Link from 'next/link';
import {createPortal} from 'react-dom';
import {useEffect,useRef,useState,useId} from 'react';
import {usePathname} from 'next/navigation';
import {products} from '../../lib/site-content';
// Download leads to the plans: the pricing section on the home page, the pricing page elsewhere.
// A plain anchor on the home page: the browser scrolls natively and honours scroll-margin.
export function DownloadLink({className='site-button download-action'}:{className?:string}){const pathname=usePathname();return pathname==='/'?<a className={className} href="#pricing">Download software</a>:<Link className={className} href="/pricing">Download software</Link>}
export default function ConversionActions(){
 const [mode,setMode]=useState<'booth'|null>(null),[mounted,setMounted]=useState(false);
 const titleId=useId();
 const dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>setMounted(true),[]);
 useEffect(()=>{const el=dialog.current;if(!el)return;if(mode){el.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;el.close();trigger.current?.focus()}}},[mode,mounted]);
 return <><div className="conversion-actions"><DownloadLink/><button className="site-button secondary enquiry-action" onClick={e=>{trigger.current=e.currentTarget;setMode('booth')}}>Enquire about a booth</button></div>{mounted&&createPortal(<dialog ref={dialog} className="conversion-dialog" aria-labelledby={titleId} onCancel={()=>setMode(null)} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setMode(null)}}}><button className="dialog-close" onClick={()=>setMode(null)} aria-label="Close dialog">×</button><><h2 id={titleId}>Choose a booth</h2><p>Choose a product to start your enquiry.</p><div className="booth-choice-grid">{[products[1],products[0]].map(p=><Link className="booth-choice" href={`/contact?interest=${encodeURIComponent(p.name)}`} key={p.slug} onClick={()=>setMode(null)}><img src={p.image} alt={p.name}/><div><h3>{p.name}</h3><p>{p.slug==='automat-booth'?'A self-service booth for permanent locations.':'A portable booth for events.'}</p><span>Enquire about {p.name}</span></div></Link>)}</div></></dialog>,document.body)}</>;
}

