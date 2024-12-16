//import authentication dependencies
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import responseMessages from "../views/responseMessages.js";
import httpStatus from "http-status";
import { registerSchema } from "../validations/adminValidation.js";
import adminValidateSchema from "../utils/adminValidateSchema.js";
import { response } from "express";

//admins registration controller using joi validation
const adminReg = async (req, res) => {
  const { error } = adminValidateSchema(registerSchema, req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
  const { username, email, password } = req.body;

  //check if the admin is already registered
  try {
    //find out if the admin is already registered
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({
        message: responseMessages.userExists,
      });
    } else {
      // Check if admin username already exists
      admin = await Admin.findOne({ username: username });
      if (admin) {
        return res.status(httpStatus.CONFLICT).json({
          status: "error",
          message: "Username is already in use",
        });
      }

      //create admin and save details to database
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new admin
      admin = new Admin({ username, email, password: hashedPassword });
      await admin.save();

      res.status(201).json({
        message: responseMessages.userRegistered,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred during registration",
    });
  }
};

//admin login controller
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //checking if the admin exists
    let adminExists = await Admin.findOne({ email });

    if (!adminExists) {
      res.status(404).json({
        message: responseMessages.invalidCredentials,
      });
    }

    //checking if password is correct
    const confirmedPassword = await bcrypt.compare(
      password,
      adminExists.password
    );

    if (!confirmedPassword) {
      res.status(401).json({
        message: responseMessages.invalidCredentials,
      });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: adminExists._id, email: adminExists.email },
      process.env.JWT_SECRET,
      { expiresIn: "2m" } // Token expiration time
    );

    //send success message if credentials are correct
    res.status(200).json({
      message: responseMessages.loginSuccess,
      userData: adminExists,
      authToken: token,
    });
  } catch (error) {
    console.error(error);
  }
};

export { adminReg, adminLogin };
