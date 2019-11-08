import React from 'react';
import { graphql } from 'gatsby';

export default function Projects({ data }) {
  console.log(JSON.stringify(data, null, 1));

  return <h1>Projects!</h1>;
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
    clients: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "client" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            picture {
              childImageSharp {
                resolutions(width: 300, height: 200) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "project" } } }
    ) {
      edges {
        node {
          fields {
            slug
            client {
              frontmatter {
                title
              }
            }
          }
          frontmatter {
            title
            tagline
            highlight
            picture {
              childImageSharp {
                sizes(maxWidth: 1000) {
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
