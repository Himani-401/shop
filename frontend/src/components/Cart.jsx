import React, { useState, useEffect } from "react";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = localStorage.getItem("userId");  // Or retrieve it from a token
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    if (!userId) {
      setNotification("User ID is not available. Please log in.");
      setLoading(false);
      return;
    }

    // Fetch cart items on mount
    setLoading(true);
    fetch(`${BASE_URL}/api/cart/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        return response.json();
      })
      .then((data) => {
        if (data.items) {
          setCartItems(data.items);
          calculateTotalPrice(data.items);
        } else {
          setNotification("Your cart is empty.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
        setNotification("Failed to load cart items.");
      });
  }, [userId]);

  // Calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Update cart item
  const updateCartItem = (productId, action, quantity = 0) => {
    if (action === "decrease" && quantity === 1) {
      action = "remove";  // If quantity is 1, remove the item
    }

    fetch(`${BASE_URL}/api/cart/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId, action, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNotification(data.message || "Cart updated successfully");
          setCartItems(data.cartItems);
          calculateTotalPrice(data.cartItems);
        } else {
          setNotification("Error updating cart item");
        }
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
        setNotification("Failed to update cart");
      });
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {notification && <p className="notification">{notification}</p>}
      {loading ? (
        <p>Loading your cart...</p>
      ) : cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
  <div key={item.productId._id || item._id} className="cart-item">
    <img
      src={`${BASE_URL}/images/${item.productId.imageUrl}`}
      alt={item.productId.name}
      className="cart-item-image"
    />
    <div className="cart-item-details">
      <h3>{item.productId.name}</h3>
      <p>{item.productId.description}</p>
      <p>Price: ₹{item.productId.price}</p>
      <div className="quantity-control">
        <button
          disabled={item.quantity <= 1}
          onClick={() =>
            updateCartItem(item.productId._id, "decrease", Math.max(item.quantity - 1, 0))
          }
        >
          -
        </button>
        <input type="number" value={item.quantity} readOnly />
        <button
          onClick={() => updateCartItem(item.productId._id, "increase", item.quantity + 1)}
        >
          +
        </button>
      </div>
      <button
        className="remove-button"
        onClick={() => updateCartItem(item.productId._id, "remove")}
      >
        Remove
      </button>
    </div>
  </div>
))}

        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <p>Subtotal</p>
          <p>₹{totalPrice.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <p>Estimated Delivery</p>
          <p>₹0.00</p>
        </div>
        <div className="summary-item">
          <p>Total</p>
          <p>₹{totalPrice.toFixed(2)}</p>
        </div>
        <button className="checkout-button">Checkout</button>
        <button className="secure-checkout-button">Secure Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
