import {notFound} from 'next/navigation';
import Link from 'next/link';
import {boothPages} from '../../../lib/booth-pages';
import {ContactSection} from '../../../components/site/Sections';

export function generateStaticParams(){return boothPages.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const p=boothPages.find(p=>p.slug===slug);
  return p?{title:p.name,description:p.lede,alternates:{canonical:`/products/${p.slug}`}}:{title:'Booth not found'};
}

export default async function BoothPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const p=boothPages.find(p=>p.slug===slug);if(!p)notFound();
  const enquire=`/contact?interest=${encodeURIComponent(p.name)}`;
  return <main id="main-content" className="marketing-main booth-page">
    <section className="booth-hero">
      <div className="booth-hero-copy">
        <Link className="booth-back" href="/#products">All booths</Link>
        <span className="booth-eyebrow">{p.eyebrow}</span>
        <h1>{p.name}</h1>
        <p>{p.lede}</p>
        <div className="booth-actions"><Link className="site-button" href={enquire}>Enquire about {p.name}</Link><Link className="site-button secondary" href="/#pricing">See software plans</Link></div>
      </div>
      <div className="booth-hero-art"><img src={p.render} alt={p.renderAlt} width={1200} height={1200}/></div>
    </section>

    <section className="booth-block booth-modular">
      <div className="booth-block-head"><h2>{p.modular.title}</h2><p>{p.modular.copy}</p></div>
      <div className="booth-modules">{p.modular.modules.map(m=><article className="booth-module" key={m.title}>
        <div className="booth-module-art"><img src={m.image} alt="" loading="lazy"/></div>
        <h3>{m.title}</h3><p>{m.copy}</p>
      </article>)}</div>
    </section>

    <section className="booth-block booth-use">
      <div className="booth-use-art"><img src={p.use.image} alt={p.use.imageAlt} loading="lazy"/></div>
      <div className="booth-use-copy"><h2>{p.use.title}</h2><p>{p.use.copy}</p>
        {p.use.numbered?<ol className="booth-points">{p.use.points.map(pt=><li key={pt}>{pt}</li>)}</ol>:<ul className="booth-points">{p.use.points.map(pt=><li key={pt}>{pt}</li>)}</ul>}
      </div>
    </section>

    <section className="booth-block booth-software">
      <div className="booth-block-head"><h2>{p.software.title}</h2><p>{p.software.copy}</p></div>
      <ul className="booth-chips">{p.software.points.map(pt=><li key={pt}>{pt}</li>)}</ul>
      <Link className="site-button" href={enquire}>Enquire about {p.name}</Link>
    </section>

    <ContactSection initialInterest={p.name}/>
  </main>;
}
