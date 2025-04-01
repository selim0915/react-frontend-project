require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');
const WebSocket = require('ws');
// const db = require('./db');
const { NODE_PORT, WSS_PORT } = require('./properties');

const ROOT = path.resolve(__dirname, '../dist');
const isProd = process.env.NODE_ENV === 'production';

const app = express();
const wss = new WebSocket.Server({ port: WSS_PORT });

// cors
app.use(cors());

// webSocket
wss.on('connection', (ws) => {
  console.log('클라이언트 연결됨');

  ws.on('message', (message) => {
    exec(message, (err, stdout, stderr) => {
      if (err) {
        ws.send(`에러: ${stderr}`);
      } else {
        ws.send(stdout);
      }
    });
  });
});

// webpack
app.use(express.static(ROOT));

// route
const routes = require('./routes/product');
routes.initialize(app);

if (isProd) {
  app.get('*', (_req, res, _next) => {
    res.sendFile(path.join(ROOT, 'index.html'), (err) => {
      if (err) {
        res.sendStatus(err.status).end();
      }
    });
  });
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );

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

app.listen(NODE_PORT, () => {
  console.log(`Listening on ${NODE_PORT}`);
});
