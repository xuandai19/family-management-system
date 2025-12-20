const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Route test
app.get('/', (req, res) => {
  res.send('Backend Qu?n L? D?ng H? ðang ch?y!');
});

// K?t n?i MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB k?t n?i thành công'))
  .catch(err => console.log('MongoDB l?i:', err));

// Kh?i ð?ng server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ch?y trên port ${PORT}`);
});
