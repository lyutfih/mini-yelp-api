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
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

RestaurantSchema.virtual('reviews', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'restaurant'
  });
  
RestaurantSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      return {
        id: ret._id.toString(),
        name: ret.name,
        image_URL: ret.image_URL,
        location: {
          address: ret.location.address,
          city: ret.location.city.city_name,
          state: ret.location.city.state,
          zip_code: ret.location.city.zip_code
        },
        tags: ret.tags.map(tag => tag.tag_name),
        rating: ret.rating,
        reviews: ret.reviews.map(review => ({
          id: review._id.toString(),
          user_id: review.user_id,
          text: review.text,
          rating: review.rating
        }))
      };
    }
  });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
