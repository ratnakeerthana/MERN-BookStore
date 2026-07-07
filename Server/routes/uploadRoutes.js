const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    message: "Upload route is working",
  });
});

// Upload Image
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: `https://mern-bookstore-2-gt1e.onrender.com/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;