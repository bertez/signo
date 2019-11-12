import React from 'react';
import { graphql } from 'gatsby';

import Img from 'gatsby-image';
import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';
import { Cites } from '../components/cites.jsx';

export default function Company({ data }) {
  const {
    page: { frontmatter }
  } = data;

  return (
    <article className="company content-company">
      <SEO pageData={data.page} />
      <header>
        <h1>{frontmatter.title}</h1>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section className="company-contact">
        <h2>Contacto</h2>
        <Md>{frontmatter.contact_info}</Md>
        <div dangerouslySetInnerHTML={{ __html: frontmatter.map }} />
      </section>

      <section className="company-team">
        <h2>Equipo</h2>
        <ul>
          {frontmatter.team.map(person => (
            <li key={person.email}>
              <figure>
                <Img resolutions={person.picture.childImageSharp.resolutions} />
                <h3>{person.name}</h3>
                <p>{person.position}</p>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="company-about">
        <h2>Sobre la empresa</h2>
        <Md>{frontmatter.description}</Md>
      </section>

      <section className="company-timeline">
        <h2>Historia</h2>
        <ul>
          {frontmatter.timeline.map((unit, index) => (
            <li key={`timeline_${unit}_${index}`}>
              <h3>{unit.year}</h3>
              <p>{unit.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="company-cites">
        <h2>Signo en los medios de comunicación</h2>
        <Cites links={frontmatter.links} />
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
        description
        contact_info
        map
        team {
          name
          position
          email
          picture {
            childImageSharp {
              resolutions(width: 300, height: 600) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
        timeline {
          year
          text
        }
        links {
          cite
          date(formatString: "DD/MM/YYYY")
          source
          url
        }
      }
    }
  }
`;
