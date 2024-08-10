const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const restaurantRoutes = require('./routes/restaurantRoutes');
const tagRoutes = require('./routes/tagRoutes');
const cityRoutes = require('./routes/cityRoutes');

const app = express();

connectDB();

app.use(express.json());
// app.use('/api/restaurants', restaurantRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/cities', cityRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});