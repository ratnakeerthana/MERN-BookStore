import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [averageRating, setAverageRating] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
  fetchBook();
  fetchReviews();
  fetchAverageRating();
  fetchRecommendedBooks();
}, [
  fetchBook,
  fetchReviews,
  fetchAverageRating,
  fetchRecommendedBooks,
]);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecommendedBooks = async () => {
    try {
      const res = await API.get(`/books/recommended/${id}`);
      setRecommendedBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const res = await API.get(`/reviews/average/${id}`);
      setAverageRating(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async () => {
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter your review");
      return;
    }

    try {
      await API.post(
        "/reviews",
        {
          book: id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review Added Successfully");

      setRating(5);
      setComment("");

      fetchReviews();
      fetchAverageRating();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    }
  };

 const addToCart = () => {
  console.log("Current book:", book);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart before:", cart);

  const exists = cart.some((item) => {
    console.log("Comparing:", item._id, "with", book._id);
    return String(item._id) === String(book._id);
  });

  console.log("Exists:", exists);

  if (exists) {
    toast.info("Book already added to cart");
    return;
  }

  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Cart after:", cart);

  toast.success("Book added to cart");
};
  const addToWishlist = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      await API.post(
        "/wishlist",
        {
          book: book._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Book added to wishlist ❤️");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  };

  // ✅ FIXED: reserveBook moved here (correct scope)
  const reserveBook = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      await API.post(
        "/reservations",
        {
          book: book._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Book reserved successfully 📚");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reserve book"
      );
    }
  };

  if (!book) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-5">
          <img
            src={book.image || "https://via.placeholder.com/350x500"}
            alt={book.title}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-7">

          <h2>{book.title}</h2>

          <div className="mb-3">
            <h5 className="text-warning">
              ⭐ {averageRating.averageRating} / 5
            </h5>
            <p className="text-muted">
              ({averageRating.totalReviews} Reviews)
            </p>
          </div>

          <h5>Author: {book.author}</h5>
          <h5>Category: {book.category}</h5>

          <h4 className="text-success mb-3">
            ₹{book.price}
          </h4>

          <p>{book.description}</p>

          <h5>Stock: {book.stock}</h5>

          <div className="mt-3 d-flex gap-3 flex-wrap">
            <button className="btn btn-success" onClick={addToCart}>
              🛒 Add to Cart
            </button>

            <button className="btn btn-danger" onClick={addToWishlist}>
              ❤️ Add to Wishlist
            </button>

            <button className="btn btn-warning" onClick={reserveBook}>
              📚 Reserve Book
            </button>
          </div>

        </div>
      </div>

      <hr className="my-5" />

      <h3>⭐ Customer Reviews</h3>

      <div className="card p-4 mb-4">
        <h5 className="mb-3">Write a Review</h5>

        <select
          className="form-select mb-3"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="btn btn-primary" onClick={submitReview}>
          Submit Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="card p-3 mb-3 shadow-sm">
            <h5>{review.user?.name}</h5>
            <p style={{ fontSize: "20px" }}>
              {"⭐".repeat(review.rating)}
            </p>
            <p>{review.comment}</p>
            <small className="text-muted">
              {new Date(review.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      )}

      <hr className="my-5" />

      <h3 className="mb-4">📚 You May Also Like</h3>

      <div className="row">
        {recommendedBooks.length === 0 ? (
          <p>No recommendations available.</p>
        ) : (
          recommendedBooks.map((item) => (
            <div className="col-md-3 mb-4" key={item._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image || "https://via.placeholder.com/250x300"}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{item.title}</h5>
                  <p>{item.author}</p>
                  <h6 className="text-success">₹{item.price}</h6>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookDetails;