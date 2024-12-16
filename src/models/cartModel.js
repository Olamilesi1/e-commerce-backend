
import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  items: [CartItemSchema],
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;