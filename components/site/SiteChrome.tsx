'use client';
import Link from 'next/link';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {navigation} from '../../lib/site-content';
// Real customer login when configured; until then a holding page.
const loginHref=process.env.NEXT_PUBLIC_FUNFOTO_LOGIN_URL||'/login';
export function SiteHeader(){const [open,setOpen]=useState(false);const pathname=usePathname();return <header className="site-header"><Link className="site-logo" href="/" aria-label="FunFoto home">fun<span>foto</span><i>✳</i></Link><button className="menu-toggle" aria-expanded={open} aria-controls="site-navigation" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'} <span>{open?'−':'+'}</span></button><nav id="site-navigation" className={open?'is-open':''} aria-label="Main navigation">{navigation.map(([label,href])=><Link key={label} href={href} aria-current={pathname===href?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href={loginHref} className="nav-login" onClick={()=>setOpen(false)}>Log in</Link><Link href="/contact" className="site-button small" onClick={()=>setOpen(false)}>Get a booth</Link></nav></header>}
export function SiteFooter() {
  return (
    <footer className="fun-footer">
      <div className="fun-footer-inner">
        <div className="fun-footer-main">
          <div className="fun-footer-brand">
            <Link href="/" className="site-logo" aria-label="FunFoto home">fun<span>foto</span><i aria-hidden="true">✳</i></Link>
            <p>Photo booth hardware and software for events and permanent locations.</p>
          </div>
          <nav aria-label="Footer products">
            <h3>Products</h3>
            <Link href="/products/event-booth">Event Booth</Link>
            <Link href="/products/automat-booth">Automat Booth</Link>
            <Link href="/software">Software</Link>
          </nav>
          <nav aria-label="Footer resources">
            <h3>Resources</h3>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Plans &amp; pricing</Link>
            <Link href="/contact">Contact us</Link>
            <Link href="/contact?interest=Updates">Product updates</Link>
          </nav>
          <nav aria-label="Footer company">
            <h3>Company</h3>
            <Link href="/contact?interest=Distributorship">Become a distributor</Link>
            <Link href="/terms">Terms and Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </nav>
        </div>
        <div className="fun-footer-base">
          <span>© {new Date().getFullYear()} FunFoto</span>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
