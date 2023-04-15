import { useEffect, useState } from "react";
import { Customer, CustomerValidation } from "../../types/User";
import CustomerService from "../../services/CustomerService";
import { useNavigate } from "react-router-dom";
import isBefore from "../../utils.ts/isBefore";

const useSignUp = () => {
  const [customer, setCustomer] = useState<Customer>({
    user: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNo: "",
    },
    dob: "",
  });
  const [formErrors, setFormErrors] = useState<CustomerValidation>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, user: { ...customer.user, [name]: value } });
  };

  const handleChangeDob = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const validation = (customer: Customer): CustomerValidation => {
    const errors: CustomerValidation = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,6}$/i;

    if (!customer.user.username) {
      errors.username = "Username is required";
    } else if (customer.user.username.length < 4) {
      errors.username = "Username must be at least 4 characters";
    }

    if (!customer.user.password) {
      errors.password = "Password is required";
    } else if (customer.user.password.length < 8) {
      errors.confirmPassword = "Password must be at least 8 characters";
    } else if (customer.user.password !== customer.user.confirmPassword) {
      errors.confirmPassword = "Confirm Password must be same as Password";
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

  const saveCustomer = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFormErrors(validation(customer));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      CustomerService.register(customer)
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          if (error.response.data.message === "User is taken") {
            setFormErrors({ ...formErrors, username: "Username is taken" });
          } else {
            console.log(error);
            alert("The server has occur an error, please try again next time");
          }
        });
    }
  }, [formErrors]);

  return [
    customer,
    formErrors,
    handleChangeUser,
    handleChangeDob,
    saveCustomer,
  ] as const;
};

export default useSignUp;
