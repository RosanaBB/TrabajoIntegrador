import React, { useState } from 'react';
import { useCart } from './CartProvider';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      setCheckoutError(null);

      const productsInCart = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch('https://fakeapi.platzi.com/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: productsInCart }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }
      console.log('Simulating checkout:', productsInCart);

      setCheckoutSuccess(true);
      clearCart();
    } catch (error) {
      setCheckoutError('Error during checkout. Please try again.');
      console.error('Error during checkout:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity} - Subtotal:{' '}
                {item.quantity * item.price}
                <button
                  onClick={() =>
                    updateCartItemQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    updateCartItemQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>
            Total:{' '}
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </p>
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={handleCheckout} disabled={isCheckingOut}>
            {isCheckingOut ? 'Checking out...' : 'Checkout'}
          </button>
          {checkoutError && <p style={{ color: 'red' }}>{checkoutError}</p>}
          {checkoutSuccess && (
            <p>Checkout successful! Your order has been placed.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
