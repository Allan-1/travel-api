const express = require('express');
const { City, Hotel } = require('../models/db');

const hotelrouter = express.Router();

hotelrouter.get('/cities', async (req, res) => {
  const cities = await City.findAll();
  const cityList = cities.map((city) => ({
    name: city.name,
    imageurl: city.imageurl,
  }));
  res.json({ cities: cityList });
});

hotelrouter.get('/hotels', async (req, res) => {
  const hotels = await Hotel.findAll();
  const hotelList = hotels.map((hotel) => ({ hotel: hotel.name }));
  res.json({ hotels: hotelList });
});

// get a  list of hotels
hotelrouter.get('/hotels/:city', async (req, res) => {
  const { city } = req.params;
  const hotels = await Hotel.findAll({
    include: { model: City, where: { name: city } },
  });
  const hotelList = hotels.map((hotel) => ({
    name: hotel.name,
    price: hotel.price,
    imageurl: hotel.imageurl,
    location: hotel.location,
    details: hotel.details,
    city: hotel.city.name,
  }));
  res.json({ hotels: hotelList });
});

module.exports = hotelrouter;
