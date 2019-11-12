import React from 'react';

export function PriceTable({ prices }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price, index) => (
          <tr key={`price_${index}`}>
            <td>{price.name}</td>
            <td>{price.description}</td>
            <td>{price.price}€</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
