import React from 'react';

import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ pageData }) => {
  //Default data
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          url: siteUrl
          defaultImage: image
        }
      }
    }
  `);

  const {
    site: {
      siteMetadata: {
        defaultTitle,
        titleTemplate,
        defaultDescription,
        url,
        defaultImage,
      },
    },
  } = data;

  //Page data
  const {
    fields: { slug },
    frontmatter: { title, seo_description: description, seo_image: image },
  } = pageData;

  const SEO_title = title || defaultTitle;
  const SEO_description = description || defaultDescription;
  const SEO_image = (image && image.childImageSharp.fixed.src) || defaultImage;

  // TODO: add schema.org data

  return (
    <>
      <Helmet title={SEO_title} titleTemplate={titleTemplate}>
        <html lang="es" />
        <meta name="description" content={SEO_description} />
        <meta name="image" content={SEO_image} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${url}${slug}`} />
        <meta property="og:title" content={SEO_title} />
        <meta property="og:description" content={SEO_description} />
        <meta property="og:image" content={SEO_image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO_title} />
        <meta name="twitter:description" content={SEO_description} />
        <meta name="twitter:image" content={SEO_image} />

        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    </>
  );
};

export default SEO;
