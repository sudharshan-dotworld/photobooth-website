import type {MetadataRoute} from 'next';
import {siteUrl} from '../lib/site';
import {products} from '../lib/site-content';
export default function sitemap():MetadataRoute.Sitemap{
  const paths=['','/software','/features','/pricing','/contact',...products.map(p=>`/products/${p.slug}`),'/terms','/privacy'];
  return paths.map(p=>({url:`${siteUrl}${p}`,changeFrequency:'monthly',priority:p===''?1:.7}));
}
