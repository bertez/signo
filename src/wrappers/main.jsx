import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export default function MainWrapper({ children }) {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
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
            }
          }
        }
      }
    }
  `);

  console.log(JSON.stringify(data, null, 1));

  return (
    <main className="main-wrapper">
      <header>
        <nav>header links...</nav>
        <h1>Signo</h1>
        <nav>Menu links</nav>
      </header>
      {children}
      <footer>
        <p>(c) Signo, 2019</p>
      </footer>
    </main>
  );
}
