import httpStatus from "http-status";
import CartSchema from "../models/cartModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import responseMessages from "../views/responseMessages.js";
import httpStatus from "http-status";
import { registerSchema } from "../validations/adminValidation.js";
import adminValidateSchema from "../utils/adminValidateSchema.js";
import { response } from "express";

const addCart =  async (req, res) => {
  try {
    const { name, price, image } = req.body;

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.name === name && item.price === price
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ name, price, image });
    }

    await cart.save();
    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
}

const getCart =  async (req, res) => {  
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
      await cart.save();
    }
    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
}

const increaseCart =  async (req, res) => {
  try {
    const cart = await Cart.findOne();
    const item = cart.items.id(req.params.id);
    if (item) {
      item.quantity += 1;
      await cart.save();
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to increa
}

const decreaseCart =  async (req, res) => {
    try {
        const cart = await Cart.findOne();
        const item = cart.items.id(req.params.id);
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1;
            await cart.save();
            res.json(item);
          } else {
            res.status(400).json({ error: 'Quantity cannot go below 1' });
          }
        } else {
          res.status(404).json({ error: 'Item not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to decrease item quantity' });
      }
}

export {addCart, getCart, increaseCart, decreaseCart};
