const Review = require("../models/Review");

// Add Review
const addReview = async (req, res) => {
  try {
    const { book, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user.id,
      book,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Reviews for a Book
const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      book: req.params.bookId,
    }).populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Average Rating of a Book
const getAverageRating = async (req, res) => {
  try {
    const reviews = await Review.find({
      book: req.params.id,
    });

    if (reviews.length === 0) {
      return res.json({
        averageRating: 0,
        totalReviews: 0,
      });
    }

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const average = total / reviews.length;

    res.json({
      averageRating: average.toFixed(1),
      totalReviews: reviews.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getBookReviews,
  getAverageRating,
};