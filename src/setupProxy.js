const proxy = require('http-proxy-middleware').createProxyMiddleware;

const proxyName = process.env.SERVER_URL || 'http://localhost:5000';

module.exports = function (app) {
  app.use(proxy('/api/joinEvent', { target: proxyName, changeOrigin: true }));
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
