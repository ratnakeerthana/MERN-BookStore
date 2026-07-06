const express = require("express");
const router = express.Router();

const {
  addReview,
  getBookReviews,
  getAverageRating,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// Add a review (logged-in users only)
router.post("/", protect, addReview);
router.get("/average/:id", getAverageRating);

// Get all reviews for a book
router.get("/:bookId", getBookReviews);

module.exports = router;