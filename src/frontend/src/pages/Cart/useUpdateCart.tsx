import { useState, useEffect } from "react";
import { CustomerCart } from "../../types/User";
import CustomerService from "../../services/CustomerService";

const useUpdatecart = (
  cartList: CustomerCart[],
  isUpdate: boolean,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setIsProcess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [timer, setTimer] = useState(0);

  // request API to update cart
  const updateCustomerCart = async () => {
    try {
      const { status } = await CustomerService.updateCart(cartList);
      console.log(status);
    } catch (error) {
      console.log(error);
    }
    setIsProcess(false);
    setTimer(0);
  };

  // if cartList(quantity change) changes then reset the timer
  useEffect(() => {
    if (isUpdate) {
      setIsProcess(true);
      clearTimeout(timer);
      // set a timer to execute update cart function
      setTimer(setTimeout(updateCustomerCart, 1500));
      setIsUpdate(false);
    }
  }, [cartList]);

  // execute update cart function if the user refresh the browser and its function is not execute yet
  window.onbeforeunload = () => {
    if (timer !== 0) {
      clearTimeout(timer);
      updateCustomerCart();
    }
  };
};

export default useUpdatecart;
