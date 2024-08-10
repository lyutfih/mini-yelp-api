const City = require('../models/City');

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    
    const response = {
        cities
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCityByName = async (req, res) => {
    res.json(req.city);
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

module.exports = { getCities, getCityByName, createCity };
