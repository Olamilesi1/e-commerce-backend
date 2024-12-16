const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

// const Cart = new mongoose.Schema({
//   items: [CartItemSchema],
// });

const CartSchema = mongoose.model('Cart', CartSchema);

export default CartSchema;