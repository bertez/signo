import React from 'react';
import { graphql } from 'gatsby';

export default function Products({ data }) {
  console.log(JSON.stringify(data, null, 1));

  return <h1>Products!</h1>;
}

export const query = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
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
