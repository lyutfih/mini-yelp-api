const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const restaurantRoutes = require('./routes/restaurantRoutes')

const app = express();

connectDB();

app.use(express.json());
app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});