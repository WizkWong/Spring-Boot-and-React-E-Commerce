import { CustomerCart } from "../../types/User";

const CheckBox = ({
  cartItem,
  selected,
  setSelected,
}: {
  cartItem: CustomerCart;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  // for checkbox onClick
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const productId = Number(value);
    if (checked) {
      // add an id into list
      setSelected([...selected, productId]);
    } else if (!checked) {
      // remove an id from list
      setSelected(selected.filter((id) => id !== productId));
    }
  };

  return (
    <label className="ml-2">
      <input
        type="checkbox"
        name="check"
        value={cartItem.product.id}
        checked={selected.includes(cartItem.product.id)}
        onChange={handleChange}
      ></input>
    </label>
  );
};

export default CheckBox;
