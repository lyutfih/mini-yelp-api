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
  const city3 = await City.create({ city_name: 'Burgerland', state: 'TX', zip_code: '77001' });
  const city4 = await City.create({ city_name: 'Salad City', state: 'IL', zip_code: '60001' });
  const city5 = await City.create({ city_name: 'Pizza Town', state: 'NJ', zip_code: '07001' });
  const city6 = await City.create({ city_name: 'Taco City', state: 'AZ', zip_code: '85001' });
  const city7 = await City.create({ city_name: 'Sushi City', state: 'WA', zip_code: '98001' });
  const city8 = await City.create({ city_name: 'Burrito City', state: 'CO', zip_code: '80001' });

  const tag1 = await Tag.create({ tag_name: 'Cafe' });
  const tag2 = await Tag.create({ tag_name: 'Bakery' });
  const tag3 = await Tag.create({ tag_name: 'Italian' });
  const tag4 = await Tag.create({ tag_name: 'Dine-In' });
  const tag5 = await Tag.create({ tag_name: 'Takeout' });
  const tag6 = await Tag.create({ tag_name: 'Japanese' });
  const tag7 = await Tag.create({ tag_name: 'Mexican' });
  const tag8 = await Tag.create({ tag_name: 'Fast Food' });
  const tag9 = await Tag.create({ tag_name: 'Healthy' });
  const tag10 = await Tag.create({ tag_name: 'Pizza' });

  const restaurant1 = await Restaurant.create({
    name: 'The Coffee Bar',
    image_URL: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&auto=format&fit=crop',
    location: { city: city1._id, address: '123 Brew Lane' },
    tags: [tag1._id, tag2._id],
    rating: 4.5
  });

  const restaurant2 = await Restaurant.create({
    name: 'Pasta Central',
    image_URL: 'https://images.unsplash.com/photo-1665991946306-3ca545298331?w=400&h=300&auto=format&fit=crop',
    location: { city: city2._id, address: '456 Noodle Street' },
    tags: [tag3._id, tag4._id],
    rating: 4
  });

  const restaurant3 = await Restaurant.create({
    name: 'Burger Stop',
    image_URL: 'https://images.unsplash.com/photo-1665991946306-3ca545298331?w=400&h=300&auto=format&fit=crop',
    location: { city: city3._id, address: '789 Patty Avenue' },
    tags: [tag7._id, tag8._id],
    rating: 3.5
  });

  const restaurant4 = await Restaurant.create({
    name: 'Salad Garden',
    image_URL: 'https://images.unsplash.com/photo-1681219916726-036039b9b20d?w=400&h=300&auto=format&fit=crop',
    location: { city: city4._id, address: '012 Lettuce Lane' },
    tags: [tag9._id, tag4._id],
    rating: 4
  });

  const restaurant5 = await Restaurant.create({
    name: 'Pizza Palace',
    image_URL: 'https://images.unsplash.com/photo-1701889032092-a75dbfd0483b?w=400&h=300&auto=format&fit=crop',
    location: { city: city5._id, address: '345 Slice Street' },
    tags: [tag10._id, tag5._id],
    rating: 3.5
  });

  const restaurant6 = await Restaurant.create({
    name: 'Taco Town',
    image_URL: 'https://images.unsplash.com/photo-1715654177943-762deb560e21?w=400&h=300&auto=format&fit=crop',
    location: { city: city6._id, address: '678 Shell Street' },
    tags: [tag7._id, tag8._id],
    rating: 4
  });

  const restaurant7 = await Restaurant.create({
    name: 'Sushi City',
    image_URL: 'https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?w=400&h=300&auto=format&fit=crop',
    location: { city: city7._id, address: '901 Fish Street' },
    tags: [tag6._id, tag4._id],
    rating: 4.5
  });

  const restaurant8 = await Restaurant.create({
    name: 'Burrito Place',
    image_URL: 'https://images.unsplash.com/photo-1674425044527-bb1728b83627?w=400&h=300&auto=format&fit=crop',
    location: { city: city8._id, address: '234 Tortilla Street' },
    tags: [tag7._id, tag8._id],
    rating: 3.5
  });


  await Comment.create([
    { restaurant: restaurant1._id, user_id: 'u100', text: 'Great atmosphere and wonderful coffee. Highly recommend the espresso!', rating: 5 },
    { restaurant: restaurant1._id, user_id: 'u101', text: 'Love the fresh pastries every morning. A perfect spot to relax or work.', rating: 4 },
    { restaurant: restaurant2._id, user_id: 'u102', text: 'The spaghetti carbonara is a must-try! Cozy ambiance and friendly staff.', rating: 5 },
    { restaurant: restaurant2._id, user_id: 'u103', text: 'Good selection of wines to complement your meal. The lasagna felt a bit too cheesy for my taste.', rating: 3 },
    { restaurant: restaurant3._id, user_id: 'u104', text: 'The burgers are juicy and flavorful. Great for a quick meal.', rating: 4 },
    { restaurant: restaurant3._id, user_id: 'u105', text: 'The fries were a bit too salty for me. The milkshakes are delicious though!', rating: 3 },
    { restaurant: restaurant4._id, user_id: 'u106', text: 'The salads are always fresh and tasty. A great place to eat healthy.', rating: 5 },
    { restaurant: restaurant4._id, user_id: 'u107', text: 'The salad dressings are a bit too oily for my taste. The smoothies are refreshing.', rating: 4 },
    { restaurant: restaurant5._id, user_id: 'u108', text: 'The pepperoni pizza was delicious. The crust was a bit too thick for me.', rating: 4 },
    { restaurant: restaurant5._id, user_id: 'u109', text: 'The garlic knots were a bit too greasy for my taste. The delivery was quick and the pizza was still hot.', rating: 3 },
    { restaurant: restaurant6._id, user_id: 'u110', text: 'The tacos are delicious and filling. Great for a quick meal.', rating: 4 },
    { restaurant: restaurant6._id, user_id: 'u111', text: 'The salsa was a bit too spicy for me. The horchata was refreshing.', rating: 3 },
    { restaurant: restaurant7._id, user_id: 'u112', text: 'The sushi is always fresh and delicious. Great for a date night.', rating: 5 },
    { restaurant: restaurant7._id, user_id: 'u113', text: 'The miso soup was a bit too salty for my taste. The tempura was crispy and flavorful.', rating: 4 },
    { restaurant: restaurant8._id, user_id: 'u114', text: 'The burritos are huge and tasty. Great for a quick meal.', rating: 4 },
    { restaurant: restaurant8._id, user_id: 'u115', text: 'The guacamole was a bit too chunky for my taste. The churros were delicious.', rating: 3 }
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedData();