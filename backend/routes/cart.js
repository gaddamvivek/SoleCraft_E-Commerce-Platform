const express = require('express');
const router = express.Router();
const CartCntrl = require('../controllers/cartController');

// Get all items in the cart
router.get('/', CartCntrl.getAllCartItems);

// Get item in cart by productId
router.get('/cart/:username', CartCntrl.getCartItemsById);

// Route to add a new item to the cart
router.post('/', CartCntrl.addToCart);

// Route to update the quantity of an item in the cart
router.put('/cart/:id', CartCntrl.updateCartItem);

// Route to remove an item from the cart
router.delete('/:productId', CartCntrl.RmvItmFrmCrt);

// Clear the cart
router.delete('/', CartCntrl.clearCart);

module.exports = router;
