const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const restaurantRoutes = require('./routes/restaurantRoutes');
const tagRoutes = require('./routes/tagRoutes');
const cityRoutes = require('./routes/cityRoutes');

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Documentation - Mini Yelp</title>
        <style>
          html, body {
            height: 100%;
            margin: 0;
            overflow: hidden;
          }
          iframe {
            width: 100vw;
            height: 100vh;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe src="https://mini-yelp-docs.vercel.app/" allowfullscreen></iframe>
      </body>
    </html>
  `);
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/cities', cityRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});