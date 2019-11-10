import React from 'react';
import { graphql } from 'gatsby';

export default function Company({ data }) {
  console.log(JSON.stringify(data, null, 1));

  return <h1>Company!</h1>;
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
