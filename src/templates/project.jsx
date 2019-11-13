import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';
import Img from 'gatsby-image';

import { ProjectSection } from '../components/project-section.jsx';
import { Gallery } from '../components/gallery.jsx';
import { Cites } from '../components/cites.jsx';

export default function Project({ data }) {
  const {
    page: { frontmatter }
  } = data;

  return (
    <article className="content content-project">
      <SEO pageData={data.page} />
      <header>
        <h1>{frontmatter.title}</h1>
        <Md>{frontmatter.tagline}</Md>

        <figure>
          <Img
            sizes={frontmatter.picture.childImageSharp.sizes}
            alt={frontmatter.title}
          />
        </figure>
      </header>

      {frontmatter.sections && (
        <ul className="project-sections">
          {frontmatter.sections.map((section, index) => (
            <li key={`project_section_${index}`}>
              <ProjectSection section={section} />
            </li>
          ))}
        </ul>
      )}

      {frontmatter.gallery && (
        <section className="project-gallery">
          <h2>Galería</h2>

          <Gallery images={frontmatter.gallery} />
        </section>
      )}

      {frontmatter.links && (
        <section className="project-cites">
          <h2>Referencias en medios y redes sociales</h2>
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
        client {
          frontmatter {
            title
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
        tagline
        picture {
          childImageSharp {
            sizes(maxWidth: 1440) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        sections {
          type
          title
          text
          video
          image {
            childImageSharp {
              sizes(maxWidth: 1440) {
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
