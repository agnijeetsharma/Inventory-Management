import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  image_url: { type: String },
  description: { type: String },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
