interface LearnSchemaOptions {
  title: string;
  description: string;
  pathName: string;
  pathSlug: string;
  articleSlug: string;
}

export function createLearnSchema({
  title,
  description,
  pathName,
  pathSlug,
  articleSlug,
}: LearnSchemaOptions) {
  const siteUrl = "https://kriyano.com";

  const articleUrl =
    `${siteUrl}/learn/${pathSlug}/${articleSlug}/`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    author: {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "KRIYANO",
  url: `${siteUrl}/`,
},
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: `${siteUrl}/learn/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pathName,
        item: `${siteUrl}/learn/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: title,
        item: articleUrl,
      },
    ],
  };

  return [articleSchema, breadcrumbSchema];
}