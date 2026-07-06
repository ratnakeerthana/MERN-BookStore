import BookCard from "./BookCard";

function BookList({ books }) {
  return (
    <div className="row">
      {books.length === 0 ? (
        <h4>No Books Found</h4>
      ) : (
        books.map((book) => (
          <div className="col-md-4 mb-4" key={book._id}>
            <BookCard book={book} />
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;