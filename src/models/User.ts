import mongoose from 'mongoose';
import { UserType } from '../interfaces/User';

const userSchema = new mongoose.Schema<UserType>({
  email: String,
  password: String,
  firstName: String,
  birthdate: Date,
  registrationDate: Date,
  verificationDate: Date,
  verificationToken: String,
  lastName: String,
  address: String,
  zip: String,
  city: String,
  phone: String,
  accountType: String,
  token: String,
  stripeId: String,
  favoriteProductsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  cartId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

export { User };
