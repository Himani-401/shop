

const mongoose = require('mongoose');
require('dotenv').config(); 
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const products = [
  {
    name: "Gaming Laptop",
    price: 1500,
    description: "A high-performance laptop with top-tier graphics for gaming.",
    category: "Electronics",
    imageUrl: "https://example.com/gaming-laptop.jpg"
  },
  {
    name: "Wireless Headphones",
    price: 250,
    description: "Noise-cancelling wireless headphones with Bluetooth connectivity.",
    category: "Electronics",
    imageUrl: "https://example.com/wireless-headphones.jpg"
  },
  {
    name: "Smartphone",
    price: 799,
    description: "A flagship smartphone with a powerful camera and long battery life.",
    category: "Electronics",
    imageUrl: "https://example.com/smartphone.jpg"
  },
  {
    name: "Sports Watch",
    price: 199,
    description: "A smart sports watch with heart-rate monitoring and fitness tracking.",
    category: "Wearables",
    imageUrl: "https://example.com/sports-watch.jpg"
  },
  {
    name: "Bluetooth Speaker",
    price: 100,
    description: "Portable Bluetooth speaker with clear sound and long-lasting battery.",
    category: "Electronics",
    imageUrl: "https://example.com/bluetooth-speaker.jpg"
  },
  {
    name: "Yoga Mat",
    price: 30,
    description: "Non-slip yoga mat for comfortable and secure yoga sessions.",
    category: "Fitness",
    imageUrl: "https://example.com/yoga-mat.jpg"
  },
  {
    name: "LED Desk Lamp",
    price: 50,
    description: "Adjustable LED desk lamp with multiple light modes and a USB charging port.",
    category: "Home",
    imageUrl: "https://example.com/led-desk-lamp.jpg"
  },
  {
    name: "Electric Kettle",
    price: 40,
    description: "Quick-boiling electric kettle with auto shut-off function.",
    category: "Home Appliances",
    imageUrl: "https://example.com/electric-kettle.jpg"
  },
  {
    name: "Leather Wallet",
    price: 40,
    description: "Premium leather wallet with multiple compartments for cards and cash.",
    category: "Accessories",
    imageUrl: "https://example.com/leather-wallet.jpg"
  },
  {
    name: "Portable Charger",
    price: 25,
    description: "Compact and powerful portable charger for smartphones and tablets.",
    category: "Accessories",
    imageUrl: "https://example.com/portable-charger.jpg"
  }
];

const insertProducts = async () => {
  try {
    await Product.insertMany(products); 
    console.log('Products inserted successfully');
    mongoose.connection.close();  
  } catch (err) {
    console.error('Error inserting products:', err);
    mongoose.connection.close();
  }
};

insertProducts();
