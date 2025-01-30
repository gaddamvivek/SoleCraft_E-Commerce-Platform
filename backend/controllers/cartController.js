const Cart = require('../models/Cart'); // Assuming your Cart model is in models/Cart.js
const mongoose = require('mongoose');

// Get all items in cart

// Get all items in the cart
exports.getAllCartItems = async (req, res) => {
  const { userId } = req.query;  // Get the username from query parameters
  if (!userId) {
    return res.status(400).json({ message: 'UserId is required' });
  }
  try {
    const items = await Cart.find({ userId }); // Fetch all cart items
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};



exports.getCartItemsById = async (req, res) => {
  const { userId } = req.query;   // Get userId from the request body
  const { productId } = req.params; // Get the productId from the route parameters
  try {
    const item = await Cart.findOne({ userId, productId }); // Find the item by productId
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Error fetching item from cart' });
  }
};


exports.addToCart = async (req, res) => {
  // const { username } = req.body;
  const {  userId, productId, name, description, price, brand, type, image, quantity } = req.body;

  try {
    // Check if the item already exists in the cart
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      // If the item exists, return a 409 conflict status
      return res.status(409).json({ message: 'Item already in cart' });
    }

    // If the item does not exist, create a new entry
    const newCartItem = new Cart({
      userId,
      productId,
      name,
      description,
      price,
      brand,
      type,
      image,
      quantity,
    });

    await newCartItem.save();
    res.status(201).json({ message: 'Item added to cart', newCartItem });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};


// Update quantity in cart by productId
exports.updateCartItem = async (req, res) => {
  const { userId } = req.body;  // Get username from the request body
  const { productId } = req.params; // Get productId from the request parameters
  const { quantity } = req.body;  // Get quantity from the request body
  
  try {
    const updatedItem = await Cart.findOneAndUpdate(
      { userId, productId },  // Use the username and productId to identify the cart item
      { $inc: { quantity: 1 } },  // Update the quantity
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item', error });
  }
};




// Remove item from cart
exports.RmvItmFrmCrt = async (req, res) => {
  const { userId } = req.body; 
  const { productId } = req.params; // Extract productId from the request parameters
  try {
    // Attempt to delete the item from the cart
    const result = await Cart.deleteOne({ userId, productId }); // Adjust based on your schema
    
    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item successfully removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};



// Clear cart
exports.clearCart = async (req, res) => {
  const { userId } = req.body;
  try {
    await Cart.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};

// Move item to wishlist
// exports.MvToWshLst = async (req, res) => {
//   const { username } = req.body;
//   const { productId } = req.body; // Assuming productId is in request body
//   try {
//     // Logic to add item to wishlist (implement as needed)
//     const result = await Cart.deleteOne({  username, productId });  // Delete item by productId

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'Item not found in cart' });
//     }

//     res.status(200).json({ message: 'Item moved to wishlist' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error moving item to wishlist', error });
//   }
// };
exports.MvToWshLst = async (req, res) => {
  const { userId } = req.body;  // Get username from the request body
  const { productId } = req.body;  // Get productId from the request body
  try {
    // First, remove the item from the cart
    const cartItem = await Cart.findOneAndDelete({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Then, add the item to the wishlist (implement logic to add to wishlist as needed)
    // Example: Add to Wishlist model (you need to implement Wishlist model and logic)
    const wishlistItem = new Wishlist({
      userId,
      productId,
      name: cartItem.name,
      description: cartItem.description,
      price: cartItem.price,
      brand: cartItem.brand,
      type: cartItem.type,
      image: cartItem.image,
    });

    await wishlistItem.save();

    res.status(200).json({ message: 'Item moved to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error moving item to wishlist', error });
  }
};
