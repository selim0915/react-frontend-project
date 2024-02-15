require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./db');

const PORT = process.env.APP_PORT || 3001;
const ROOT = path.resolve(__dirname, 'dist');

const app = express();

// webpack
app.use(express.static(ROOT));

// route
const routes = require('./routes');
routes.initialize(app);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
