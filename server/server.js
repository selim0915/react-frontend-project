require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
// const db = require('./db');

const PORT = process.env.APP_PORT || 3001;
const ROOT = path.resolve(__dirname, 'dist');
const isProd = process.env.NODE_ENV === 'production';

const app = express();

// cors
app.use(cors());

// route
const routes = require('./routes');
routes.initialize(app);

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
  // webpack
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack/webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res, next) => {
    let filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
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
