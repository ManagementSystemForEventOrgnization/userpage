const proxy = require('http-proxy-middleware').createProxyMiddleware;

const proxyName = 'https://340c8d15.ngrok.io';
//http://localhost:5000
//https://340c8d15.ngrok.io

module.exports = function (app) {
  //
  app.use(proxy('/api/login', { target: proxyName, changeOrigin: true }));
  app.use(
    proxy('/api/login-google', {
      target: proxyName,
      changeOrigin: true,
    })
  );

  app.use(
    proxy('/api/*/*/*', {
      target: proxyName,
      changeOrigin: true,
    })
  );

  app.use(
    proxy('/api/*/*', {
      target: proxyName,
      changeOrigin: true,
    })
  );

  app.use(proxy('/api/*', { target: proxyName, changeOrigin: true }));
};
