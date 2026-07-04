import { useEffect, useState } from "react";
import API from "./services/api";

import Navbar from "./components/Navbar";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  // Fetch all books
  const fetchBooks = () => {
    API.get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update Book
  const addBook = async () => {
    try {
      if (editId) {
        await API.put(`/books/${editId}`, newBook);
      } else {
        await API.post("/books", newBook);
      }

      fetchBooks();

      setNewBook({
        title: "",
        author: "",
        price: "",
        category: "",
        description: "",
        stock: "",
        image: "",
      });

      setEditId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Book
  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Book
  const editBook = (book) => {
    setNewBook(book);
    setEditId(book._id);
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <BookForm
          newBook={newBook}
          handleChange={handleChange}
          addBook={addBook}
          editId={editId}
        />

        <hr />

        <BookList
          books={books}
          deleteBook={deleteBook}
          editBook={editBook}
        />
      </div>
    </div>
  );
}

export default App;