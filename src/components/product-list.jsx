import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

export function ProductListSimple({ products }) {
  console.log(products);

  return (
    <section className="product-list">
      <h2>Construcciones singulares</h2>
      <ul>
        {products.map(product => (
          <li key={product.node.fields.slug}>
            <Link to={product.node.fields.slug}>
              <Img
                sizes={
                  product.node.frontmatter.alt_picture.childImageSharp.sizes
                }
                alt={product.node.frontmatter.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
