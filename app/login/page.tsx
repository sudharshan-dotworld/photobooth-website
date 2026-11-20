import Link from 'next/link';
export const metadata={title:'Customer login',description:'Sign in to your FunFoto account.',robots:{index:false}};
export default function LoginPage(){return <main id="main-content" className="site-section not-found login-page"><span className="tiny-label">Customer login</span><h1>Sign-in is on its way.</h1><p>Customer accounts for licences and devices open soon. For help with your setup now, contact our team.</p><Link className="site-button" href="/contact?interest=Account%20help">Contact support</Link></main>}
