import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';

import Img from 'gatsby-image';
import Md from '../helpers/markdown.jsx';

import { Gallery } from '../components/gallery.jsx';
import { ProductListSlider } from '../components/product-list.jsx';

export default function Product({ data }) {
  const {
    page: { frontmatter },
    products: { edges: products }
  } = data;

  return (
    <article className="product content-product">
      <SEO pageData={data.page} />
      <header>
        <h1>{frontmatter.title}</h1>

        <figure>
          <Img sizes={frontmatter.picture.childImageSharp.sizes} />
        </figure>
      </header>

      <section className="product-description">
        <Md>{frontmatter.description}</Md>
      </section>

      {frontmatter.gallery && (
        <section className="product-gallery">
          <h2>Galería</h2>
          <Gallery images={frontmatter.gallery} />
        </section>
      )}

      <section className="product-buy">
        <Md>{frontmatter.buy_details}</Md>
        <section className="buy-cta">
          <p>{frontmatter.price}€</p>
          <button>Comprar</button>
        </section>
      </section>

      <section className="product-list">
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
            sizes(maxWidth: 1440) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        description
        buy_details
        price
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
      filter: { frontmatter: { template: { eq: "product" } }, id: { ne: $id } }
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
                sizes(maxWidth: 400) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            picture {
              childImageSharp {
                sizes(maxWidth: 1440) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
