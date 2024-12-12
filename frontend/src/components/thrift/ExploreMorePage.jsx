import React, { useState, useEffect } from 'react';
import './ExploreMorePage.css'; 
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the CartContext

const ExploreMorePage = () => {
  const [tshirts, setTshirts] = useState([]);
  const [tops, setTops] = useState([]);  // Added state for Tops
  const [trousers, setTrousers] = useState([]);  // Added state for Trousers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // Flash card modal state
  const [addedQuantity, setAddedQuantity] = useState(0); // Track added quantity

  const { addToCart } = useCart(); // Use the context's addToCart function
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch T-shirts, Tops, and Trousers from the API
    const fetchItems = async () => {
      try {
        // Fetch T-shirts
        const tshirtResponse = await fetch('http://localhost:5000/api/tshirts');
        if (!tshirtResponse.ok) {
          throw new Error('Network response was not ok for T-shirts');
        }
        const tshirtData = await tshirtResponse.json();
        setTshirts(tshirtData);

        // Fetch Tops
        const topsResponse = await fetch('http://localhost:5000/api/tops');
        if (!topsResponse.ok) {
          throw new Error('Network response was not ok for Tops');
        }
        const topsData = await topsResponse.json();
        setTops(topsData);

        // Fetch Trousers
        const trousersResponse = await fetch('http://localhost:5000/api/trousers');
        if (!trousersResponse.ok) {
          throw new Error('Network response was not ok for Trousers');
        }
        const trousersData = await trousersResponse.json();
        setTrousers(trousersData);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, []);

  // Handle Add to Cart for T-shirts, Tops, and Trousers
  const handleAddToCart = (item) => {
    addToCart(item); // Add to cart via context
    setAddedQuantity((prevQuantity) => prevQuantity + 1); // Increment the quantity
    setIsModalOpen(true); // Show the flash card/modal
  };

  // Handle View Cart
  const handleViewCart = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <div className="explore-more-page">
      <div className="info-strip">
        COD available on retail orders above ₹500 
      </div>

      {/* T-shirt Section */}
      <h2>T-shirts Section</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && tshirts.length === 0 && <p>No T-shirts available.</p>}

      <div className="tshirt-container">
        {tshirts.map(tshirt => (
          <div key={tshirt.id} className="tshirt-item">
            <img src={tshirt.src} alt={`T-shirt ${tshirt.id}`} />
            <p>Price: ₹{(tshirt.price * 83).toFixed(2)}</p>
            <button onClick={() => handleAddToCart(tshirt)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Tops Section */}
      <h2>Tops Section</h2> {/* Heading for Tops */}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && tops.length === 0 && <p>No Tops available.</p>}

      <div className="tshirt-container">
        {tops.map(top => (
          <div key={top.id} className="tshirt-item">
            <img src={top.src} alt={`Top ${top.id}`} />
            <p>Price: ₹{(top.price * 83).toFixed(2)}</p>
            <button onClick={() => handleAddToCart(top)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Trousers Section */}
      <h2>Trousers Section</h2> {/* Heading for Trousers */}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && trousers.length === 0 && <p>No Trousers available.</p>}

      <div className="tshirt-container">
        {trousers.map(trouser => (
          <div key={trouser.id} className="tshirt-item">
            <img src={trouser.src} alt={`Trouser ${trouser.id}`} />
            <p>Price: ₹{(trouser.price * 83).toFixed(2)}</p>
            <button onClick={() => handleAddToCart(trouser)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Flash Card Modal */}
      {isModalOpen && (
        <div className="flash-card">
          <p>
            <span className="tick" role="img" aria-label="tick">✓</span>
            Item added to your cart!
          </p>
          <p>Quantity added: {addedQuantity}</p>
          <button onClick={handleViewCart} className="view-cart-btn">View Cart</button>
          <button onClick={() => setIsModalOpen(false)} className="close-flash-card-btn">✖</button>
        </div>
      )}
    </div>
  );
};

export default ExploreMorePage;