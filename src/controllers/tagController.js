const Tag = require('../models/Tag');

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    
    const response = {
      tags
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTagById = async (req, res) => {
    res.json(req.tag);
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

module.exports = { getTags, getTagById, createTag };
