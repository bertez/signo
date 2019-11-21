import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { ProjectList } from '../components/project-list.jsx';
import { ClientList } from '../components/client-list.jsx';
import { ServiceList } from '../components/service-list.jsx';
import { ProductListSlider } from '../components/product-list.jsx';

export default function Frontpage({ data }) {
  const {
    page: {
      fields: { projects },
      frontmatter
    },
    clients: { edges: clients },
    services: { edges: services },
    products: { edges: products }
  } = data;

  return (
    <article className="content content-frontpage">
      <SEO pageData={data.page} />

      <header className="ly-text-header">
        <h1>{frontmatter.title}</h1>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section className="ly-projects-featured">
        <ProjectList projects={projects} description={false} />
      </section>

      <section className="ly-clients">
        <ClientList clients={clients} />
      </section>

      {/* Services intro */}

      <section className="services">
        <header className="ly-text-header">
          <h2>Servicios</h2>
          <p>{frontmatter.services_intro}</p>
        </header>
        <ServiceList services={services} />
      </section>

      {/* Company info */}

      <section className="ly-company-frontpage">
        <header>
          <h2>Empresa</h2>
          <section className="company-info">
            <Md>{frontmatter.company_intro}</Md>
            <Link to="/empresa">Más info</Link>
          </section>
          <figure>
            <Img sizes={frontmatter.company_picture.childImageSharp.sizes} />
          </figure>
        </header>
      </section>

      <section className="ly-product-list">
        <header className="ly-text-header">
          <h2>Construcciones singulares</h2>
        </header>
        <ProductListSlider products={products} />
      </section>
    </article>
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
            short_description
            picture {
              childImageSharp {
                big: sizes(maxWidth: 1440) {
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
        company_picture {
          childImageSharp {
            sizes(maxWidth: 800) {
              ...GatsbyImageSharpSizes
            }
          }
        }
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
                sizes(maxWidth: 300) {
                  ...GatsbyImageSharpSizes
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
            alt_picture {
              childImageSharp {
                sizes(maxWidth: 400) {
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
