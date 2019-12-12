import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import Img from 'gatsby-image';
import Md from '../helpers/markdown.jsx';

import { Gallery } from '../components/gallery.jsx';
import { ShopItemSkuList } from '../components/shop-item.jsx';

export default function ShopProduct({ data }) {
  const {
    page: { frontmatter },
    skus: { edges: skus }
  } = data;

  return (
    <article className="content content-shop-product">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
      </header>
      <figure>
        <Img
          sizes={frontmatter.picture.childImageSharp.sizes}
          alt={frontmatter.title}
        />
      </figure>

      <section className="ly-text-block">
        <Md>{frontmatter.description}</Md>
      </section>

      <section className="skus">
        <ShopItemSkuList materials={frontmatter.materials} skus={skus} />
      </section>

      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <section className="ly-block-gallery">
          <h2>Galería</h2>
          <Gallery images={frontmatter.gallery} />
        </section>
      )}
    </article>
  );
}

export const query = graphql`
  query($id: String!, $stripe_code: String!) {
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
        description
        picture {
          childImageSharp {
            sizes(maxWidth: 800) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        materials
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
    skus: allStripeSku(filter: { product: { id: { eq: $stripe_code } } }) {
      edges {
        node {
          currency
          price
          attributes {
            name
          }
          localFiles {
            childImageSharp {
              fluid(maxWidth: 400) {
                src
              }
            }
          }
          id
        }
      }
    }
  }
`;
