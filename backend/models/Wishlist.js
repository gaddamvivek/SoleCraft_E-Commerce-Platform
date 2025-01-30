const mongoose = require('mongoose');

const WshLstSchm = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: Number, required: true }, // Matches the id in Product schema
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String }, // Store only the product name
});

module.exports = mongoose.model('Wishlist', WshLstSchm);


