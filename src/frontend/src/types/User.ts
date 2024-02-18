import { ProductType } from "./Product";

interface User {
  username: string;
  password: string;
  confirmPassword?: string;
  email: string;
  phoneNo: string;
}

export interface Customer {
  user: User;
  dob: string;
}

export interface CustomerAuth {
  username: string;
  password: string;
}

export interface CustomerValidation {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  phoneNo?: string;
  dob?: string;
}

export interface CustomerProfile {
  customer_id: number;
  username: string;
  age: number;
  dob: string;
  email: string;
  phoneNo: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordValidation {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface CustomerCart {
  product: ProductType;
  quantity: number;
}

export interface CustomerOrder {
  id : number;
  totalPrice : number;
  totalUniqueItems : number;
  totalItems : number;
  orderDateTime : string;
}

export interface CustomerOrderItem {
  product: ProductType;
  quantity: number;
}
