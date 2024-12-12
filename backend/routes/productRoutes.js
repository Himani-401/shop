// /routes/productRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');  // Import the Product model

// Middleware to authenticate requests (if needed)
const authenticate = require('../middleware/authMiddleware');

// Create a new product (POST)
router.post('/product', authenticate, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
});

// Get all products (GET)
router.get('/product', async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

// Get a single product by ID (GET)
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product details:', err);
    res.status(500).json({ message: 'Error fetching product details', error: err.message });
  }
});

// Update a product by ID (PUT)
router.put('/product/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
});

// Delete a product by ID (DELETE)
router.delete('/product/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
});

module.exports = router;
