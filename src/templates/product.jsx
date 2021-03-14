import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/SEO.jsx";

import { GatsbyImage } from "gatsby-plugin-image";
import Md from "../helpers/markdown.jsx";

import { Gallery } from "../components/gallery.jsx";
import { ProductListSlider } from "../components/product-list.jsx";

export default function Product({ data }) {
  const {
    page: { frontmatter },
    products: { edges: products },
  } = data;

  return (
    <article className="product content-product">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
      </header>
      <figure>
        <GatsbyImage
          alt={frontmatter.title}
          image={frontmatter.picture.childImageSharp.gatsbyImageData}
        />
      </figure>

      <section className="ly-text-block">
        <Md>{frontmatter.description}</Md>
      </section>

      <section className="ly-product-buy">
        <h2>{frontmatter.cta_title || "Pídenos tu decoración"}</h2>

        <Md>{frontmatter.buy_details}</Md>
      </section>

      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <section className="ly-block-gallery">
          <h2>Galería</h2>
          <Gallery images={frontmatter.gallery} />
        </section>
      )}

      <section className="ly-products-list">
        <header className="ly-text-header">
          <h2>Otras construcciones</h2>
        </header>
        <ProductListSlider products={products} />
      </section>
    </article>
  );
}

export const query = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        seo_description
        seo_image {
          childImageSharp {
            fixed(width: 1000) {
              src
            }
          }
        }
        picture {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.77)
          }
        }
        description
        buy_details
        cta_title
        gallery {
          title
          image {
            childImageSharp {
              big: sizes(maxWidth: 1440) {
                ...GatsbyImageSharpSizes
              }
              thumb: resolutions(width: 300, height: 200) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }
    products: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "product" }, active: { eq: true } }
        id: { ne: $id }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            short_description
            highlight
            alt_picture {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
            picture {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
