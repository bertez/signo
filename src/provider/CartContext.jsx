import React, { useState, useEffect } from 'react';

export const CartContext = React.createContext();

const STORAGE_KEY = 'signo_cart';

export const CartProvider = ({ children }) => {
  let initialCart = [];

  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem(STORAGE_KEY);

    initialCart = storedState ? JSON.parse(storedState) : [];
  }

  const [cart, updateCart] = useState({ visible: true, items: initialCart });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.items));
    }
  }, [cart.items]);

  // Cart functions
  const addToCart = product => {
    const items = [...cart.items];

    const item = items.find(item => item.sku === product.sku);
    if (item) {
      item.count = item.count + 1;
    } else {
      items.push({ ...product, count: 1 });
    }

    updateCart({ ...cart, items });
  };

  const updateItemCount = (sku, count) => {
    const newCount = count > 0 ? count : 1;
    const items = [...cart.items];
    const item = items.find(item => item.sku === sku);
    item.count = newCount;
    updateCart({ ...cart, items });
  };

  const removeFromCart = sku => {
    const items = cart.items.filter(item => item.sku !== sku);

    updateCart({ ...cart, items });
  };

  const toggleCart = () => {
    updateCart({ ...cart, visible: !cart.visible });
  };

  const getTotal = () => {
    const total = cart.items.reduce((p, c) => {
      return p + c.price * c.count;
    }, 0);

    return total;
  };

  const getShipping = () => {
    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        toggleCart,
        updateItemCount,
        getTotal,
        getShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
