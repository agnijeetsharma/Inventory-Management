import Product from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, type, sku, image_url, description, quantity, price } = req.body;

  if (!name || !type || !sku || !price) {
    return res
      .status(400)
      .json({
        error: "All fields are required except image_url and description",
      });
  }

  try {
    const product = new Product({
      name,
      type,
      sku,
      image_url,
      description,
      quantity,
      price,
    });

    await product.save();
    return res
      .status(201)
      .json({
        message: "Product created successfully",
        product_id: product._id,
      });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Product.countDocuments();
  const products = await Product.find().skip(skip).limit(limit);

  return res.status(200).json({
    total,
    page,
    totalPages: Math.ceil(total / limit),
    products,
  });
});

const updateProductQuantity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!Number.isInteger(quantity) || quantity < 0) {
  return res.status(400).json({ error: "Quantity must be a non-negative integer" });
}
  
  const product = await Product.findByIdAndUpdate(
    id,
    { quantity },
    { new: true }
  );
  if (!product) return res.status(404).json({ message: "Product not found" });
  return res.status(200).json(product);
});

export { addProduct, getProducts, updateProductQuantity };
