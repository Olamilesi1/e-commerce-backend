import express from "express";
import {
  getProducts,
  getProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

//Route to handle Product upload 

router.get("/all-products", getProducts);

router.get("/one-product/:id", getProduct);


export default router;




