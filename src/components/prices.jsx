import React, { useState } from 'react';

import Budget from './budget.jsx';

export function PriceTable({ prices, service }) {
  const [isBudgetActive, setBudgetActive] = useState(false);
  const [budgetInfo, setBudgetInfo] = useState({});

  const getBudget = e => {
    setBudgetActive(true);
  };

  return (
    <>
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
              {price.budget ? (
                <td>
                  <button
                    onClick={() => {
                      setBudgetActive(true);
                      setBudgetInfo({
                        service: service,
                        product: price.name,
                        description: price.description
                      });
                    }}
                  >
                    Pedir presupuesto
                  </button>
                </td>
              ) : (
                <td>
                  {price.price} {price.unit}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isBudgetActive && (
        <Budget
          service={budgetInfo.service}
          product={budgetInfo.product}
          description={budgetInfo.description}
          closeBudget={() => {
            setBudgetActive(false);
          }}
        />
      )}
    </>
  );
}
