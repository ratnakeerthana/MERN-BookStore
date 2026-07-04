const Book = require("../models/Book");

// Get all books
const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

// Add a new book
const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
};