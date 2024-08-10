const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  city_name: String,
  state: String,
  zip_code: String
});

CitySchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });
  
  CitySchema.set('toObject', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });
  

module.exports = mongoose.model('City', CitySchema);
