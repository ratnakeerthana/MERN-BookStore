import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <h4>No Orders Found</h4>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card p-3 mb-3">
            <h5>Order ID: {order._id}</h5>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total Price:</strong> ₹{order.totalPrice}
            </p>

            <h6>Books:</h6>

            <ul>
              {order.books.map((item, index) => (
                <li key={index}>
                  {item.book?.title} (Qty: {item.quantity})
                </li>
              ))}
            </ul>

            <small>
              Ordered On:{" "}
              {new Date(order.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;