import ScrollAnimations from '../components/site/ScrollAnimations';
import type {Metadata} from 'next';
import {siteUrl} from '../lib/site';
import {Rethink_Sans,Poppins} from 'next/font/google';
import {SiteHeader,SiteFooter} from '../components/site/SiteChrome';
import './globals.css';
import './site.css';
import './refresh.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'FunFoto — Photo booth hardware and software',template:'%s | FunFoto'},description:'Photo booth hardware and software for events and permanent locations, with custom layouts, printing, and QR sharing.',openGraph:{url:'/',siteName:'FunFoto',locale:'en_IN',title:'FunFoto — Photo booth hardware and software',description:'Portable and self-service photo booths, plus software for your own hardware.',type:'website'}};
// Rethink Sans for headings and interface, Poppins for reading text.
const rethink=Rethink_Sans({subsets:['latin'],style:['normal','italic'],variable:'--font-rethink',display:'swap'});
const poppins=Poppins({subsets:['latin'],weight:['400','500','600'],style:['normal','italic'],variable:'--font-poppins',display:'swap'});
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" className={`${rethink.variable} ${poppins.variable}`}><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/>{children}<SiteFooter/><ScrollAnimations/></body></html>}

