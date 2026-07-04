function BookForm({
  newBook,
  handleChange,
  addBook
}) {
  return (
    <div>
      <h2>Add Book</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newBook.title}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={newBook.author}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newBook.price}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newBook.category}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newBook.description}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={newBook.stock}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newBook.image}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={addBook}>
  {newBook._id ? "Update Book" : "Add Book"}
</button>
    </div>
  );
}

export default BookForm;