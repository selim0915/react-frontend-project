const fs = require('fs');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const iconv = require('iconv-lite');
const logger = require('./winston');
const { WSS_PORT } = require('../properties');

const ENCODING = 'utf-8';
const GIT_BASH_PATH = 'C:\\Program Files\\Git\\bin\\bash.exe';

/*
 TODO
 1. 소켓 연결 후, 응답 후 현재 pwd, cd 경로 조회
 2. exit 후 새로운 process를 만들었음에도 이전 tail 로그가 여전히 WebSocket을 통해 클라이언트로 전송 되는 오류 수정
 */

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
        ws.send(`Error : ${stderr}\n\n`);
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

          ws.send('Reconnection WebSocket');
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
