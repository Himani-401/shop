import React from 'react';
import { useCart } from './CartContext';  // Ensure you import the useCart hook
import { useNavigate } from 'react-router-dom'; 
import './CartPage.css';  // Your custom styles for the cart page

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Use removeFromCart instead of removeItem
  const navigate = useNavigate();

  // Function to calculate the total amount
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * 83 * item.quantity), 0); // Price * Conversion Rate * Quantity
  };

  const navigateToTshirtCollection = () => {
    navigate('/#tshirt-collection');  // Navigate to the section with id 'tshirt-collection'
  };


  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      {/* If cart is empty, show this message */}
      {cart.length === 0 ? (
        <div className="empty-cart">

        <h2>Your cart is empty!!</h2>
        <button onClick={navigateToTshirtCollection} className="continue-shopping-btn">
        Continue Shopping
      </button>
    </div>
      ) : (
        <div>
          <div className="cart-items">
            {/* Loop through each item in the cart */}
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="image-column">
                  {/* Product Image */}
                  <img src={item.src} alt={item.name} className="cart-item-image" />
                </div>

                <div className="details-column">
                  {/* Product Name, Price, and Quantity */}
                  <h3>{item.name}</h3>
                  <p>Price: ₹{(item.price * 83).toFixed(2)}</p> {/* Convert USD to INR */}
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ₹{(item.price * 83 * item.quantity).toFixed(2)}</p>
                </div>

                <div className="delete-column">
                  {/* Delete Button */}
                  <button 
                    className="delete-item-button"
                    onClick={() => removeFromCart(item.id)} // Call removeFromCart function to delete the item
                  >
                    <img 
                      src="https://img.icons8.com/ios-filled/50/000000/trash.png" // Trash icon URL
                      alt="Delete"
                      className="delete-icon"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="cart-total">
            <p>Subtotal: ₹{calculateTotal().toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;