import { CategoryType } from './Category';

interface ProductType {
  name: string;
  price: number;
  description: string;
  stock: number;
  weight: number;
  categoryId: string | CategoryType;
}

export { ProductType };
