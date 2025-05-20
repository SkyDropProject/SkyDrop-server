import mongoose from 'mongoose';
import { UserType } from '../interfaces/User';

const userSchema = new mongoose.Schema<UserType>({
  email: String,
  password: String,
  firstName: String,
  registrationDate: Date,
  verificationDate: Date,
  lastName: String,
  address: String,
  zip: String,
  city: String,
  phone: String,
  accountType: String,
  token: String,
  stripeId: String,
  favoriteProductsId: Array<String>,
});

let User = mongoose.model('User', userSchema);

export { User };
