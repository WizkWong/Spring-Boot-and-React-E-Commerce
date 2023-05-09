import { Customer, CustomerValidation } from "../types/User";
import isBefore from "./isBefore";

const validateCustomer = ({
  username,
  email,
  phoneNo,
  dob,
}: {
  username: string;
  email: string;
  phoneNo: string;
  dob: string;
}): CustomerValidation => {
  const errors: CustomerValidation = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,6}$/i;

  if (!username) {
    errors.username = "Username is required";
  } else if (username.length < 4) {
    errors.username = "Username must be at least 4 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!email.match(emailRegex)) {
    errors.email = "Email is not valid";
  }

  if (!phoneNo) {
    errors.phoneNo = "Phone Number is required";
  }

  if (!dob) {
    errors.dob = "Date of Birth is required";
  } else if (!isBefore(dob, new Date())) {
    errors.dob = "Date of Birth cannot exceed the current Date";
  }
  return errors;
};

export default validateCustomer;
