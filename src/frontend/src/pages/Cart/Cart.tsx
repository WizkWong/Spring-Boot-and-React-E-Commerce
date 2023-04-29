import { useEffect, useState } from "react";
import { CustomerCart } from "../../types/User";
import CustomerService from "../../services/CustomerService";

const Cart = () => {
  const [cartList, setCartList] = useState<CustomerCart[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: { data: CustomerCart[] } = await CustomerService.getCart();
        setCartList(data);
        console.log(cartList)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <div>CustomerCart</div>;
};

export default Cart;
