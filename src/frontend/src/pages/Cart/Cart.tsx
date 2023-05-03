import { createContext, useEffect, useState } from "react";
import { CustomerCart } from "../../types/User";
import CustomerService from "../../services/CustomerService";
import defaultImg from "../../assets/default.jpg";
import QuantityBtn from "./QuantityBtn";

export const CartContext = createContext<any>(null);

const Cart = () => {
  const [cartList, setCartList] = useState<CustomerCart[]>([]);
  const [update, isUpdate] = useState(false);
  const [timer, setTimer] = useState(0);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await CustomerService.getCart();
        setCartList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // request API to update cart
  const updateCustomerCart = async () => {
    try {
      const { status } = await CustomerService.updateCart(cartList);
      console.log(status);
    } catch (error) {
      console.log(error);
    }
    setTimer(0);
  };

  // if cartList(quantity change) changes then reset the timer
  useEffect(() => {
    if (update) {
      clearTimeout(timer);
      // set a timer to execute update cart function
      setTimer(setTimeout(updateCustomerCart, 1500));
      isUpdate(false);
    }
  }, [cartList]);

  // execute update cart function if the user refresh the browser and its function is not execute yet
  window.onbeforeunload = () => {
    if (timer !== 0) {
      clearTimeout(timer);
      updateCustomerCart();
    }
  };

  const totalPrice = cartList.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
    0
  );

  return (
    <CartContext.Provider value={[cartList, setCartList, update, isUpdate]}>
      <div className="px-8 pb-24 my-4">
        <h1 className="mb-2 text-center text-3xl font-semibold">Your Cart</h1>
        <table className="min-w-full text-lg">
          <thead className="border-b-2">
            <tr>
              <th className="pb-4 text-left">Items</th>
              <th className="pb-4 px-1 text-left">Price</th>
              <th className="pb-4 px-1 text-center">Quantity</th>
              <th className="pb-4 px-1 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map((cartItem, index) => (
              <tr key={index} className="border-b-2">
                <td className="flex flex-row my-1 items-center">
                  <div className="flex-none flex mx-4 w-40 h-40 items-center justify-center">
                    <img
                      className="max-w-full max-h-full"
                      src={
                        cartItem.product.image
                          ? `data:image/jpeg;base64,${cartItem.product.image}`
                          : defaultImg
                      }
                    ></img>
                  </div>
                  <p className="flex-1">{cartItem.product.name}</p>
                </td>
                <td className="px-1 text-left">{cartItem.product.price}</td>
                <td className="px-1">
                  <QuantityBtn cartItem={cartItem} index={index} />
                </td>
                <td className="px-1 text-right">
                  {(cartItem.product.price * cartItem.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="fixed right-0 bottom-0 min-w-full h-24 bg-gray-50 shadow border-t-2 text-lg flex flex-row items-center justify-end">
          <p className="px-8">Sub Total: </p>
          <p className="px-1 mr-8">
            {import.meta.env.VITE_CURRENCY} {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </CartContext.Provider>
  );
};

export default Cart;
