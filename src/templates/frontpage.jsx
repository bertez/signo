import React from 'react';
import { graphql } from 'gatsby';

export default function Frontpage({ data }) {
  console.log(data);
  return <h1>Frontpage!</h1>;
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        tagline
        services_intro
        company_intro
        project_highlight
      }
    }
  }
`;
