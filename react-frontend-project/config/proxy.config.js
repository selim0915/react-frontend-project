module.exports = {
  proxyConfig: {
    target: 'http://localhost:50000',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/proxy/db*': '/'
    },
    logLevel: 'info',
    onProxyReq,
    onProxyRes
  }
};

function onProxyReq(proxyReq, req, res) {
  const requestBody = JSON.stringify({ ...req.body });

  proxyReq.setHeader('Content-Length', Buffer.byteLength(requestBody));
  proxyReq.write(requestBody);
  return proxyReq;
}

function onProxyRes(proxyRes, req, res) {
  return proxyRes;
}
