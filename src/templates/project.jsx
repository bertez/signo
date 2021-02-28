import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/SEO.jsx";
import Md from "../helpers/markdown.jsx";
import { GatsbyImage } from "gatsby-plugin-image";

import { ProjectSection } from "../components/project-section.jsx";
import { Gallery } from "../components/gallery.jsx";
import { Cites } from "../components/cites.jsx";

export default function Project({ data }) {
  const {
    page: { frontmatter },
  } = data;

  return (
    <article className="content content-project">
      <SEO pageData={data.page} />
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <figure>
        <GatsbyImage
          image={frontmatter.picture.childImageSharp.gatsbyImageData}
          alt={frontmatter.title}
        />
      </figure>

      {frontmatter.sections && frontmatter.sections.length > 0 && (
        <ul className="ly-project-sections">
          {frontmatter.sections.map((section, index) => (
            <li
              key={`project_section_${index}`}
              className={`ly-section-${section.type}`}
            >
              <ProjectSection section={section} />
            </li>
          ))}
        </ul>
      )}

      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <section className="ly-block-gallery">
          <h2>Galería</h2>

          <Gallery images={frontmatter.gallery} />
        </section>
      )}

      {frontmatter.links && frontmatter.links.length > 0 && (
        <section className="ly-cites">
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
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        sections {
          type
          title
          text
          video
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
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
