import React from 'react';
import { graphql } from 'gatsby';

export default function Frontpage({ data }) {
  console.log(data.markdownRemark);
  return <h1>Frontpage!</h1>;
}

export const query = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        projects {
          fields {
            slug
          }
          frontmatter {
            title
            picture {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
      frontmatter {
        title
        tagline
        services_intro
        company_intro
      }
    }
  }
`;
