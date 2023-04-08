interface User{
  username: string,
  password: string,
  confirmPassword?: string,
  email: string,
  phoneNo: string,
}

export interface Customer{
  user: User
  dob: string,
}