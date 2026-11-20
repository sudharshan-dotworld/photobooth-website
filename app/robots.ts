import type {MetadataRoute} from 'next';
import {siteUrl} from '../lib/site';
export default function robots():MetadataRoute.Robots{
  // The 3D viewers are hidden for now and the login page is a holding page.
  return {rules:{userAgent:'*',allow:'/',disallow:['/booth','/cad-studio','/login']},sitemap:`${siteUrl}/sitemap.xml`};
}
