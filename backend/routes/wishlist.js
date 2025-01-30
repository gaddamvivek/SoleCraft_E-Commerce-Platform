const express = require('express');
const router = express.Router();
const WshLstCntrl = require('../controllers/wishlistController');

// Get all items in the wishlist
router.get('/', WshLstCntrl.getWishlist);

// Add an item to the wishlist
router.post('/', WshLstCntrl.addToWishlist);

// Remove an item from the wishlist by productId
router.delete('/:productId', WshLstCntrl.RmvWshlstHndl);


module.exports = router;

  