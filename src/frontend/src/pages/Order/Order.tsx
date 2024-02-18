import { useEffect, useState } from "react";
import { CustomerOrder } from "../../types/User";
import CustomerService from "../../services/CustomerService";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  type CustomerOrderByDate = Map<string, CustomerOrder[]>;
  const [orderDateList, setOrderDateList] = useState<CustomerOrderByDate>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await CustomerService.getOrders();

        const map: CustomerOrderByDate = new Map<string, CustomerOrder[]>();
        data.forEach((order) => {
          const date: Date = new Date(order.orderDateTime);
          const dateString: string = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
          if (map.has(dateString)) {
            map.get(dateString)?.push(order);
          } else {
            const customerOrder: CustomerOrder[] = [order];
            map.set(dateString, customerOrder);
          }
        });
        setOrderDateList(map);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="m-4">
      <h1 className="mb-3 text-4xl font-bold font-mono">Order History</h1>
      <table className="border-collapse min-w-full">
        <thead>
          <tr className="h-12 border-[1.5px]">
            <th>Order Number</th>
            <th>Price</th>
            <th>Total Items</th>
            <th>Total Unique Items</th>
            <th>Order Date</th>
            <th></th>
          </tr>
        </thead>
        {orderDateList &&
          Array.from(orderDateList).map(([date, orders], index) => (
            <tbody key={index}>
              <tr>
                <td colSpan={6} className="py-3 text-2xl font-semibold">
                  {date}
                </td>
              </tr>
              {orders.map((order, index) => (
                <tr
                  key={index} 
                  className="h-12 last:shadow-md border-[1.5px] text-center hover:cursor-pointer" 
                  onClick={() => {navigate(`${order.id}`, { relative: "path" })}}
                >
                  <td>{order.id}</td>
                  <td>{import.meta.env.VITE_CURRENCY} {order.totalPrice}</td>
                  <td>{order.totalItems}</td>
                  <td>{order.totalUniqueItems}</td>
                  <td>{order.orderDateTime}</td>
                  <td className="w-16 text-xl">&gt;</td>
                </tr>
              ))}
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default Order;
