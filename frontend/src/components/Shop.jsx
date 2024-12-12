import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Shop.css";

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");  // Get token from localStorage

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${BASE_URL}/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach token to the request headers
        },
      })
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = selectedCategory
      ? `${BASE_URL}/api/products?category=${selectedCategory}`
      : `${BASE_URL}/api/products`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach token to the request headers
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [selectedCategory, token]);

  const addToCart = (productId) => {
    axios
      .post(
        `${BASE_URL}/api/cart/add`,
        { userId, productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Attach token to the request headers
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message || "Product added to cart!");
        } else {
          alert(response.data.message || "Failed to add product to cart");
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("There was an error adding the product to the cart.");
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="shop-container">
      <div className="sidebar">
        <h2>Categories</h2>
        <ul>
          <li
            key="all"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? "active" : ""}
          >
            All Products
          </li>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="shop-content">
        {selectedCategory === null ? (
          <h1>Enjoy your shopping :)</h1>
        ) : (
          <h1>{selectedCategory} Products</h1>
        )}

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card1">
                <Link to={`/product/${product._id}`} className="product-card-link">
                  <div>
                    <img
                      src={`http://localhost:5000/images/${product.imageUrl}`}
                      alt={product.name}
                      className="product-image1"
                    />
                    <h3 className="product-name1">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price1">Price: ₹{product.price}</p>
                  </div>
                </Link>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
