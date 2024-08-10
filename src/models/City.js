const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  city_name: String,
  state: String,
  zip_code: String
});

module.exports = mongoose.model('City', CitySchema);
