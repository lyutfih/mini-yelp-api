const Restaurant = require('../models/Restaurant');
const Comment = require('../models/Comment');
const City = require('../models/City');
const Tag = require('../models/Tag');

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
            .populate('location.city')
            .populate('tags')
            .exec();

        const restaurantPromises = restaurants.map(async (restaurant) => {
            const comments = await Comment.find({ restaurant: restaurant.id }).exec();

            return {
                id: restaurant._id.toString(),
                name: restaurant.name,
                image_URL: restaurant.image_URL,
                location: {
                    address: restaurant.location.address,
                    city: restaurant.location.city.city_name,
                    state: restaurant.location.city.state,
                    zip_code: restaurant.location.city.zip_code
                },
                tags: restaurant.tags.map(tag => tag.tag_name),
                rating: restaurant.rating,
                reviews: comments.map(comment => ({
                    id: comment._id.toString(),
                    user_id: comment.user_id,
                    text: comment.text,
                    rating: comment.rating
                }))
            };
        });

        const restaurantsWithReviews = await Promise.all(restaurantPromises);

        res.json(restaurantsWithReviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getRestaurants
}