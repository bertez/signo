import React from 'react';
import { graphql } from 'gatsby';

import { GatsbyImage } from 'gatsby-plugin-image';
import Slider from '../components/slider.jsx';

import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';

import { Cites } from '../components/cites.jsx';

export default function Company({ data }) {
  const {
    page: { frontmatter },
  } = data;

  return (
    <article className="company content-company">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section className="ly-company-contact">
        <section className="contact">
          <h2>Contacto</h2>
          <Md>{frontmatter.contact_info}</Md>
        </section>
        <div
          className="embed-container"
          dangerouslySetInnerHTML={{ __html: frontmatter.map }}
        />
      </section>

      {frontmatter.team && (
        <section className="ly-company-team">
          <h2>Equipo</h2>
          <ul>
            {frontmatter.team.map((person) => (
              <li key={person.email}>
                <figure>
                  <GatsbyImage
                    alt={person.name}
                    image={person.picture.childImageSharp.gatsbyImageData}
                  />
                  <h3>{person.name}</h3>
                  <p>{person.position}</p>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="ly-company-about">
        <h2>Sobre la empresa</h2>
        <Md>{frontmatter.description}</Md>
      </section>

      {frontmatter.timeline && (
        <section className="ly-company-timeline">
          <h2>Historia</h2>
          <Slider arrows name="timeline">
            {frontmatter.timeline.map((unit, index) => (
              <div className="year" key={`timeline_${unit}_${index}`}>
                <h3>{unit.year}</h3>
                <p>{unit.text}</p>
              </div>
            ))}
          </Slider>
        </section>
      )}

      {frontmatter.links && (
        <section className="ly-cites">
          <h2>Signo en los medios de comunicación</h2>
          <Cites links={frontmatter.links} />
        </section>
      )}
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
              gatsbyImageData(layout: CONSTRAINED)
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
