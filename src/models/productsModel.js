import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    price: { 
        type: Number, 
        required: true
     },
    description: { 
        type: String, 
        required: true 
    },

    status: {
        type: String,
        required: true,
      },
      
    title: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", ProductsSchema);

export default Product;
