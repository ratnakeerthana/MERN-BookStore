console.log("reservationRoutes.js loaded");
const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
  res.json({ message: "Reservation route is working" });
});

const {
  reserveBook,
  getReservations,
  cancelReservation,
  getAllReservations,
  updateReservationStatus,
} = require("../controllers/reservationController");

const { protect } = require("../middleware/authMiddleware");

// User Routes
router.post("/", protect, reserveBook);
router.get("/", protect, getReservations);
router.delete("/:id", protect, cancelReservation);

// Admin Routes
router.get("/all", protect, getAllReservations);
router.put("/:id", protect, updateReservationStatus);

module.exports = router;