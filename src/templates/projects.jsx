import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/SEO.jsx";
import Md from "../helpers/markdown.jsx";

import { ClientList } from "../components/client-list.jsx";
import { ProjectList } from "../components/project-list.jsx";

export default function Projects({ data }) {
  const {
    page: { frontmatter },
    projects: { edges: projects },
    clients: { edges: clients },
  } = data;

  return (
    <article className="content content-projects">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section className="ly-projects-big">
        {/* Featured */}
        <ProjectList
          more={false}
          link={true}
          projects={projects
            .filter((project) => project.node.frontmatter.highlight)
            .map((project) => project.node)}
        />
      </section>

      <section className="ly-clients">
        <ClientList clients={clients} />
      </section>

      <section className="ly-projects-list">
        {/* Other */}
        <h2>Otros proyectos</h2>
        <ProjectList
          more={false}
          size="small"
          projects={projects
            .filter((project) => !project.node.frontmatter.highlight)
            .map((project) => project.node)}
        />
      </section>
    </article>
  );
}

export const query = graphql`query ($id: String!) {
  page: markdownRemark(id: {eq: $id}) {
    fields {
      slug
    }
    frontmatter {
      title
      seo_description
      seo_image {
        childImageSharp {
          gatsbyImageData(width: 1000, placeholder: BLURRED, layout: FIXED)
        }
      }
      tagline
    }
  }
  clients: allMarkdownRemark(filter: {frontmatter: {template: {eq: "client"}}}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          picture {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
  projects: allMarkdownRemark(filter: {frontmatter: {template: {eq: "project"}}}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          tagline
          highlight
          short_description
          related_client {
            frontmatter {
              title
            }
          }
          picture {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}
`;
