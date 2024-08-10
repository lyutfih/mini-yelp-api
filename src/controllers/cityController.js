const City = require('../models/City');
const Restaurant = require('../models/Restaurant');

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRestaurantsByCityName = async (req, res) => {
    const city = req.city;
     try {
        const restaurants = await Restaurant.find({ 'location.city': city[0]._id })
        .populate('location.city')
        .populate('tags')
        .populate('reviews')
        .exec();

        console.log(restaurants);
        return res.json(restaurants);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createCity = async (req, res) => {
    const { city_name, state, zip_code } = req.body;

    if (!city_name || !state || !zip_code) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      const city = await City.create({ city_name, state, zip_code });
      res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCities, getRestaurantsByCityName, createCity };
