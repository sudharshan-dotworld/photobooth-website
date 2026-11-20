import Link from 'next/link';
import {products} from '../../lib/site-content';

const features = [
  [
    {title:'Custom Layouts', copy:'Personalized photo templates and branded frames.', visual:'layouts'},
    {title:'Digital Sharing', copy:'Send photos instantly with a simple QR scan.', visual:'sharing'},
    {title:'Instant Prints', copy:'Photo prints your guests can take home.', visual:'prints'},
  ],
  [
    {title:'Two Displays', copy:'Separate screens for photos and venue promotions.', visual:'displays'},
    {title:'Fun & ID Photos', copy:'Photo experiences and ID photos in one booth.', visual:'portraits'},
    {title:'QR Sharing', copy:'Scan a code to save a digital copy of your photos.', visual:'sharing'},
  ],
];

export default function ProductSpotlights() {
  return <section className="product-spotlights" id="products" aria-label="Photo booth models">
    <div className="booth-types-heading"><h2>Two booths. Your kind of setup.</h2><p>Take Event Booth to your next event or make Automat Booth a fixture at your venue.</p></div>
    {products.map((product,index) => (
      <article className={`booth-breakout-card ${index===1?'booth-breakout-reverse':''}`} key={product.slug} aria-labelledby={`heading-${product.slug}`}>
        <div className="booth-breakout-content">
          <span className="spotlight-eyebrow">{index===0?'Portable booth':'Self-service booth'}</span>
          <h2 id={`heading-${product.slug}`}>{product.name}</h2>
          <p className="booth-breakout-description">{index===0?'A portable photo booth for weddings, parties, and corporate events.':'A self-service photo booth for malls, attractions, and campuses.'}</p>
          <Link className="booth-breakout-link" href={`/products/${product.slug}`}>Explore {product.name}</Link>
          <div className="booth-breakout-features">
            {features[index].map(feature => (
              <div className="booth-breakout-feature" key={feature.title}>
                <h3>{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="booth-breakout-render">
          <img src={product.image} alt={product.name} width={1200} height={1200} loading="lazy"/>
        </div>
      </article>
    ))}
  </section>;
}

