import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';

import { ProductList, ProductListSlider } from '../components/product-list';

export default function Products({ data }) {
  const {
    page: { frontmatter },
    products: { edges: products }
  } = data;

  return (
    <article className="content content-products">
      <SEO pageData={data.page} />
      <header>
        <h1>{frontmatter.title}</h1>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section className="featured-products">
        <ProductList
          products={products.filter(
            product => product.node.frontmatter.highlight
          )}
        />
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
        tagline
      }
    }
    products: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "product" } } }
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
