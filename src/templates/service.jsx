import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import Img from 'gatsby-image';
import Md from '../helpers/markdown.jsx';

import { ServiceDetail } from '../components/service-detail.jsx';
import { Gallery } from '../components/gallery.jsx';
import { PriceTable } from '../components/prices.jsx';
import { ProjectList } from '../components/project-list.jsx';

export default function Service({ data }) {
  const {
    page: {
      fields: { projects },
      frontmatter
    }
  } = data;

  return (
    <article className="content content-service">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
      </header>
      <figure>
        <Img
          sizes={frontmatter.picture.childImageSharp.sizes}
          alt={frontmatter.title}
        />
      </figure>

      <section className="ly-service-description">
        <Md>{frontmatter.description}</Md>
      </section>

      {frontmatter.details && (
        <section className="ly-service-details">
          <ul>
            {frontmatter.details.map((detail, index) => (
              <li key={`service_detail_${index}`}>
                <ServiceDetail detail={detail} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {frontmatter.gallery && (
        <section className="ly-block-gallery">
          <h2>Galería</h2>

          <Gallery images={frontmatter.gallery} />
        </section>
      )}

      {frontmatter.prices && (
        <section className="ly-service-prices">
          <h2>Tarifas</h2>

          <PriceTable prices={frontmatter.prices} />
        </section>
      )}

      {projects && (
        <section className="ly-projects-list">
          <h2>Proyectos relacionados</h2>
          <ProjectList more={false} size="small" projects={projects} />
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
                small: sizes(maxWidth: 300) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
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
        description
        short_description
        picture {
          childImageSharp {
            sizes(maxWidth: 1440) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        details {
          title
          text
          image {
            childImageSharp {
              sizes(maxWidth: 700) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        gallery {
          title
          image {
            childImageSharp {
              big: sizes(maxWidth: 1440) {
                ...GatsbyImageSharpSizes
              }
              thumb: resolutions(width: 300, height: 200) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
        prices {
          name
          description
          price
          unit
        }
      }
    }
  }
`;
