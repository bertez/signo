import React from 'react';

import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Slider from './slider.jsx';

export function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.node.fields.slug}>
          <figure>
            <Link to={product.node.fields.slug}>
              <GatsbyImage
                alt={product.node.frontmatter.title}
                image={
                  product.node.frontmatter.picture.childImageSharp
                    .gatsbyImageData
                }
              />
            </Link>
          </figure>

          <section className="product-info">
            <h2>{product.node.frontmatter.title}</h2>
            <p className="description">
              {product.node.frontmatter.short_description}
            </p>
            <Link to={product.node.fields.slug} className="link">
              Más info
            </Link>
          </section>
        </li>
      ))}
    </ul>
  );
}

export function ProductListSlider({ products }) {
  return (
    <>
      <Slider name="products" arrows>
        {products.map((product) => (
          <div key={product.node.fields.slug}>
            <Link to={product.node.fields.slug}>
              <GatsbyImage
                image={
                  product.node.frontmatter.alt_picture.childImageSharp
                    .gatsbyImageData
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
