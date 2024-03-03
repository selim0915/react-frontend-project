require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./db');

const PORT = process.env.APP_PORT || 3001;
const ROOT = path.resolve(__dirname, 'dist');
const isProd = process.env.NODE_ENV === 'production';

const app = express();

// route
const routes = require('./routes');
routes.initialize(app);

// webpack
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
if (isProd) {
  app.use(express.static(ROOT));

  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'), {}, function (err) {
      if (err) {
        res.sendStatus(err.status).end();
      }
    });
  });
} else {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(webpackCompiler, webpackConfig.devServer));
  app.use(
    webpackHotMiddleware(webpackCompiler, {
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  );

  app.get('*', (req, res, next) => {
    let filename = path.join(webpackCompiler.outputPath, 'index.html');
    webpackCompiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
}

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
