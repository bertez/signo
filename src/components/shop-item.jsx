import React, { useContext } from 'react';

import { Link } from 'gatsby';

import Img from 'gatsby-image';

import { formatPrice } from '../helpers/currency';
import { CartContext } from '../provider/CartContext.jsx';

export function ShopItemSkuList({ skus }) {
  const cartCtxt = useContext(CartContext);

  return (
    <ul>
      {skus.map(({ node }) => (
        <li key={node.id}>
          <h3>{node.attributes.name}</h3>
          <p>Precio: {formatPrice(node.price, node.currency)}</p>
          {cartCtxt.cart.items.find(i => i.sku === node.id) ? (
            <button onClick={() => cartCtxt.toggleCart()}>
              ya en la cesta
            </button>
          ) : (
            <button
              onClick={() =>
                cartCtxt.addToCart({
                  sku: node.id,
                  name: node.attributes.name,
                  price: node.price,
                  currency: node.currency
                })
              }
            >
              Añadir a la cesta
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ShopItemList({ items }) {
  return (
    <ul>
      {items.map(({ node }) => (
        <li key={node.fields.slug}>
          <header>
            <h3>{node.frontmatter.title}</h3>
            <figure>
              <Link to={node.fields.slug}>
                <Img sizes={node.frontmatter.picture.childImageSharp.sizes} />
              </Link>
            </figure>
          </header>
          <p>{node.frontmatter.short_description}</p>
          <Link to={node.fields.slug}>Comprar</Link>
        </li>
      ))}
    </ul>
  );
}
