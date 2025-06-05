import { CategoryType } from './Category';

interface ProductType {
  _id?: string;
  imageUrl:string;
  name: string;
  price: number;
  description: string;
  stock: number;
  weight: number;
  star:boolean;
  categoryId: CategoryType | string;
}

export { ProductType };
