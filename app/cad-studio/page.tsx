import {notFound} from 'next/navigation';
import CadStudio from '../../components/CadStudio';
export const metadata={title:'CAD product studio',robots:{index:false,follow:false}};
export default function Page(){if(process.env.NODE_ENV==='production')notFound();return <CadStudio/>}
