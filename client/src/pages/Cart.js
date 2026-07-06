import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.success("Please login first");
        navigate("/login");
        return;
      }

      const books = cart.map((item) => ({
        book: item._id,
        quantity: 1,
      }));

      await API.post(
        "/orders",
        {
          books,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("order placed succesfully");
      localStorage.removeItem("cart");
      setCart([]);

      navigate("/orders");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <h4>Your Cart is Empty</h4>
      ) : (
        <>
          {cart.map((book) => (
            <div key={book._id} className="card p-3 mb-3">
              <h4>{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>Price: ₹{book.price}</p>

              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(book._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <hr />

          <h3>Total: ₹{totalPrice}</h3>

          <button
            className="btn btn-success"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;