import React, { useState, useEffect } from 'react';

export const CartContext = React.createContext();

const STORAGE_KEY = 'signo_cart';

export const CartProvider = ({ children }) => {
  // Get cart from localstorage if present
  let initialCart = [];
  let stripe;

  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem(STORAGE_KEY);

    initialCart = storedState ? JSON.parse(storedState) : [];
    stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC);
  }

  // Initialise state with stored cart
  const [cart, updateCart] = useState({ visible: false, items: initialCart });

  // Store cart in localstorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.items));
  }, [cart.items]);

  // Cart functions

  //Add sku to cart
  const addToCart = product => {
    const items = [...cart.items];

    const item = items.find(item => item.sku === product.sku);

    if (item) {
      item.quantity = item.quantity + 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    updateCart({ ...cart, items });
  };

  // Update cart sku quantity
  const updateItemCount = (sku, quantity) => {
    const newQt = Number(quantity) > 0 ? Number(quantity) : 1;
    const items = [...cart.items];
    const item = items.find(item => item.sku === sku);
    item.quantity = newQt;
    updateCart({ ...cart, items });
  };

  // Remove sku from cart
  const removeFromCart = sku => {
    const items = cart.items.filter(item => item.sku !== sku);

    updateCart({ ...cart, items });
  };

  // Get total
  const getTotal = () => {
    const total = cart.items.reduce((p, c) => {
      return p + c.price * c.quantity;
    }, 0);

    return total;
  };

  //TODO: define shipping
  const getShipping = () => {
    return 0;
  };

  const startPayment = (orderID, customerEmail) => {
    //items, successURL, cancelURL
    const payload = {
      items: cart.items.map(({ sku, quantity }) => ({ sku, quantity })),
      successUrl: `${process.env.GATSBY_BACKEND_SHOP}/shop/confirm/${orderID}`,
      cancelUrl: `${process.env.GATSBY_BACKEND_SHOP}/shop/remove/${orderID}`,
      customerEmail
    };

    stripe.redirectToCheckout(payload);
  };

  // Hide/Show cart
  const toggleCart = () => {
    updateCart({ ...cart, visible: !cart.visible });
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
        getShipping,
        startPayment
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
