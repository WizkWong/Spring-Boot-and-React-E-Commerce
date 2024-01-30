import defaultImg from "../../assets/default.jpg";
import QuantityBtn from "./QuantityBtn";
import CheckBox from "./CheckBox";
import { CustomerCart } from "../../types/User";

const CartTable = ({
  cartList,
  selected,
  setSelected,
}: {
  cartList: CustomerCart[];
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  return (
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
  );
};

export default CartTable;
