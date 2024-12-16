import httpStatus from "http-status";
import Product from "../models/productsModel.js";
import { productValidationSchema } from "../validations/productsValidation.js";

const uploadProduct = async (req, res) => {
  // Validate the request data using Joi
  const { error, value } = productValidationSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  const { name, price, description, status, title } = value;

  try {
    // Check if the product already exists
    let product = await Product.findOne({ title });
    if (product) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "Product with this title already exists",
      });
    }

    // Create a new product
    product = new Product({
      name,
      price,
      description,
      status,
      title,
    });

    // Save the product to the database
    product = await product.save();

    return res.status(httpStatus.CREATED).json({
      status: "success",
      message: "Product uploaded successfully",
      productData: product,
      
    });
    
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while uploading the product",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Replace with your DB query
    if (!product) return res.status(404).send({ message: "Product not found" });
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Error fetching product", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id; // Extract the id from the request parameters
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID: product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  const { name, status, price, description } = req.body;
  const { id } = req.params;
  const image = req.file ? req.file.filename : null;

  console.log("Request Body:", req.body); // Debugging line
  console.log("Uploaded File:", req.file); // Debugging line

  try {
    // Check if the blog exists
    const productExists = await Product.findById(id);
    if (!productExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Product not found",
      });
    }

    // Check if the name already exists for another blog
    if (name) {
      const nameExists = await Product.findOne({ name });
      if (nameExists && nameExists._id.toString() !== id) {
        return res.status(httpStatus.CONFLICT).json({
          status: "error",
          message: "Another product has this name already",
        });
      }
    }

    // Prepare the update object
    const updateData = {};
    if (image) updateData.image = image;
    if (name) updateData.name = name;
    if (status) updateData.status = status;
    if (price) updateData.price = price;
    if (description) updateData.description = description;

    console.log("Update Data:", updateData); // Debugging line

    // Update the product data
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true } // Return the updated document
    );

    // Send response with updated blog data
    return res.status(httpStatus.OK).json({
      status: "success",
      updatedData: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

export { uploadProduct, getProducts, getProduct, deleteProduct, updateProduct };
