const City = require('../models/City');

const checkCityExists = async (req, res, next) => {
    const { name } = req.params;
    const city = await City.find({city_name:name});
    if (!city) {
        return res.status(404).json({ error: 'City not found' });
    }
    req.city = city;
    next();
};

module.exports = checkCityExists;