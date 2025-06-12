import { ProductType } from './Product';
import { UserType } from './User';

interface TransactionType {
  _id?: string;
  slug: string; // login, logout, addProduct, removeProduct
  userId: UserType;
  createdAt: Date;
  productId: ProductType | null;
}

export { TransactionType };
