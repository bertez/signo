import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Slider from './slider.jsx';

export function ProductList({ products }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.node.fields.slug}>
          <figure>
            <Link to={product.node.fields.slug}>
              <Img
                sizes={product.node.frontmatter.picture.childImageSharp.sizes}
              />
            </Link>
          </figure>

          <section className="product-info">
            <h2>{product.node.frontmatter.title}</h2>
            <p>{product.node.frontmatter.short_description}</p>
            <Link to={product.node.fields.slug}>Más info</Link>
          </section>
        </li>
      ))}
    </ul>
  );
}

export function ProductListSlider({ products }) {
  return (
    <>
      <header className="ly-text-header">
        <h2>Construcciones singulares</h2>
      </header>
      <Slider name="products">
        {products.map(product => (
          <div key={product.node.fields.slug}>
            <Link to={product.node.fields.slug}>
              <Img
                sizes={
                  product.node.frontmatter.alt_picture.childImageSharp.sizes
                }
                alt={product.node.frontmatter.title}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
}
