import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

import { Link } from "gatsby";

import "../css/base.css";

import signo from "../img/signo.svg";
import xunta from "../img/xunta.svg";

//import { Cart, CartIcon } from '../components/cart';

export default function MainWrapper({ path, children }) {
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
    services: { edges: services },
  } = data;

  const [menuVisible, toggleMenu] = useState(false);

  return (
    <>
      {path !== "/covid19" && (
        <div className="covid-banner">
          Especial protección COVID-19 <a href="/covid19">Ver productos</a>
        </div>
      )}
      <header className="main">
        <nav className="utility">
          <ul>
            <li className="phone">
              <a href={`tel:${headerData.phone}`}>{headerData.phone}</a>
            </li>
            <li className="dossier">
              <a
                href={headerData.dossier.file.publicURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {headerData.dossier.title}
              </a>
            </li>
          </ul>

          <ul>
            {headerData.social.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url}
                  className={social.network}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.handle}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <section className="header-menu">
          <h1>
            <Link to="/">
              <img src={signo} alt="Signo" />
            </Link>
          </h1>
          <nav>
            <button
              className={`menu hamburger hamburger--spin ${
                menuVisible ? "is-active" : ""
              }`}
              type="button"
              onClick={() => toggleMenu(!menuVisible)}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
            {menuVisible && (
              <Menu
                close={() => toggleMenu(!menuVisible)}
                services={services}
              />
            )}
          </nav>
        </section>
      </header>

      <main>{children}</main>

      <footer className="main">
        <h1>
          <Link to="/">
            <img src={signo} alt="Signo" />
          </Link>
        </h1>
        <nav>
          <ul className="ly-footer-main-nav">
            <li>
              <Link to="/">Portada</Link>
            </li>
            <li>
              <Link to="/proyectos">Proyectos</Link>
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

          <ul>
            {services.map((service) => (
              <li key={service.node.id}>
                <Link to={service.node.fields.slug}>
                  {service.node.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>

          <ul>
            <li>
              <Link to="/nota-legal">Nota Legal</Link>
            </li>
          </ul>
        </nav>

        <section className="legal">
          <p>Proyecto cofinanciado por:</p>
          <img src={xunta} alt="Xunta de Galicia" />
        </section>
      </footer>
    </>
  );
}

function Menu({ close, services }) {
  // useLayoutEffect(() => {
  //   const originalStyle = window.getComputedStyle(document.body).overflow;
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = originalStyle;
  //   };
  // }, []);

  return (
    <ul onClick={close}>
      <li>
        <Link to="/">Portada</Link>
      </li>
      <li>
        <Link to="/proyectos">Proyectos</Link>
      </li>
      <li>
        <Link to="/servicios">Servicios</Link>
      </li>
      <li>
        <Link to="/construcciones-singulares">Construcciones singulares</Link>
      </li>
      <li>
        <Link to="/empresa">Sobre Signo</Link>
      </li>
    </ul>
  );
}
