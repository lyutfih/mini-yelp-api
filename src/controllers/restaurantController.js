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

        return res.json(restaurantsWithReviews);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getRestaurantById = async (req, res) => {
    const restauranId = req.params.id;
    try {
        const restaurant = await Restaurant.findById(restauranId)
            .populate('location.city')
            .populate('tags')
            .exec();

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const comments = await Comment.find({ restaurant: restaurant._id }).exec();

        const restaurantWithReviews = {
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
        return res.json(restaurantWithReviews);
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
}

const createRestaurant = async (req, res) => {
    try {
        const { name, image_URL, location, tags, rating } = req.body;

        if (!name || !image_URL || !location || !tags || rating == null) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const city = await City.findOne({ city_name: location.city, state: location.state, zip_code: location.zip_code });
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        const tagDocuments = await Promise.all(tags.map(async (tagName) => {
            let tag = await Tag.findOne({ tag_name: tagName });
            if (!tag) {
                tag = new Tag({ tag_name: tagName });
                await tag.save();
            }
            return tag;
        }));

        const newRestaurant = new Restaurant({
            name,
            image_URL,
            location: {
                address: location.address,
                city: city._id
            },
            tags: tagDocuments.map(tag => tag._id),
            rating
        });

        const restaurant = await newRestaurant.save();

        return res.status(201).json({
            id: restaurant._id.toString(),
            name: restaurant.name,
            image_URL: restaurant.image_URL,
            location: {
                address: restaurant.location.address,
                city: city.city_name,
                state: city.state,
                zip_code: city.zip_code
            },
            tags: tagDocuments.map(tag => tag.tag_name),
            rating: restaurant.rating,
            reviews: []
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getRestaurants, getRestaurantById, createRestaurant
}