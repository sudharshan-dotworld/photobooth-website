import Link from 'next/link';
import {plans} from '../../lib/site-content';
import FeatureGrid from './FeatureGrid';
import ContactForm from './ContactForm';
import PhotoCarousel from './PhotoCarousel';
import ProductSpotlights from './ProductSpotlights';
import {DownloadLink} from './ConversionActions';
import AudienceWall from './AudienceWall';
export function SectionHeading({eyebrow,title,copy}:{eyebrow?:string;title:string;copy?:string}){return <div className="section-heading">{eyebrow&&<span className="tiny-label">{eyebrow}</span>}<h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
export function AboutSection(){return <section className="site-section about-section section-light" id="about"><SectionHeading title="Photo booths for events and venues" copy="Bring a portable booth to weddings, parties and corporate events, or install a self-service booth at your venue."/><PhotoCarousel/><div className="setup-benefits">
  {[
    {title:'At home at any event',copy:'Bring the photo experience to indoor celebrations and outdoor gatherings.',path:'M3 12 12 4l9 8M5 10v11h14V10M8 21v-7h8v7'},
    {title:'Your camera. Your setup.',copy:'Choose a DSLR or webcam to suit the way you run your booth.',path:'M3 7h4l2-3h6l2 3h4v14H3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'},
    {title:'Memories to take home',copy:'Give guests a printed keepsake and a digital photo to share.',path:'M7 8V3h10v5M7 17H3V8h18v9h-4M7 14h10v7H7Z'},
    {title:'Keep the moments coming',copy:'Keep taking photos even when your internet connection drops.',path:'m3 3 18 18M8.5 8.5A10 10 0 0 1 21 10M3 10l2-1M7 14a7 7 0 0 1 5-2M11 17h2M12 21h.01'},
  ].map(benefit => <div className="setup-benefit" key={benefit.title}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={benefit.path}/></svg>
    <h3>{benefit.title}</h3><p>{benefit.copy}</p>
  </div>)}
</div></section>}
export function ProductsSection(){return <ProductSpotlights/>}
export function SoftwareSection() {
  const downloadUrl = process.env.FUNFOTO_DOWNLOAD_URL;
  return <section className="software-section section-light software-trial" id="software">
    <div className="site-container trial-layout">
      <div className="trial-copy">
        <h2>Photo booth software<br/><span>you can try for free</span></h2>
        <p>Design branded photo templates, connect your camera, and let guests print or share their photos.</p>
        {downloadUrl
          ? <a className="site-button trial-download" href={downloadUrl}>Download software</a>
          : <DownloadLink className="site-button trial-download"/>}
      </div>
      <div className="trial-product">
        <div className="trial-window">
          <div className="trial-window-bar" aria-hidden="true"><i/><i/><i/></div>
          <img src="/landing/software-welcome-v2.webp" alt="Photo Booth welcome screen with pink illuminated lettering, party photo strips, and a tap anywhere to start prompt" width={1400} height={841} loading="lazy"/>
        </div>
        <img className="trial-booth" src="/landing/event-booth-render.webp" alt="Event Booth with a camera, touchscreen, and printer" width={1200} height={1200} loading="lazy"/>
      </div>
    </div>
  </section>;
}export function FeaturesSection(){return <section className="site-section section-light features-bento" id="features"><div className="bento-head"><h2>Everything You Need for an Amazing Photo Booth</h2><p>From capturing moments to sharing, editing and printing, everything works beautifully together.</p></div><FeatureGrid/></section>}
export function PricingSection(){return <section className="site-section pricing-section" id="pricing"><SectionHeading title="Simple, Transparent Pricing. Pick Your Plan." copy="Choose the right subscription plan for your photo booth setup. Scale your business effortlessly with multi-device licensing, automated workflows, and instant cloud sync."/><div className="pricing-grid">{plans.map(plan=><article className={`price-card ${plan.featured?'featured':''}`} key={plan.name}><span className="plan-badge">{plan.featured?'Billed annually':'Billed monthly'}</span><div className="price-heading"><h3>{plan.name}</h3><div className="price">{plan.compareAt&&<s className="price-was"><span className="sr-only">Twelve months at the monthly price: </span>₹{plan.compareAt}</s>}<span>₹{plan.price}<small>/{plan.period}</small></span></div></div>{plan.saving&&<span className="price-saving">Save ₹{plan.saving} against 12 monthly payments</span>}<p>{plan.description}</p><ul>{plan.features.map(f=><li key={f}>{f}</li>)}</ul><Link className={`site-button ${plan.featured?'':'secondary'}`} href={`/contact?interest=${plan.name}%20plan`}>Enquire about {plan.name}</Link></article>)}</div><p className="pricing-note">Software subscription only. Confirm taxes, availability, and plan details before purchase.</p></section>}
export function AudiencesSection(){return <section className="site-section audiences-section section-light" id="use-cases"><AudienceWall/></section>}
export function ContactSection({initialInterest}:{initialInterest?:string}){return <section className="contact-section" id="contact"><div className="site-container contact-grid"><div className="contact-copy"><h2>Tell us about<br/>your booth setup</h2><p>For a quote or help choosing hardware and software, send us your requirements and where you plan to use the booth.</p><a className="text-link" href="mailto:hello@dotworld.in">hello@dotworld.in</a><span className="contact-location">Coimbatore, India</span></div><ContactForm initialInterest={initialInterest}/></div></section>}







