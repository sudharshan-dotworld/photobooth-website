import LegalPage from '../../components/site/LegalPage';
import {terms} from '../../lib/legal';
export const metadata={title:'Terms and Conditions',description:'Terms and conditions for using FunFoto photo booth kiosks and software.'};
export default function TermsPage(){return <LegalPage doc={terms}/>}
