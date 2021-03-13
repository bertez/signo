import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/SEO.jsx";
import Md from "../helpers/markdown.jsx";

import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import { ProjectList } from "../components/project-list.jsx";
import { ClientList } from "../components/client-list.jsx";
import { ServiceList } from "../components/service-list.jsx";
import { ProductListSlider } from "../components/product-list.jsx";

export default function Frontpage({ data }) {
  const {
    page: { frontmatter },
    clients: { edges: clients },
    services: { edges: services },
    products: { edges: products },
  } = data;

  console.log(frontmatter.related_service);

  return (
    <article className="content content-frontpage">
      <SEO pageData={data.page} />

      <div className="hl-banner">
        Destacado: {frontmatter.related_service.frontmatter.title}{" "}
        <a href={frontmatter.related_service.fields.slug}>Ver servicio</a>
      </div>

      <header className="ly-text-header">
        <h1>{frontmatter.title}</h1>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section className="ly-projects-featured">
        <ProjectList
          projects={frontmatter.related_projects.map((r) => r.project)}
          description={false}
        />
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
          <section className="company-info">
            <Md>{frontmatter.company_intro}</Md>
            <Link to="/empresa">Más info</Link>
          </section>
          <figure>
            <GatsbyImage
              alt={frontmatter.company_name}
              image={
                frontmatter.company_picture.childImageSharp.gatsbyImageData
              }
            />
          </figure>
        </header>
      </section>

      <section className="ly-clients">
        <ClientList clients={clients} />
      </section>

      <section className="ly-products-list">
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
        slug
      }
      frontmatter {
        related_service {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        related_projects {
          project {
            fields {
              slug
            }
            frontmatter {
              title
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
        company_name
        company_picture {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 800)
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
                gatsbyImageData(layout: CONSTRAINED)
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
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
    products: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "product" }, active: { eq: true } }
      }
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
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
