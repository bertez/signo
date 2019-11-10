import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Link } from 'gatsby';

export default function MainWrapper({ children }) {
  const data = useStaticQuery(graphql`
    {
      header: markdownRemark(fileAbsolutePath: { regex: "/header.md/" }) {
        id
        frontmatter {
          phone
          address
          dossier {
            file {
              publicURL
            }
            title
          }
          social {
            network
            handle
            url
          }
        }
      }
      services: allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "service" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              short_description
            }
          }
        }
      }
    }
  `);

  const {
    header: { frontmatter: headerData },
    services: { edges: services }
  } = data;

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a href={`tel:${headerData.phone}`}>{headerData.phone}</a>
            </li>
            <li>
              <Link to="/empresa">{headerData.address}</Link>
            </li>
            <li>
              <a
                href={headerData.dossier.file.publicURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {headerData.dossier.title}
              </a>
            </li>
          </ul>

          <ul></ul>
        </nav>
        <h1>
          <Link to="/">Signo</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Portada</Link>
            </li>
            <li>
              <Link to="/proyectos">Proyectos</Link>
            </li>
            <li>
              Servicios:
              <ul>
                {services.map(service => (
                  <li key={service.node.id}>
                    <Link to={service.node.fields.slug}>
                      {service.node.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to="/construcciones-singulares">
                Construcciones singulares
              </Link>
            </li>
            <li>
              <Link to="/empresa">Sobre Signo</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>(c) Signo, 2019</p>
      </footer>
    </>
  );
}
