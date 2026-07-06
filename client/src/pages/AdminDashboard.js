import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
const [editId, setEditId] = useState("");
const [stats, setStats] = useState({
  totalBooks: 0,
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
    fetchOrders();
    fetchStats();
  }, []);
  const fetchStats = async () => {
  try {
    const res = await API.get("/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setStats(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBook = async (e) => {
  e.preventDefault();

  try {
    let imageUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      imageUrl = uploadRes.data.imageUrl;
    }

    if (editing) {
      await API.put(
        `/books/${editId}`,
        {
          title,
          author,
          category,
          price,
          ...(imageUrl && { image: imageUrl }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Book updated Successfully");
    } else {
      await API.post(
        "/books",
        {
          title,
          author,
          category,
          price,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Book Added Successfully");
    }

    setEditing(false);
    setEditId("");

    setTitle("");
    setAuthor("");
    setCategory("");
    setPrice("");
    setImage(null);

    fetchBooks();
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Operation Failed");
  }
};

  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Book Deleted");
      fetchBooks();
    } catch (error) {
      console.log(error);
      toast.success("Book deleted Successfully");
    }
  };
  const editBook = (book) => {
  setEditing(true);
  setEditId(book._id);

  setTitle(book.title);
  setAuthor(book.author);
  setCategory(book.category);
  setPrice(book.price);

  // Clear image selection. User can choose a new image if desired.
  setImage(null);
};

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("order status updated");
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row mb-4">

  <div className="col-md-3">
    <div className="card text-center bg-primary text-white">
      <div className="card-body">
        <h5>Total Books</h5>
        <h2>{stats.totalBooks}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center bg-success text-white">
      <div className="card-body">
        <h5>Total Users</h5>
        <h2>{stats.totalUsers}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center bg-warning text-dark">
      <div className="card-body">
        <h5>Total Orders</h5>
        <h2>{stats.totalOrders}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center bg-danger text-white">
      <div className="card-body">
        <h5>Total Revenue</h5>
        <h2>₹{stats.totalRevenue}</h2>
      </div>
    </div>
  </div>

</div>

      <div className="card p-4 mb-5">
        <h3>{editing ? "Edit Book" : "Add New Book"}</h3>

        <form onSubmit={addBook}>
          <input
            className="form-control mb-3"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" className="btn btn-success">
  {editing ? "Update Book" : "Add Book"}
</button>
{editing && (
  <button
    type="button"
    className="btn btn-secondary ms-2"
    onClick={() => {
      setEditing(false);
      setEditId("");
      setTitle("");
      setAuthor("");
      setCategory("");
      setPrice("");
      setImage(null);
    }}
  >
    Cancel
  </button>
)}
        </form>
      </div>

      <h3>Books</h3>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <div key={book._id} className="card p-3 mb-3">
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: "120px",
                  height: "170px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
            )}

            <h5>{book.title}</h5>

            <p><strong>Author:</strong> {book.author}</p>

            <p><strong>Category:</strong> {book.category}</p>

            <p><strong>Price:</strong> ₹{book.price}</p>

            <div className="d-flex gap-2">
  <button
    className="btn btn-warning"
    onClick={() => editBook(book)}
  >
    Edit
  </button>

  <button
    className="btn btn-danger"
    onClick={() => deleteBook(book._id)}
  >
    Delete
  </button>
</div>
          </div>
        ))
      )}

      <hr className="my-5" />

      <h3>Customer Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card p-3 mb-3">

            <p>
              <strong>Customer:</strong> {order.user?.name}
            </p>

            <p>
              <strong>Email:</strong> {order.user?.email}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalPrice}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <select
              className="form-select"
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;