import { createContext, useEffect, useMemo, useState } from "react";
import { CustomerCart } from "../../types/User";
import CustomerService from "../../services/CustomerService";
import defaultImg from "../../assets/default.jpg";
import QuantityBtn from "./QuantityBtn";
import CheckBox from "./CheckBox";
import useRemoveCart from "./useRemoveCart";
import useUpdateCart from "./useUpdateCart";

export const CartContext = createContext<any>(null);

const Cart = () => {
  const [cartList, setCartList] = useState<CustomerCart[]>([]);
  const [update, isUpdate] = useState(false);

  const [selected, setSelected, removeCartItemBtn, isHiddenBtn] = useRemoveCart(cartList, setCartList);
  useUpdateCart(cartList, update, isUpdate);

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

  const totalPrice = useMemo(
    () =>
      cartList.reduce(
        (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
        0
      ),
    [cartList]
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
                  <CheckBox
                    cartItem={cartItem}
                    selected={selected}
                    setSelected={setSelected}
                  />
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
        <div className="fixed right-0 bottom-0 min-w-full h-24 bg-gray-50 shadow border-t-2 flex flex-row items-center">
          <div className="flex-1 flex flex-row items-center justify-start">
            <button
              className="ml-8 rounded text-white font-semibold bg-orange-600 px-3 py-2 hover:cursor-pointer"
              hidden={isHiddenBtn}
              onClick={removeCartItemBtn}
            >
              Remove Selected Items
            </button>
          </div>
          <div className="flex-1 flex flex-row items-center justify-end text-lg">
            <p className="px-8">Sub Total: </p>
            <p className="px-1 mr-8">
              {import.meta.env.VITE_CURRENCY} {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
};

export default Cart;
