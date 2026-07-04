import "../App.css";

function BookCard({ book, deleteBook, editBook }) {
  return (
    <div className="book-card">
      {book.image && (
        <img src={book.image} alt={book.title} />
      )}

      <h2>{book.title}</h2>

      <p><b>Author:</b> {book.author}</p>
      <p><b>Price:</b> ₹{book.price}</p>
      <p><b>Category:</b> {book.category}</p>
      <p><b>Description:</b> {book.description}</p>
      <p><b>Stock:</b> {book.stock}</p>

      <button onClick={() => editBook(book)}>
        Edit
      </button>

      <button onClick={() => deleteBook(book._id)}>
        Delete
      </button>
    </div>
  );
}

export default BookCard;