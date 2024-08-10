const express = require('express');
const { getCities, getRestaurantsByCityName, createCity } = require('../controllers/cityController');
const checkCityExists = require('../middlewares/checkCity');

const cityRoutes = express.Router();

cityRoutes.get('/', getCities);

cityRoutes.get('/:name', checkCityExists, getRestaurantsByCityName);

cityRoutes.post('/', createCity);

module.exports = cityRoutes;