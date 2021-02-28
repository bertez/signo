import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import { GatsbyImage } from 'gatsby-plugin-image';
import Md from '../helpers/markdown.jsx';

import { ServiceDetail } from '../components/service-detail.jsx';
import { Gallery } from '../components/gallery.jsx';
import { PriceTable } from '../components/prices.jsx';
import { ProjectList } from '../components/project-list.jsx';

export default function Service({ data }) {
  const {
    page: { frontmatter },
  } = data;

  return (
    <article className="content content-service">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
      </header>
      <figure>
        <GatsbyImage
          sizes={frontmatter.picture.childImageSharp.sizes}
          alt={frontmatter.title}
        />
      </figure>

      <section className="ly-text-block">
        <Md>{frontmatter.description}</Md>
      </section>

      {frontmatter.details && frontmatter.details.length > 0 && (
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

      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <section className="ly-block-gallery">
          <h2>Galería</h2>

          <Gallery images={frontmatter.gallery} />
        </section>
      )}

      {frontmatter.prices && frontmatter.prices.length > 0 && (
        <section className="ly-service-prices">
          <h2>Tarifas</h2>

          <PriceTable service={frontmatter.title} prices={frontmatter.prices} />
        </section>
      )}

      {frontmatter.related_projects && frontmatter.related_projects.length > 0 && (
        <section className="ly-projects-list">
          <h2>Proyectos relacionados</h2>
          <ProjectList
            more={false}
            size="small"
            projects={frontmatter.related_projects.map((r) => r.project)}
          />
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
        description
        short_description
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
                  small: sizes(maxWidth: 400) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
          }
        }
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
          budget
          template
        }
      }
    }
  }
`;
