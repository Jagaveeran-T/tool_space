
import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        userAgent: 'Google-Display-Ads-Bot',
        allow: '/',
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
