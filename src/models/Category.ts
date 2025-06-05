import mongoose from 'mongoose';
import { CategoryType } from '../interfaces/Category';

const categorySchema = new mongoose.Schema<CategoryType>({
  name: String,
});

const Category = mongoose.model('Category', categorySchema);

export { Category };
