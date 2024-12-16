import express from "express";

import {
  adminReg,
  adminLogin,
} from "../controllers/adminControllers.js";

import {
  uploadProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

import upload from "../middlewares/upload.js";

import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

//define admin registration route
router.post("/register", adminReg);

//define admin login route
router.post("/login", adminLogin);

//Admin Role Privileges

router.post("/upload-product", upload.single("image"), uploadProduct);
// router.post("/product-upload", uploadProduct);

router.delete("/delete-product/:id", deleteProduct);

router.patch("/update-product/:id", updateProduct);


export default router;
