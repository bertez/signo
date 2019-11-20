import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';

import { ServiceList } from '../components/service-list.jsx';

export default function Projects({ data }) {
  const {
    page: { frontmatter },
    services: { edges: services }
  } = data;

  return (
    <article className="content content-services">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section className="services">
        <header className="ly-text-header">
          <p>{frontmatter.services_intro}</p>
        </header>
        <ServiceList services={services} />
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
