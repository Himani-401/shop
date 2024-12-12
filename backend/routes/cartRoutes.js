// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { updateCartItem } = require("../controller/cartController");
const Cart = require('../models/Cart');  


router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  console.log("Received userId:", userId); // Check if userId is coming through
  console.log("Adding product:", productId); // Check the productId

  if (!userId || !productId) {
    return res.status(400).json({ message: "userId and productId are required" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    
    console.log("Cart after update:", cart); // Log the updated cart to see the changes

    res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ success: false, message: "Failed to add product to cart", error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId }).populate("items.productId", "name price description imageUrl");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});



router.post("/update", updateCartItem);

module.exports = router;
