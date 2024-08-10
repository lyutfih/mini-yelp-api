const express = require('express');
const router = express.Router();
const { getRestaurants, getRestaurantById, createRestaurant } = require('../controllers/restaurantController');

router.get('/', getRestaurants);

router.post('/', createRestaurant);

router.get('/:id', getRestaurantById);

module.exports = router;
