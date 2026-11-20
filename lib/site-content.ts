import type {Product, Plan} from '../types/site';
export const products: Product[] = [
 {slug:'event-booth',name:'Event Booth',eyebrow:'Portable booth',title:'Event Booth',description:'A portable booth for weddings, parties, and corporate events, with custom photo layouts, printing, and digital sharing.',image:'/landing/event-booth-render.webp',features:['Portable and easy to set up','Weddings, parties and corporate events','Custom layouts and branded experiences','Physical prints and digital copies']},
 {slug:'automat-booth',name:'Automat Booth',eyebrow:'Permanent installation',title:'Automat Booth',description:'A self-service booth for malls, attractions, and campuses, with separate displays for photos and promotions.',image:'/landing/automat-booth-render.webp',features:['Designed for permanent installations','Malls, attractions and campuses','Fun mode and ID photo mode','Separate photo and promotional displays']}
];
export const plans: Plan[] = [
 {name:'Monthly',period:'month',price:'1,599',description:'A monthly software license for one device.',features:['1 device license','Photo capture and custom layouts','Print and QR sharing']},
 // 12 × ₹1,599 = ₹19,188; the annual plan saves ₹4,188.
 {name:'Annual',period:'year',price:'15,000',compareAt:'19,188',saving:'4,188',description:'An annual software license with 2 devices included.',features:['2 devices included','Custom layout builder and gallery sync','Priority technical support'],featured:true}
];
export const navigation=[['About','/#about'],['Products','/#products'],['Features','/features'],['Pricing','/pricing'],['Software','/software']];
