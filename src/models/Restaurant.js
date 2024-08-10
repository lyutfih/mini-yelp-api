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

RestaurantSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });
  
RestaurantSchema.set('toObject', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
