import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { pageview } from '@/lib/analytics';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export function SEO({
  title,
  description,
  url = 'https://ayn-nutrition.vercel.app',
  image = 'https://ayn-nutrition.vercel.app/images/og-image.jpg', // Placeholder for now
  type = 'website',
  jsonLd,
}: SEOProps) {
  // Convert jsonLd to array to handle both single and multiple schemas
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  useEffect(() => {
    pageview(url);
  }, [url]);

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
