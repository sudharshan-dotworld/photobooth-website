import LegalPage from '../../components/site/LegalPage';
import {privacy} from '../../lib/legal';
export const metadata={title:'Privacy Policy',description:'What data FunFoto photo booths collect, how it is handled, and your rights.'};
export default function PrivacyPage(){return <LegalPage doc={privacy}/>}
