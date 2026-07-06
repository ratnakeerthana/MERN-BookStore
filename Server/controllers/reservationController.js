const Reservation = require("../models/Reservation");

// Reserve a Book
const reserveBook = async (req, res) => {
  try {
    const { book } = req.body;

    const exists = await Reservation.findOne({
      user: req.user.id,
      book,
      status: "Pending",
    });

    if (exists) {
      return res.status(400).json({
        message: "Book already reserved",
      });
    }

    const reservation = await Reservation.create({
      user: req.user.id,
      book,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.user.id,
    }).populate("book");

    res.json(reservations);
  } catch (error) {
    console.error("Reservation Error:",error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Reservation
const cancelReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);

    res.json({
      message: "Reservation cancelled",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Reservations (Admin)
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email")
      .populate("book", "title author");

    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Reservation Status (Admin)
const updateReservationStatus = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = req.body.status;

    await reservation.save();

    res.json({
      message: "Reservation status updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  reserveBook,
  getReservations,
  cancelReservation,
  getAllReservations,
  updateReservationStatus,
};