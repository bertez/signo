import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';

import { ShopProduct } from '../components/shop-product.jsx';

export default function Projects({ data, addToCart }) {
  const {
    page: { frontmatter },
    items: { group: items }
  } = data;

  console.log(items);

  return (
    <article className="content content-services">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section>
        <h2>Products</h2>

        {items.map(item => (
          <ShopProduct key={item.fieldValue} item={item} />
        ))}
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
    items: allStripeSku {
      group(field: product___name) {
        edges {
          node {
            attributes {
              name
            }
            image
            currency
            price
            product {
              metadata {
                material
              }
            }
            localFiles {
              childImageSharp {
                sizes(maxWidth: 400) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
        fieldValue
      }
    }
  }
`;
