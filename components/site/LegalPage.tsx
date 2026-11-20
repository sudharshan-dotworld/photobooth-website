import type {LegalDoc} from '../../lib/legal';
import {legalEmail} from '../../lib/legal';

// Turns the contact address inside legal copy into a mail link.
function withEmail(text:string){const parts=text.split(legalEmail);return parts.flatMap((p,i)=>i<parts.length-1?[p,<a key={i} href={`mailto:${legalEmail}`}>{legalEmail}</a>]:[p])}

export default function LegalPage({doc}:{doc:LegalDoc}){
 return <main id="main-content" className="marketing-main legal-page">
  <article className="legal-doc">
   <h1>{doc.title}</h1>
   {doc.intro.map((p,i)=><p className="legal-intro" key={i}>{withEmail(p)}</p>)}
   {doc.blocks.map((b,i)=><section key={i} className={b.sub?'legal-sub':'legal-block'}>
    {b.heading&&(b.sub?<h3>{b.heading}</h3>:<h2>{b.heading}</h2>)}
    {b.paras?.map((p,j)=><p key={j}>{withEmail(p)}</p>)}
    {b.items&&<ul>{b.items.map((it,j)=><li key={j}>{withEmail(it)}</li>)}</ul>}
   </section>)}
  </article>
 </main>;
}
