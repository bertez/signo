import React from 'react';
import { graphql } from 'gatsby';

export default function Project({ data }) {
  console.log(JSON.stringify(data, null, 1));

  return <h1>Project!</h1>;
}

export const query = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
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
          video {
            publicURL
          }
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
