import express from "express";
import {
    addCart,
  getCart,
  increaseCart,
  decreaseCart
} from "../controllers/cartControllers.js";

const router = express.Router();

//Route to handle Product upload 

router.post("/add-cart", addCart);
router.get("/get-cart", getCart);
router.put("/increase-cart", increaseCart);
router.put("/decrease-cart", decreaseCart);

export default router;




