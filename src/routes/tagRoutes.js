const express = require('express');
const { getTags, getTagById, createTag } = require('../controllers/tagController');
const checkTagExists = require('../middlewares/checkTag');

const tagRoutes = express.Router();

tagRoutes.get('/', getTags);

tagRoutes.get('/:id', checkTagExists, getTagById);

tagRoutes.post('/', createTag);

module.exports = tagRoutes;