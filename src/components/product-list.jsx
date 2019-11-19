import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
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
    </>
  );
}
