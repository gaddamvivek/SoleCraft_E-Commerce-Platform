const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
}); 

module.exports = mongoose.model('Cart', cartSchema);
