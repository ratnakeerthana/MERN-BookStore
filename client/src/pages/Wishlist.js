import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load wishlist");
    }
  };

  const removeBook = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Book removed from wishlist");
      fetchWishlist();
    } catch (error) {
      toast.error("Failed to remove book");
    }
  };

  return (
    <div className="container mt-4">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} className="card p-3 mb-3">
            <div className="row">
              <div className="col-md-2">
                <img
                  src={item.book.image}
                  alt={item.book.title}
                  className="img-fluid"
                />
              </div>

              <div className="col-md-8">
                <h4>{item.book.title}</h4>
                <p>{item.book.author}</p>
                <h5 className="text-success">
                  ₹{item.book.price}
                </h5>
              </div>

              <div className="col-md-2 d-flex align-items-center">
                <button
                  className="btn btn-danger"
                  onClick={() => removeBook(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;