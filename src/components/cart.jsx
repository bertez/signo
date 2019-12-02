import React, { useState } from 'react';

export function Cart({ toggleCart }) {
  return (
    <>
      <p>Cart</p>
      <button onClick={() => toggleCart(false)}>Volver</button>
    </>
  );
}
