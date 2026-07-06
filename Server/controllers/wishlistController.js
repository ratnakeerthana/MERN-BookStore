const Wishlist = require("../models/Wishlist");

// Add Book to Wishlist
const addToWishlist = async (req, res) => {
  try {
    console.log("req.user =", req.user);
    console.log("req.body =", req.body);
    const { book } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user.id,
      book,
    });

    if (exists) {
      return res.status(400).json({
        message: "Book already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      book,
    });

    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("book");

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Book from Wishlist
const removeWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      message: "Book removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};