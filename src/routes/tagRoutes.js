const express = require('express');
const { getTags, getRestaurantByTagName, createTag } = require('../controllers/tagController');
const checkTagExists = require('../middlewares/checkTag');

const tagRoutes = express.Router();

tagRoutes.get('/', getTags);

tagRoutes.get('/:name', checkTagExists, getRestaurantByTagName);

tagRoutes.post('/', createTag);

module.exports = tagRoutes;