const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  image_URL: String,
  location: {
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    address: String
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  rating: Number
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
