import { UserType } from './User';

interface TransactionType {
  _id?: string;
  slug: string; // login, logout, addProduct, removeProduct
  userId: UserType;
  createdAt: Date;
}

export { TransactionType };
