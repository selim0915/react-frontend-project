const NODE_PORT = 3000;

module.exports = {
  NODE_PORT,
  WSS_PORT: 3001,
  WEBPACK_PORT: 3002,
  LOCAL_SERVER: (host) => `${host}//localhost:${NODE_PORT}`,
};
