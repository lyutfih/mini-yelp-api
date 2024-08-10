const Tag = require('../models/Tag');
const Restaurant = require('../models/Restaurant');

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRestaurantByTagName = async (req, res) => {
    const tag = req.tag;
    
    try {
       const restaurants = await Restaurant.find({ 'tags': tag._id })
       .populate('location.city')
       .populate('tags')
       .populate('reviews')
       .exec();
       
       return res.json(restaurants);
   } catch (error) {
       return res.status(500).json({ message: error.message });
   }
};


const createTag = async (req, res) => {
    const { tag_name } = req.body;
  
    if (!tag_name) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    try {
      const tag = await Tag.create({ tag_name });
      res.status(201).json(tag);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getTags, getRestaurantByTagName, createTag };
