const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Restaurant = require('../models/Restaurant');
const City = require('../models/City');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');

connectDB();

const seedData = async () => {
  // Clear existing data
  await Restaurant.deleteMany({});
  await City.deleteMany({});
  await Tag.deleteMany({});
  await Comment.deleteMany({});

  // Create mock data
  const city1 = await City.create({ city_name: 'Coffeeville', state: 'CA', zip_code: '90001' });
  const city2 = await City.create({ city_name: 'Pastaville', state: 'NY', zip_code: '10001' });

  const tag1 = await Tag.create({ tag_name: 'Cafe' });
  const tag2 = await Tag.create({ tag_name: 'Bakery' });
  const tag3 = await Tag.create({ tag_name: 'Italian' });
  const tag4 = await Tag.create({ tag_name: 'Dine-In' });

  const restaurant1 = await Restaurant.create({
    name: 'The Coffee Bar',
    image_URL: 'https://picsum.photos/seed/picsum/200/300',
    location: { city: city1._id, address: '123 Brew Lane' },
    tags: [tag1._id, tag2._id],
    rating: 4.5
  });

  const restaurant2 = await Restaurant.create({
    name: 'Pasta Central',
    image_URL: 'https://picsum.photos/seed/picsum/200/300',
    location: { city: city2._id, address: '456 Noodle Street' },
    tags: [tag3._id, tag4._id],
    rating: 4
  });

  await Comment.create([
    { restaurant: restaurant1._id, user_id: 'u100', text: 'Great atmosphere and wonderful coffee. Highly recommend the espresso!', rating: 5 },
    { restaurant: restaurant1._id, user_id: 'u101', text: 'Love the fresh pastries every morning. A perfect spot to relax or work.', rating: 4 },
    { restaurant: restaurant2._id, user_id: 'u102', text: 'The spaghetti carbonara is a must-try! Cozy ambiance and friendly staff.', rating: 5 },
    { restaurant: restaurant2._id, user_id: 'u103', text: 'Good selection of wines to complement your meal. The lasagna felt a bit too cheesy for my taste.', rating: 3 }
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedData();