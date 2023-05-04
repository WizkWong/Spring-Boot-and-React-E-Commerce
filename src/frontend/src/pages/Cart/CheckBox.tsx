import { CustomerCart } from "../../types/User";

const CheckBox = ({
  cartItem,
  handleChange,
}: {
  cartItem: CustomerCart;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="ml-2">
      <input
        type="checkbox"
        name="check"
        value={cartItem.product.product_id}
        onChange={handleChange}
      ></input>
    </label>
  );
};

export default CheckBox;
