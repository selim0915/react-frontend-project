require('dotenv').config();
const mongoose = require('mongoose');

const URL = process.env.MONGOOSE_URL;

mongoose
  .connect(URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

module.exports = mongoose.connection;
