import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';

import { ClientList } from '../components/client-list.jsx';
import { ProjectList } from '../components/project-list.jsx';

export default function Projects({ data }) {
  console.log(JSON.stringify(data, null, 1));

  const {
    page: { frontmatter },
    projects: { edges: projects },
    clients: { edges: clients }
  } = data;

  return (
    <article className="content content-projects">
      <SEO pageData={data.page} />
      <header>
        <h1>{frontmatter.title}</h1>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section className="clients">
        <ClientList clients={clients} />
      </section>

      <section className="projects">
        {/* Featured */}
        <ProjectList
          more={false}
          link={true}
          projects={projects
            .filter(project => project.node.frontmatter.highlight)
            .map(project => project.node)}
        />

        <h2>Otros proyectos</h2>
        <ProjectList
          more={false}
          size="small"
          projects={projects
            .filter(project => !project.node.frontmatter.highlight)
            .map(project => project.node)}
        />

        {/* Other */}
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
    clients: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "client" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
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
              fields {
                slug
              }
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
                big: sizes(maxWidth: 1000) {
                  ...GatsbyImageSharpSizes
                }
                small: sizes(maxWidth: 300) {
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
