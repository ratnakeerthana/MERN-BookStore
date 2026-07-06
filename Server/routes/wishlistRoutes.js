const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

// Get logged-in user's wishlist
router.get("/", protect, getWishlist);

// Add a book to wishlist
router.post("/", protect, addToWishlist);

// Remove a book from wishlist
router.delete("/:id", protect, removeWishlist);

module.exports = router;