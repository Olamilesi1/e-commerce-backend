import express from "express";
import {
    addCart,
  getCart,
  increaseCart,
  decreaseCart
} from "../controllers/cartController.js";

const router = express.Router();

//Route to handle Product upload 

router.post("/add-cart", addCart);
router.get("/get-cart", getCart);
router.put("/increase-cart/:id", increaseCart);
router.put("/decrease-cart/:id", decreaseCart);

export default router;




