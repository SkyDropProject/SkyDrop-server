interface UserType {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  birthdate: Date;
  registrationDate: Date;
  verificationDate?: Date;
  verificationToken?: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  phone: string;
  accountType: string;
  token?: string;
  stripeId?: string;
  favoriteProductsId: Array<string>;
  cartId: Array<string>;
}

export { UserType };
