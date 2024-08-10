const Tag = require('../models/Tag');

const checkTagExists = async (req, res, next) => {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag) {
        return res.status(404).json({ error: 'Tag not found' });
    }
    req.tag = tag;
    next();
};

module.exports = checkTagExists;