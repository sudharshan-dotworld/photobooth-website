import Link from 'next/link';

export default function TemplateSection() {
  return (
    <section className="photo-foreground-section scrapbook-showcase" id="templates">
      <div className="foreground-layout">
        <div className="foreground-copy">
                    <h2>Make every event<br/><span>look like your event.</span></h2>
          <p>Change backgrounds and add frames, stickers and your branding, for a birthday, a wedding or a company event.</p>
          <Link className="foreground-link" href="/contact?interest=Custom%20photo%20templates">Explore custom templates</Link>
        </div>
        <div className="scrapbook-showcase-art">
          <img
            src="/landing/framed-photos-community.webp"
            alt="Seven overlapping celebration photos of diverse friends and couples, with cartoon, floral, chrome, taped, celestial, botanical, and gold frames"
            width={1100}
            height={1320}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}




