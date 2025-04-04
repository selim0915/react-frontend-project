const { spawn } = require('child_process');
const iconv = require('iconv-lite');
const WebSocket = require('ws');
const logger = require('../config/winton');
const { WSS_PORT } = require('../properties');

const ENCODING = 'utf-8';

const setupWebSocket = () => {
  const socket = new WebSocket.Server({ port: WSS_PORT });

  socket.on('connection', (ws) => {
    logger.info('Connection WebSocket');

    const cmdProcess = spawn('cmd.exe', [], { encoding: 'buffer' });
    let command = '';

    cmdProcess.stdin.write(iconv.encode('chcp 65001\r\n', ENCODING));

    cmdProcess.stdout.on('data', (data) => {
      const stdout = iconv.decode(data, ENCODING).trimEnd();
      if (command !== stdout) {
        ws.send(`${stdout}\n`);
      } else {
        ws.send(`$ ${stdout}\n`);
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

  return socket;
};

module.exports = setupWebSocket;
