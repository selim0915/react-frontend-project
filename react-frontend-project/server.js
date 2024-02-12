require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./db');

const PORT = process.env.APP_PORT || 3001;
const ROOT = path.resolve(__dirname, 'dist');

// express
const app = express();

// route
const routes = require('./routes');

// passport
// const passport = require('passport');
// const passportConfig = require('./passport.config');
// passportConfig();
// app.use(passport.initialize());
// app.use(passport.session());

// webpack
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config.js');
// const compiler = webpack(webpackConfig);
// app.use(require('webpack-dev-middleware')(compiler, webpackConfig.devServer));
// app.use('/src/images/ST', express.static(path.join(__dirname, 'src', 'images', 'ST')));
// app.use('/src/images/ST', express.static('\Program Files\Git\app\react-frontend-project\src\images\ST'));
// app.use(
//   '/src/images/ST',
//   express.static(path.join(__dirname, '/Program Files/Git/app/react-frontend-project/src/images/ST'))
// );

app.use(express.static(ROOT));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  routes.initialize(app);
});
