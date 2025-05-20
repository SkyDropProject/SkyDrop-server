import mongoose from 'mongoose';
import { ProductType } from '../interfaces/Product';

const productSchema = new mongoose.Schema<ProductType>({
  name: String,
  price: Number,
  description: String,
  stock: Number,
  weight: Number,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

let Product = mongoose.model('Product', productSchema);

export { Product };
