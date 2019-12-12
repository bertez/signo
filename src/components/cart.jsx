import React, { useContext } from 'react';
import { CartContext } from '../provider/CartContext.jsx';
import { formatPrice } from '../helpers/currency';
import { Link } from 'gatsby';

function CartTable() {
  const cartCtxt = useContext(CartContext);

  const {
    cart: { items }
  } = cartCtxt;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.sku}>
              <td>
                {item.name}, {formatPrice(item.price, item.currency)}
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={item.quantity}
                  min="1"
                  onInput={e =>
                    cartCtxt.updateItemCount(item.sku, e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => cartCtxt.removeFromCart(item.sku)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Sub Total: {formatPrice(cartCtxt.getTotal())}</td>
          </tr>
          <tr>
            <td colSpan="3">Envío: {formatPrice(cartCtxt.getShipping())}</td>
          </tr>
          <tr>
            <td colSpan="3">
              TOTAL: {formatPrice(cartCtxt.getTotal() + cartCtxt.getShipping())}
            </td>
          </tr>
        </tfoot>
      </table>
      <Link to="/checkout">Finalizar compra</Link>
    </>
  );
}

export function CartIcon() {
  const cartCtxt = useContext(CartContext);
  return (
    <button className="cart" onClick={() => cartCtxt.toggleCart()}>
      Cart
      {cartCtxt.cart.items.length > 0 && (
        <span>{cartCtxt.cart.items.length}</span>
      )}
    </button>
  );
}

export function Cart() {
  const cartCtxt = useContext(CartContext);
  return (
    <section className={`ly-cart${cartCtxt.cart.visible ? ' visible' : ''}`}>
      <h2>Tu compra</h2>
      {cartCtxt.cart.items.length > 0 ? <CartTable /> : <p>No hay productos</p>}
      <button onClick={() => cartCtxt.toggleCart()}>Volver</button>
    </section>
  );
}
