const fs = require('fs');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const iconv = require('iconv-lite');
const logger = require('./winston');
const { WSS_PORT } = require('../properties');

const ENCODING = 'utf-8';
const GIT_BASH_PATH = 'C:\\Program Files\\Git\\bin\\bash.exe';

const spawnChildProcess = () => {
  let childProcess = '';
  if (fs.existsSync(GIT_BASH_PATH)) {
    childProcess = spawn(GIT_BASH_PATH, ['--login'], { encoding: 'buffer' });
  } else {
    childProcess = spawn('cmd.exe', [], { encoding: 'buffer' });
    childProcess.stdin.write(iconv.encode('chcp 65001\r\n', ENCODING));
  }
  return childProcess;
};

const setupWebSocket = () => {
  const socket = new WebSocket.Server({ port: WSS_PORT });

  socket.on('connection', (ws) => {
    logger.info('Connection WebSocket');

    let process = spawnChildProcess();
    let command = '';

    const initProcess = (shell) => {
      shell.stdout.on('data', (data) => {
        const stdout = iconv.decode(data, ENCODING).trimEnd();
        if (command !== stdout) {
          ws.send(`${stdout}\n\n`);
        }
      });

      shell.stderr.on('data', (data) => {
        const stderr = iconv.decode(data, ENCODING).trimEnd();
        logger.error(`Error WebSocket : ${stderr}`);
        ws.send(`Error : ${stderr}`);
      });
    };
    initProcess(process);

    ws.on('message', (message) => {
      if (message && Buffer.isBuffer(message)) {
        command = iconv.decode(message, ENCODING).trimEnd();
        ws.send(`$ ${command}\n`);

        if (command === 'exit') {
          process.kill();
          process = spawnChildProcess();
          initProcess(process);

          ws.send(`$ \n`);
          return;
        }
        process.stdin.write(`${command}\r\n`);
      }
    });

    ws.on('close', (code, reason) => {
      const reasonText = 'No reason to be delivered';
      logger.info(`Close WebSocket : [${code}] ${reason || reasonText}`);
      process.kill();
    });
  });

  return socket;
};

module.exports = setupWebSocket;
