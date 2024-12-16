E-Commerce Backend

This repository contains the backend API for the E-Commerce platform, developed using Node.js and MongoDB. The API provides features for user authentication, product management, cart operations, and order processing.

Features
Admin Authentication (Registration, Login)

Product Management (CRUD operations)

Shopping Cart Functionality

Technologies Used

Node.js: JavaScript runtime environment

Express.js: Web framework for Node.js

MongoDB: NoSQL database for storing data

Mongoose: ODM library for MongoDB

dotenv: For environment variable management

bcrypt: For password hashing

jsonwebtoken (JWT): For authentication and authorization

Installation and Setup

Prerequisites

Ensure you have the following installed on your machine:

Node.js (version 14 or above)

MongoDB

Steps

Clone the Repository

git clone https://github.com/Olamilesi1/e-commerce-backend.git
cd e-commerce-backend

Install Dependencies

npm install

Set Up Environment Variables

Create a .env file in the root directory and configure the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=7000
``

Replace `your_mongodb_connection_string` and `your_jwt_secret_key` with your actual values.

Start the Server

npm start

The API will be running at http://localhost:7000.

API Endpoints

Authentication

POST /admin/register: Register a new user

POST /admin/login: Log in a user

Product Management

GET /product/products: Retrieve all products

GET /product/products/:id: Retrieve a single product by ID

POST /product/products: Add a new product

PUT /product/products/:id: Update an existing product

DELETE /products/:id: Delete a product

Cart

GET /cart/cart: Get items in the cart

POST /cart/cart: Add an item to the cart

PUT /cart/cart/increase/:id: Increase the quantity of an item in the cart

PUT /cart/cart/decrease/:id: Decrease the quantity of an item in the cart

DELETE /cart/cart/:id: Remove an item from the cart

Folder Structure

.
├── controllers   # API route handlers
├── models        # Mongoose models
├── routes        # Express routes
├── middleware    # Custom middleware (e.g., auth)
├── utils         # Utility functions
├── config        # Configuration files
├── .env          # Environment variables (not included in version control)
├── server.js     # Entry point of the application

Future Enhancements

Implement payment gateway integration

Add more detailed analytics and reporting features

Optimize database queries and implement caching

Contributing

Contributions are welcome! Follow these steps:

Fork the repository

Create a new branch: git checkout -b feature-name

Make your changes and commit: git commit -m 'Add some feature'

Push to the branch: git push origin feature-name

Submit a pull request
