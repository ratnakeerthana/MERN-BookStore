const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  getRecommendedBooks,
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Public Routes
router.get("/", getBooks);
router.get("/test", (req, res) => {
  res.json({ message: "Book route is working" });
});
router.get("/recommended/:id", getRecommendedBooks);
router.get("/:id", getBookById);

// Admin Routes
router.post("/", protect, admin, addBook);
router.put("/:id", protect, admin, updateBook);
router.delete("/:id", protect, admin, deleteBook);

module.exports = router;