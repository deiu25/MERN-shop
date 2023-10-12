import Product from "../models/product.js";
import dotenv from "dotenv";
import connectDatabase from "../config/database.js";

import products from "../data/products.js";

//Setting up config file
dotenv.config({ path: '.env' });

//Connecting to database
connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted.");

    await Product.insertMany(products);
    console.log("All Products are added.");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();