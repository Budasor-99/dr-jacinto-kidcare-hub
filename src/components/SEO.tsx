import { Helmet } from "react-helmet-async";
import { BUSINESS } from "@/lib/seo/businessData";

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  schemas?: Record<string, unknown>[];
}

const SEO = ({
  title,
  description = BUSINESS.description,
  path = "/",
  image = BUSINESS.image,
  noindex = false,
  schemas = [],
}: SEOProps) => {
  const url = `${BUSINESS.url}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="es_EC" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {schemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
