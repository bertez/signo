import React from 'react';
import { graphql } from 'gatsby';

export default function Service({ data }) {
  console.log(JSON.stringify(data, null, 1));

  return <h1>Service!</h1>;
}

export const query = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
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
        }
      }
    }
  }
`;
