const express = require('express');

const { Hotel, User, Booking } = require('../models/db');

const bookingrouter = express.Router();

bookingrouter.post('/bookings', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { username } = jwt.verify(token, 'super-secret-key');
  const { hotelId } = req.body;
  const user = await User.findOne({ where: { username } });
  const hotel = await Hotel.findOne({ where: { id: hotelId } });
  if (user && hotel) {
    const booking = await Booking.create({
      userId: user.id,
      hotelId: hotel.id,
    });
    res.json({ id: booking.id });
  } else {
    res.status(400).json({ error: 'Invalid user or hotel' });
  }
});

// get a  list of bookings
bookingrouter.get('/bookings', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { username } = jwt.verify(token, 'super-secret-key');
  const { hotelId } = req.body;
  const user = await User.findOne({ where: { username } });
  const hotel = await Hotel.findOne({ where: { id: hotelId } });
  if (user && hotel) {
    const bookings = await Booking.findAll();
    const bookingList = bookings.map((booking) => ({
      id: booking.id,
      userId: booking.userId,
      hotelId: booking.hotelId,
    }));
    res.json({ bookings: bookingList });
  } else {
    res.status(400).json({ error: 'Invalid user or hotel' });
  }
});

module.exports = bookingrouter;
