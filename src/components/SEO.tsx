import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, any>;
}

export function SEO({
  title,
  description,
  url = 'https://ayn-nutrition.vercel.app',
  image = 'https://ayn-nutrition.vercel.app/images/og-image.jpg', // Placeholder for now
  type = 'website',
  jsonLd,
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />

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
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
