import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BookCard({ book }) {

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExists = cart.find((item) => item._id === book._id);

    if (alreadyExists) {
      toast.success("Book already added to cart");
      return;
    }

    cart.push(book);

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.info("Book already added to cart");
  };

  return (
    <div className="card h-100 shadow border-0">
      <img
        src={book.image || "https://via.placeholder.com/250x300?text=No+Image"}
        className="card-img-top"
        alt={book.title}
        style={{ height: "300px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>

        <p className="text-muted">{book.author}</p>

        <p>
          <strong>Category:</strong> {book.category}
        </p>

        <h5 className="text-success">₹{book.price}</h5>

        <div className="mt-auto">
          <Link
            to={`/book/${book._id}`}
            className="btn btn-primary me-2"
          >
            View Details
          </Link>

          <button
            className="btn btn-success"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;