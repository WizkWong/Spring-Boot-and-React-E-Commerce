import { useEffect, useState } from "react";
import CustomerService from "../../../services/CustomerService";
import { useNavigate, useParams } from "react-router-dom";
import defaultImg from "../../../assets/default.jpg";
import { CustomerOrderItem } from "../../../types/User";

const OrderDetail = () => {
  const params = useParams();
  const orderId = Number(params.id);
  const navigate = useNavigate();
  const [orderItemList, setOrderItemList] = useState<CustomerOrderItem[]>([]);

  useEffect(() => {
    if (isNaN(orderId)) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const { data } = await CustomerService.getOrderItems(orderId);
        setOrderItemList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-8 my-4">
      <h1 className="mb-2 text-center text-3xl font-semibold">Order Detail #{orderId}</h1>
      <table className="min-w-full text-lg">
        <thead className="border-b-2">
          <tr>
            <th className="pb-4 text-left">Items</th>
            <th className="pb-4 px-1 text-left">Price</th>
            <th className="pb-4 px-8 text-center">Quantity</th>
            <th className="pb-4 px-1 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderItemList.map((cartItem, index) => (
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
              <td className="px-1 text-left">
                {import.meta.env.VITE_CURRENCY} {cartItem.product.price}
              </td>
              <td className="px-1 text-center">{cartItem.quantity}</td>
              <td className="px-1 text-right">
                {import.meta.env.VITE_CURRENCY} {(cartItem.product.price * cartItem.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
