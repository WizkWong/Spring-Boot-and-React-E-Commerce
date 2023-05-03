import { useContext, useEffect, useState } from "react";
import { CustomerCart } from "../../types/User";
import minusIcon from "../../assets/minus_icon.svg";
import plusIcon from "../../assets/plus_icon.svg";
import { CartContext } from "./Cart";

const QuantityBtn = ({ cartItem, index }: { cartItem: CustomerCart, index: number }) => {

  const [cartList, setCartList, update, isUpdate] = useContext(CartContext);
  const [qty, setQty] = useState(cartItem.quantity);

  useEffect(() => {
    if (update) {
      // copy cart list
      const newCartList = [...cartList];
      // update cartItem before override the index of newCartList
      cartItem.quantity = qty;
      newCartList[index] = cartItem;
      // update the cartList
      setCartList(newCartList);
    }
  }, [qty]);

  const setQuantity = (quantity: number) => {
    if (!isNaN(quantity) && quantity >= 0 && quantity <= 99) {
      setQty(quantity);
      isUpdate(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value);
  };
  const minusQty = () => {
    setQuantity(qty - 1);
  };
  const plusQty = () => {
    setQuantity(qty + 1);
  };
  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="flex w-8 h-8 border-y-2 border-l-2 border-black rounded-l-md items-center justify-center"
        onClick={minusQty}
      >
        <img className="p-1 max-w-full max-h-full" src={minusIcon}></img>
      </button>
      <input
        className="w-12 h-8 text-center border-2 border-black"
        type="text"
        value={qty}
        onChange={handleChange}
      ></input>
      <button
        className="flex w-8 h-8 border-y-2 border-r-2 border-black rounded-r-md items-center justify-center"
        onClick={plusQty}
      >
        <img className="p-1 max-w-full max-h-full" src={plusIcon}></img>
      </button>
    </div>
  );
};

export default QuantityBtn;
