require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { spawn } = require('child_process');
const iconv = require('iconv-lite');
const WebSocket = require('ws');
// const db = require('./db');
const { NODE_PORT, WSS_PORT } = require('./properties');
const logger = require('./config/winton');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const socket = new WebSocket.Server({ port: WSS_PORT });

const ROOT = path.resolve(__dirname, '../dist');
const IS_PROD = process.env.NODE_ENV === 'production';
const ENCODING = 'utf-8';

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
socket.on('connection', (ws) => {
  logger.info('Connection webSocket');

  const cmdProcess = spawn('cmd.exe', [], { encoding: 'buffer' });
  let command = '';

  cmdProcess.stdin.write(iconv.encode('chcp 65001\r\n', ENCODING));

  cmdProcess.stdout.on('data', (data) => {
    const stdout = iconv.decode(data, ENCODING).trimEnd();
    if (command === stdout) {
      ws.send(`$ ${stdout}\n`);
    } else {
      ws.send(`${stdout}\n`);
    }
  });
  cmdProcess.stderr.on('data', (data) => {
    const stderr = iconv.decode(data, ENCODING).trimEnd();

    logger.error(`Error WebSocket : ${stderr}`);
    ws.send(`Error : ${stderr}`);
  });

  ws.on('message', (message) => {
    if (message && Buffer.isBuffer(message)) {
      command = iconv.decode(message, ENCODING).trimEnd();

      cmdProcess.stdin.write(`${command}\r\n`);
    }
  });
  ws.on('close', (code, reason) => {
    const reasonText = 'No reason to be delivered';
    logger.info(`Close WebSocket : [${code}] ${reason || reasonText}`);
    cmdProcess.kill();
  });
});

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

app.use(express.json());
app.use(express.static(ROOT));

// route
const routes = require('./routes/product');
routes.initialize(app);

server.listen(NODE_PORT, () => {
  console.log(`Listening on ${NODE_PORT}`);
});
