import React, { useContext } from 'react';
import { graphql, navigate } from 'gatsby';

import { CartContext } from '../provider/CartContext.jsx';

import Md from '../helpers/markdown.jsx';

export default function Projects({ data }) {
  const cartCtxt = useContext(CartContext);

  if (cartCtxt.cart.items.length === 0) {
    navigate('/tienda');
  }

  const {
    page: { frontmatter }
  } = data;

  return (
    <article className="content content-services">
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
        <Md>{frontmatter.tagline}</Md>
      </header>
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
        tagline
      }
    }
  }
`;
