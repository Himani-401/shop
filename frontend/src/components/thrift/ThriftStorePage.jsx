
import React, { useState, useEffect,useContext } from 'react';
import './ThriftStorePage.css'; 
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';  
import { Link } from 'react-router-dom';




  

  const ThriftStorePage = () => {
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('orders');
  
 
  const [tshirts, setTshirts] = useState([]);
  const [partyTops, setPartyTops] = useState([]);
  const [trousers, setTrousers] = useState([]); 
 
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [localcart, setCart] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedQuantity, setAddedQuantity] = useState(0); // State for added quantity
  const navigate = useNavigate(); 
  const { addToCart } = useCart();


  
  const images = [
    'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/11_Square_Cards.webp?v=1685862762', 
    'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/11_Square_Cards_2_1.webp?v=1685863001',
    'https://mightysites.com/storage/How-To-Make-A-Thrift-Shop-Website.jpg'
];


useEffect(() => {
  const fetchItems = async () => {
    try {
      const [tshirtResponse, partyTopResponse, trousersResponse] = await Promise.all([
        fetch('http://localhost:5000/api/tshirts'),
        fetch('http://localhost:5000/api/tops'), 
        fetch('http://localhost:5000/api/trousers') // Fetch trousers data
      ]);

      if (!tshirtResponse.ok || !partyTopResponse.ok || !trousersResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const tshirtData = await tshirtResponse.json();
      const partyTopData = await partyTopResponse.json();
      const trousersData = await trousersResponse.json(); // Fetch trousers data

      setTshirts(tshirtData);
      setPartyTops(partyTopData);
      setTrousers(trousersData);  // Set trousers data
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };


  fetchItems(); // Start fetching data when the component mounts



  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
}, 3000); // Change image every 3 seconds

return () => clearInterval(interval); // Cleanup on unmount
  }, []);


const handleAddToCart = (tshirt) => {
  addToCart(tshirt); // Add the tshirt to the cart using the context function
  setAddedQuantity((prevQuantity) => prevQuantity + 1); // Update the added quantity
  setIsModalOpen(true); // Show the modal when an item is added
};
const handleViewCart = () => {
  navigate('/cart');
};

const handleExploreMore = () => {
  navigate('/explore-more');
};

const displayedTshirts = tshirts.slice(0, 4);
const displayedPartyTops = partyTops.slice(0, 4); 
const displayedTrousers = trousers.slice(0, 4);


const [faqData, setFaqData] = useState({
  orders: [
    { question: "How can I place an order?", answer: "You can place an order through our website by selecting items and adding them to the cart.", isOpen: false },
    { question: "Can I track my order?", answer: "Yes, you can track your order through the tracking link provided in your order confirmation email.", isOpen: false },
    { question: "What payment methods do you accept?", answer: "We accept credit cards, debit cards, and PayPal.", isOpen: false }
  ],
  shipping: [
    { question: "What are the shipping charges?", answer: "Shipping charges vary based on your location. You can check shipping fees at checkout.", isOpen: false },
    { question: "How long will it take for my order to arrive?", answer: "Orders usually arrive within 5-7 business days.", isOpen: false },
    { question: "Can I change my shipping address?", answer: "You can change your shipping address before the order is dispatched.", isOpen: false }
  ],
  returns: [
    { question: "What is your return policy?", answer: "You can return items within 30 days of receiving them.", isOpen: false },
    { question: "How do I initiate a return?", answer: "Please contact customer service to initiate a return.", isOpen: false },
    { question: "Will I get a full refund?", answer: "Yes, we will issue a full refund for the returned items.", isOpen: false }
  ]
});


const toggleCategory = (category) => {
  if (activeCategory === category) {
    setActiveCategory(null); // Close if the same category is clicked again
  } else {
    setActiveCategory(category); // Open the new category
  }
};


  // Toggle the FAQ category visibility
  const toggleFAQCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category); 
  };
const toggleAnswer = (index, category) => {
  setFaqData(prevData => ({
    ...prevData,
    [category]: prevData[category].map((item, i) => 
      i === index ? { ...item, isOpen: !item.isOpen } : item
    )
  }));
};



  






  const shopNames = [
    "Shopsy: Welcomes you to provide you amazing thrifting experience",
    "Shopsy - Your Favorite Thrift Store!",
    "Shopsy - Affordable Fashion!",
    "Shopsy - Unique Finds!",
    "Shopsy - Sustainable Shopping!",
    "Shopsy",
    "Shopsy"
    
];

const brands = [
  'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/1_2e17d23c-5f83-43c3-8d7a-f70a5e16061d.webp?v=1686228285', 
  'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/3_a0686e71-755d-4574-b974-c3d1a59937b5.webp?v=1686228284',
  'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/6_b7b00986-e2fc-49ee-aa74-437fda83090b.webp?v=1686228285',
  'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/Untitled_design.webp?v=1686230362',
  'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/5_a77dac53-9ec0-4b5f-996a-c93af46a9329.webp?v=1686228285',
  'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/2_ba9db0cf-8917-4914-9cc2-4e7351b5894e.webp?v=1686228285',
  'https://clubretrothrifts.com/wp-content/uploads/2023/12/best-vintage-thrift-store-in-kerala-300x300.webp',
  'https://clubretrothrifts.com/wp-content/uploads/2023/12/best-thrift-cloths-300x300.webp'
];

const hypeCategoriesImages = [
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVT1T6OT9UId7o4MzOwgMKa9kCf5Opx1AFw&s',text:'Hawaii Shirts' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6nHLKiXubKrFvmjjyVcFjRGgnFlumrGw4uw&s', text: 'Unisex Oversized Tees' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosHxbbOvRopoypOik62D4oDNMWSZ1NISnSQ&s', text: 'Korean High Rise Trousers' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpAleObszF3GjC1vMTymiazXNR29CsBda0KA&s', text: 'Crop Tops' },
];

const thriftCrazeImages = [
  { src: 'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/11_Square_Cards.webp?v=1685862762', text: 'Hidden in our collection you will find amazing brands like zara,Nike and more at upto 80% off MRP.' },
  { src: 'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/11_Square_Cards_1.webp?v=1685862794', text: 'Each thrifted piece is unique & can never be restocked. So is your chance to flaunt rare fashion.' },
  { src: 'https://cdn.shopify.com/s/files/1/0618/1719/2707/files/11_Square_Cards_2_1.webp?v=1685863001', text: 'A Scooby Doo hoodie or a Nirvana band tee? You simply never know what gems you might find here!' }
];



  
    return (
      <div className="thrift-store">
        
         <div className="marquee">
                <div className="marquee-content">
                    {shopNames.map((name, index) => (
                        <span key={index} style={{ paddingRight: '50px' }}>{name}</span>
                    ))}
                </div>
            </div>
            <div className="header-section">
       
            <h1>Welcome to Our Thrift Store</h1>
        <div className="slider">
            {images.map((image, index) => (
                <div
                    className={`slide ${index === currentIndex ? 'active' : ''}`}
                    key={index}
                >
                    <img src={image} alt={`Slide ${index + 1}`} />
                </div>
            ))}
            <div className="navigation">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
            </div>
            </div>
            

            <section className="brands-section">
                <h2>Brands you love, up to 80% off</h2>
              
                <br></br>
                
                <div className="brands-container">
                    {brands.map((brand, index) => (
                        <div className="brand" key={index}>
                            <img src={brand} alt={`Brand ${index + 1}`} />
                        </div>
                    ))}
                    </div>
                    <button className="explore-button">EXPLORE ALL</button>


</section>

<section className="hype-categories-section">
  <h2>Explore Hype Categories</h2>
  
  <div className="hype-categories-container">
    {hypeCategoriesImages.map((image, index) => (
      <div className="hype-category" key={index}>
        <Link to="/explore-more">
          <img src={image.src} alt={`Hype Item ${index + 1}`} />
          {/* Overlay Text */}
          <div className="overlay-text">{image.text}</div>
        </Link>
      </div>
    ))}
  </div>
</section>


            <section className="thrift-craze-section">
                <h2>The Thrift Craze Explained</h2>
                <p>Here's 3 reasons why you should #ShiftToThrift</p>
                <div className="thrift-cards-container">
                    {thriftCrazeImages.map((item, index) => (
                        <div className="thrift-card" key={index}>
                            <img src={item.src} alt={`Reason ${index + 1}`} />
                            {/* Text Below Image */}
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>
            


            <section className="tshirt-collection-section">
    <h2>T-Shirt Collection</h2>
    {loading && <p>Loading...</p>} 
    {error && <p>Error: {error}</p>} {/* Show error message */}
    {!loading && tshirts.length === 0 && <p>No t-shirts available.</p>}

    <div className="tshirt-container">
    {displayedTshirts.map(tshirt => (
            <div key={tshirt.id} className="tshirt-item">
              <img src={tshirt.src} alt={`T-shirt ${tshirt.id}`} />
              <p>Price: ₹{(tshirt.price * 83).toFixed(2)}</p>
              <button onClick={() => handleAddToCart(tshirt)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <button className="explore-button" onClick={handleExploreMore}>EXPLORE MORE..</button>
      </section>


      <section className="branded-party-tops-section">
        <h2>Branded Party Tops</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && partyTops.length === 0 && <p>No party tops available.</p>}

        <div className="party-tops-container">
          {displayedPartyTops.map((top) => (
            <div key={top.id} className="tshirt-item">
              <img src={top.src} alt={`Top ${top.id}`} />
              <p>Price: ₹{(top.price * 83).toFixed(2)}</p>
              <button onClick={() => handleAddToCart(top)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <button className="explore-button" onClick={handleExploreMore}>EXPLORE MORE..</button>
      </section>


        {/* Trousers Section */}
        <section className="trousers-section">
        <h2>Explore Trousers</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && trousers.length === 0 && <p>No trousers available.</p>}
        <div className="trousers-container">
          {displayedTrousers.map((trouser) => (
            <div key={trouser.id} className="tshirt-item">
              <img src={trouser.src} alt={`Trouser ${trouser.id}`} />
              <p>Price: ₹{(trouser.price * 83).toFixed(2)}</p>
              <button onClick={() => handleAddToCart(trouser)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <button className="explore-button" onClick={handleExploreMore}>EXPLORE MORE..</button>
      </section>


        {/* FAQ Section at the bottom */}
        <section className="faq-section">
        <h2>Frequently Asked Questions</h2>

{/* Buttons for Orders, Shipping, and Returns */}
<div className="faq-buttons">
  <button onClick={() => toggleFAQCategory('orders')} className={activeCategory === 'orders' ? 'active' : ''}>
    Orders
  </button>
  <button onClick={() => toggleFAQCategory('shipping')} className={activeCategory === 'shipping' ? 'active' : ''}>
    Shipping
  </button>
  <button onClick={() => toggleFAQCategory('returns')} className={activeCategory === 'returns' ? 'active' : ''}>
    Returns
  </button>
</div>

{/* Display Questions Based on Active Category */}
{activeCategory && (
  <div className="faq-questions">
    {faqData[activeCategory].map((item, index) => (
      <div key={index} className="faq-item">
        <h3 onClick={() => toggleAnswer(index, activeCategory)} className="faq-question">
          {item.question}
          <span className={`faq-icon ${item.isOpen ? 'open' : ''}`}>{item.isOpen ? '-' : '+'}</span>
        </h3>
        <div className={`faq-answer ${item.isOpen ? 'open' : ''}`}>
          <p>{item.answer}</p>
        </div>
      </div>
    ))}
  </div>
)}
      </section>


 {/* Flash Card Notification */}
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

export default ThriftStorePage;