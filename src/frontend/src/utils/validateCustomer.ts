import { Customer, CustomerValidation } from "../types/User";
import isBefore from "./isBefore";

const validateCustomer = (customer: Customer): CustomerValidation => {
  const errors: CustomerValidation = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,6}$/i;

  if (!customer.user.username) {
    errors.username = "Username is required";
  } else if (customer.user.username.length < 4) {
    errors.username = "Username must be at least 4 characters";
  }

  if (!customer.user.email) {
    errors.email = "Email is required";
  } else if (!customer.user.email.match(emailRegex)) {
    errors.email = "Email is not valid";
  }

  if (!customer.user.phoneNo) {
    errors.phoneNo = "Phone Number is required";
  }

  if (!customer.dob) {
    errors.dob = "Date of Birth is required";
  } else if (!isBefore(customer.dob, new Date())) {
    errors.dob = "Date of Birth cannot exceed the current Date";
  }
  return errors;
};

export default validateCustomer;
