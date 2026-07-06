import { useEffect, useState } from "react";
import API from "../services/api";
import BookList from "../components/BookList";
import { toast } from "react-toastify";

<button
  className="btn btn-primary"
  onClick={() => toast.success("Toast is working!")}
>
  Test Toast
</button>

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      {/* Hero Section */}
      <div className="bg-primary text-white rounded p-5 text-center shadow mb-5">
        <h1>📚 Welcome to Book Store</h1>
        <p className="lead">
          Discover your next favorite book from our amazing collection.
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <BookList books={filteredBooks} />

    </div>
  );
}


export default Home;