const express = require('express');
const { getCities, getCityByName, createCity } = require('../controllers/cityController');
const checkCityExists = require('../middlewares/checkCity');

const cityRoutes = express.Router();

cityRoutes.get('/', getCities);

cityRoutes.get('/:name', checkCityExists, getCityByName);

cityRoutes.post('/', createCity);

module.exports = cityRoutes;