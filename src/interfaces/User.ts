interface UserType {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  registrationDate: Date;
  verificationDate?: Date;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  phone: string;
  accountType: string;
  token?: string;
  stripeId?: string;
  favoriteProductsId: Array<string>;
}

export { UserType };
