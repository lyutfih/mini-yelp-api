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
  try {
    const { city_name,state,zip_code } = req.body;
    const city = new City({ city_name,state,zip_code });
    await city.save();
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCities, getCityByName, createCity };
