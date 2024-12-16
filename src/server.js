import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import httpStatus from "http-status";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import colors from "colors";
import Adminrouter from "./routes/adminRoutes.js";
import Productsrouter from "./routes/productsRoutes.js";
import Cartsrouter from "./routes/cartRoutes.js";
import path from 'path'

// importing all functions and middlewares
import { dbConnection } from "./config/dbConnection.js";

// creating an instance of express
const app = express();

// load our environment variables from the .env
// 1. configure dotenv
dotenv.config();

// 2. destructure and call our environment variables from .env
const { PORT, NODE_ENV } = process.env;

// declare our servers's or express app general use
app.use(bodyParser.json());

app.use(cors());

app.use(helmet());

// give condition to use morgan
if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome to my organization server!",
  });
});

// admin base routes
app.use("/admins", Adminrouter);

//products base routes
app.use("/product", Productsrouter)

//cart
app.use("/cart", Cartsrouter)
  
//connecting to the database
dbConnection()
  .then(() => {
    console.log("Database connection established".bgMagenta);

    // setting a port for our server to listen on
    app.listen(PORT, () => {
      console.log(`Our sever is listening on ${PORT} in ${NODE_ENV}`.cyan);
    });
  })
  .catch((error) => {
    console.error(`Database connection error: ${error}`);
  });
