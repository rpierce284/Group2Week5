import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Update the quantity of a specific item in the cart
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Calculate the total price, accounting for subscriptions and any free movies
  const calculateTotal = () => {
    const subscription = cart.find(item => item.name.includes('Plan'));
    let freeMovies = 0;

    // Determine the number of free movies if a subscription is present
    if (subscription) {
      if (subscription.name === 'Basic Plan') {
        freeMovies = 5;
      } else if (subscription.name === 'Standard Plan') {
        freeMovies = 7;
      } else if (subscription.name === 'Premium Plan') {
        freeMovies = 15;
      }
    }

    let movieCount = 0;
    let total = 0;

    // Calculate total cost, applying free movies if a subscription exists
    cart.forEach(item => {
      if (!item.name.includes('Plan')) { // Handle movies
        movieCount += item.quantity;

        if (subscription && movieCount > freeMovies) {
          const chargeableMovies = movieCount - freeMovies;
          total += Math.min(chargeableMovies, item.quantity) * item.price;
          freeMovies = 0; // Use up the free movie allowance
        } else if (!subscription) { // If no subscription, charge all movies
          total += item.quantity * item.price;
        }
      } else {
        total += item.price; // Add subscription cost to total
      }
    });

    return total;
  };

  // Generate a summary of items in the cart
  const itemSummary = () => {
    return cart
      .map((item) => `${item.name} (x${item.quantity})`)
      .join(', ');
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-summary">
            <h3>Items in Cart: {itemSummary()}</h3>
          </div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3> {/* Movie or subscription title */}
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>
                  Quantity:
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    min="1"
                  />
                </p>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="cart-total">
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>

      {cart.length > 0 && (
        <div className="checkout-section">
          <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
