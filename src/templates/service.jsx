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
      <header>
        <h1>{frontmatter.title}</h1>
        <figure>
          <Img
            sizes={frontmatter.picture.childImageSharp.sizes}
            alt={frontmatter.title}
          />
        </figure>
      </header>

      <section className="service-description">
        <Md>{frontmatter.description}</Md>
      </section>

      <section className="service-details">
        <ul>
          {frontmatter.details.map((detail, index) => (
            <li key={`service_detail_${index}`}>
              <ServiceDetail detail={detail} />
            </li>
          ))}
        </ul>
      </section>

      <section className="service-gallery">
        <h2>Galería</h2>

        <Gallery images={frontmatter.gallery} />
      </section>

      <section className="service-prices">
        <PriceTable prices={frontmatter.prices} />
      </section>

      <section className="service-projects">
        <h2>Proyectos relacionados</h2>
        <ProjectList more={false} size="small" projects={projects} />
      </section>
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
              resolutions(width: 500, height: 500) {
                ...GatsbyImageSharpResolutions
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
