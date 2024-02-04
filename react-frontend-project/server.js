require('dotenv').config();
const express = require('express');
const path = require('path');

if (false) {
  const URL = process.env.MONGOOSE_URL;
  const mongoose = require('mongoose');

  mongoose
    .connect(URL)
    .then(() => {
      console.log('db connected');
    })
    .catch((err) => {
      console.log(err);
    });
}

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
app.use(express.static(ROOT));

app.use(express.json());

// TODO :: 공통 에러 처리 파일로 로직 변경 필요
// express 에러처리
// app.use((error, req, res, next) => {
//     res.status(500).json({ message: error.message })
// })

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  routes.initialize(app);
});
