import React from 'react';

function ShopSKU({ attributes, image, currency, price, product }) {
  return (
    <li>
      <h3>{attributes.name}</h3>
    </li>
  );
}

export function ShopProduct({ item }) {
  console.log(item);
  return (
    <article>
      <h2>{item.fieldValue}</h2>
      <ul>
        {item.edges.map((sku, index) => (
          <ShopSKU key={`${item.fieldValue}_${index}`} {...sku.node} />
        ))}
      </ul>
    </article>
  );
}
