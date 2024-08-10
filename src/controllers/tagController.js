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
  try {
    const { tag_name } = req.body;
    const tag = new Tag({ tag_name });
    await tag.save();
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getTags, getTagById, createTag };
