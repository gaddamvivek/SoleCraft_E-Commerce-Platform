const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart'); 

exports.addToWishlist = async (req, res) => {
//   console.log("Request Body:", req.body); // Log incoming data
    // const { username } = req.body; 
    const { userId, productId, name, description, price, brand, type, image } = req.body;

  try {
    // Check if the item already exists in the wishlist by product name
    const ItmExst = await Wishlist.findOne({ userId, productId });
    if (ItmExst) {
      // console.log("Item already exists in wishlist");
      return res.status(409).json();
    }

    // Create a new wishlist item
    const WshLstItm = new Wishlist({ userId, productId, name, description, price, brand, type, image });
    const ItmSvd = await WshLstItm.save();
    // console.log("Item saved to DB:", ItmSvd); // Verify save operation
    res.status(201).json({ message: 'Item added to wishlist', WshLstItm: ItmSvd });
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    res.status(500).json({ message: 'Error adding item to wishlist', error });
  }
};


// Get all wishlist items
exports.getWishlist = async (req, res) => {
  const { userId } = req.query;
  try {
    const WshLstItms = await Wishlist.find({userId});
    res.status(200).json(WshLstItms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

// Remove item from wishlist
exports.RmvWshlstHndl = async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.params;

  try {
    const deletedItem = await Wishlist.findOneAndDelete({ userId, productId });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }
    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from wishlist', error });
  }
};
