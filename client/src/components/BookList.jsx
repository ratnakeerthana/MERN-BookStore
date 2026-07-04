import BookCard from "./BookCard";

function BookList({ books, deleteBook, editBook }) {
  return (
    <div>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            deleteBook={deleteBook}
            editBook={editBook}
          />
        ))
      )}
    </div>
  );
}

export default BookList;