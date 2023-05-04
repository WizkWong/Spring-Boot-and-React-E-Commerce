import { useState } from "react";

const useRemoveCart = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const productId = Number(value);
    if (checked) {
      setSelected([...selected, productId]);
    } else if (!checked) {
      setSelected(selected.filter((id) => id !== productId));
    }
  };

  return [handleCheckBoxChange] as const;
};

export default useRemoveCart;
