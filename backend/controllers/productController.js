import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc   Fetch all products
// @route  GET /appi/procuts
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  // get all products from the database
  const products = await Product.find({}); //pass in empty object to grab all
  res.json(products);
});

// @desc   Fetch all products
// @route  GET /appi/procuts
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProductById, getProducts };
