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
