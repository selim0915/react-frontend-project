require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { exec } = require('child_process');
const WebSocket = require('ws');
// const db = require('./db');
const { NODE_PORT, WSS_PORT } = require('./properties');
const logger = require('./config/winton');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: WSS_PORT });

const ROOT = path.resolve(__dirname, '../dist');
const IS_PROD = process.env.NODE_ENV === 'production';

// cors
app.use(cors());

// logger
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

// webSocket
wss.on('connection', (ws) => {
  console.log('클라이언트 연결됨');

  ws.on('message', (message) => {
    if (Buffer.isBuffer(message)) {
      message = message.toString();
    }
    console.log('Received message:', message);

    exec(message, (err, stdout, stderr) => {
      if (err) {
        ws.send(`에러: ${stderr}`);
      } else {
        ws.send(stdout);
      }
    });
  });
});

app.use(express.json());
app.use(express.static(ROOT));

// route
const routes = require('./routes/product');
routes.initialize(app);

// webpack
if (IS_PROD) {
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

server.listen(NODE_PORT, () => {
  console.log(`Listening on ${NODE_PORT}`);
});
