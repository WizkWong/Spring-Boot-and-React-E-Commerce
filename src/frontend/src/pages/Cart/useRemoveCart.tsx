import { useEffect, useState } from "react";
import { CustomerCart } from "../../types/User";
import CustomerService from "../../services/CustomerService";

const useRemoveCart = (
  cartList: CustomerCart[],
  setCartList: React.Dispatch<React.SetStateAction<CustomerCart[]>>,
  setIsProcess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [isHiddenBtn, setIsHiddenBtn] = useState(true);

  useEffect(() => {
    if (selected.length === 0) {
      setIsHiddenBtn(true);
    } else {
      setIsHiddenBtn(false);
    }
  }, [selected]);

  const removeCartItemBtn = () => {
    setIsProcess(true);
    // split cartList into two list (first list met condition while second list does not)
    const [deletedCartList, newCartList]: [CustomerCart[], CustomerCart[]] =
      cartList.reduce(
        ([d, n]: [CustomerCart[], CustomerCart[]], cartItem) => {
          return selected.includes(cartItem.product.product_id)
            ? [[...d, cartItem], n] // if true then add into deleted List
            : [d, [...n, cartItem]]; // if false then add into new List
        },
        [[], []]
      );
    // request API to delete request cart item
    const removeCartItem = async () => {
      try {
        const { status } = await CustomerService.deleteCartItem(deletedCartList);
        console.log(status);
        setCartList(newCartList);
        setSelected([]);
      } catch (error) {
        console.log(error);
      }
      setIsProcess(false);
    };
    removeCartItem();
  };

  return [selected, setSelected, removeCartItemBtn, isHiddenBtn] as const;
};

export default useRemoveCart;
