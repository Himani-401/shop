const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCartItems = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId", "name price description imageUrl");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

const updateCartItem = async (req, res) => {
  const { userId, productId, action, quantity } = req.body;

  if (!userId || !productId || !action) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    // If cart does not exist, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const productInCart = cart.items.find(item => item.productId.toString() === productId);

    if (!productInCart) {
      return res.status(400).json({ message: "Product not in cart" });
    }

    switch (action) {
      case "increase":
        productInCart.quantity += 1;
        break;

      case "decrease":
        productInCart.quantity = Math.max(productInCart.quantity - 1, 1); // Ensure quantity doesn't go below 1
        break;

      case "update":
        if (quantity > 0) {
          productInCart.quantity = quantity;
        } else {
          return res.status(400).json({ message: "Quantity must be greater than zero" });
        }
        break;

      case "remove":
        productInCart.quantity = 1; // Set quantity to 1 instead of removing the product
        break;

      default:
        return res.status(400).json({ message: "Invalid action" });
    }

    // Save the updated cart
    await cart.save();

    // Populate the product details for the updated items
    const updatedCart = await Cart.findOne({ userId }).populate("items.productId", "name price description imageUrl");

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItems: updatedCart.items,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Error updating cart item" });
  }
};


module.exports = { getCartItems, updateCartItem };
