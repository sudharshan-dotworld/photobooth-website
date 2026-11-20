// Bento grid of software features. Booth renders are transparent cut-outs; the dark
// product photos sit in dark cards so their grounds blend into the card.
const waveBars=[18,30,46,62,40,74,92,58,36,70,96,80,52,30,64,88,72,44,26,50,78,60,34,20];
const qrPath='M9 9h6v6H9zM45 9h6v6H45zM9 45h6v6H9zM27 3h6v12h-6zM27 21h12v6H27zM45 27h12v6H45zM27 33h6v12h-6zM39 39h6v18h-6zM51 39h6v6h-6zM27 51h6v6h-6zM51 51h6v6h-6z';

export default function FeatureGrid() {
  return (
    <div className="bento">
      <article className="bento-card bento-offline">
        <div className="bento-art"><img src="/landing/automat-booth-render.webp" alt="Automat Booth with a camera, display and print tray" width={1200} height={1200} loading="lazy"/></div>
        <div className="bento-copy"><h3>Works Online &amp; Offline</h3><p>Keep capturing with or without internet.</p></div>
      </article>

      <article className="bento-card bento-audio">
        <div className="bento-copy"><h3>Make Every Moment Sound Right</h3><p>Control booth audio for every event.</p></div>
        <div className="bento-wave" aria-hidden="true">{waveBars.map((h,i)=><i key={i} style={{'--h':`${h}%`,'--d':`${(i%8)*-.35}s`} as React.CSSProperties}/>)}</div>
        <div className="bento-art"><img src="/landing/event-booth-render.webp" alt="Event Booth camera head with ring light and screen" width={1200} height={1200} loading="lazy"/></div>
      </article>

      <article className="bento-card bento-gallery">
        <div className="bento-copy"><h3>Your Photo Gallery</h3><p>Access, manage and print your captured photos.</p></div>
        <div className="bento-prints" aria-hidden="true">
          <img className="print print-a" src="/landing/friends.png" alt="" loading="lazy"/>
          <img className="print print-b" src="/landing/celebration.png" alt="" loading="lazy"/>
        </div>
      </article>

      <article className="bento-card bento-dark bento-camera">
        <div className="bento-copy"><h3>Camera Freedom</h3><p>Connect a DSLR or webcam.</p></div>
        <div className="bento-art"><img src="/landing/features/camera.webp" alt="DSLR camera and webcam" width={900} height={600} loading="lazy"/></div>
      </article>

      <article className="bento-card bento-share">
        <div className="bento-copy"><h3>Share It Instantly</h3><p>Scan and save digital copies.</p></div>
        <div className="bento-phone-stage" aria-hidden="true">
          <img className="print print-c" src="/landing/photo-strip.png" alt="" loading="lazy"/>
          <div className="bento-phone"><div className="bento-phone-screen">
            <svg viewBox="0 0 60 60"><path d="M3 3h18v18H3zM39 3h18v18H39zM3 39h18v18H3z" fill="none" stroke="currentColor" strokeWidth="4"/><path d={qrPath}/></svg>
            <span>Scan to get your photos</span>
          </div></div>
        </div>
      </article>

      <article className="bento-card bento-dark bento-create">
        <div className="bento-copy"><h3>Create Your Way</h3><p>Filters, backgrounds, stickers, GIFs and your own welcome screen.</p></div>
        <div className="bento-art"><img src="/landing/features/photo-editor.webp" alt="FunFoto photo editor with stickers and filters" width={1000} height={667} loading="lazy"/></div>
      </article>
    </div>
  );
}
