import Cart from "../models/cartModel.js";

const addCart = async (req, res) => {
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
      cart.items.push({ name, price, image, quantity: 1 });
    }

    await cart.save();
    res.status(200).json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
      await cart.save();
    }
    res.status(200).json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

const increaseCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.id(req.params.id);
    if (item) {
      item.quantity += 1;
      await cart.save();
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to increase item quantity" });
  }
};

const decreaseCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.id(req.params.id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        await cart.save();
        res.status(200).json(item);
      } else {
        res.status(400).json({ error: "Quantity cannot go below 1" });
      }
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to decrease item quantity" });
  }
};

export { addCart, getCart, increaseCart, decreaseCart };
