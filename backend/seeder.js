// scrip that runs to seed all data into the DB
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

// function to import all data
const importData = async () => {
  try {
    await Order.deleteMany(); // deletes multiple records
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users); // insert users
    const adminUser = createdUsers[0]._id; //get admin user

    //create var with all the products and the admin user
    const sampleProducts = products.map((products) => {
      return { ...products, user: adminUser };
    });

    // call insertMany on the Product model and pass in sample products to DB
    await Product.insertMany(sampleProducts);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany(); // deletes multiple records
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
