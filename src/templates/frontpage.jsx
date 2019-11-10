import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';

export default function Frontpage({ data }) {
  // console.log(JSON.stringify(data, null, 1));

  return (
    <section className="frontpage">
      <SEO pageData={data.page} />
      <h1>Frontpage!</h1>
    </section>
  );
}

export const query = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        projects {
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
        services_intro
        company_intro
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
    services: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "service" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            short_description
            picture {
              childImageSharp {
                sizes(maxWidth: 800) {
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
