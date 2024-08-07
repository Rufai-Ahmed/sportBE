import { Request } from "express";
import { Document } from "mongoose";

export interface iUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  number: string;
  address: string;
  gender: string;
  DOB: string;
  cart: Array<{}>;
  products: Array<{}>;
  verify: boolean;
  verifyCode: string;
}

export interface iProduct extends Document {
  name: string;
  price: number;
  quantity: number;
  image: string;
  rate: 0 | 1 | 2 | 3 | 4 | 5;
  imageID: string;
  category: string;
  isAvailable: boolean;
}

export interface iRequest extends Request {
  user: {};
}
