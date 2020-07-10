const proxy = require('http-proxy-middleware').createProxyMiddleware;

const proxyName = 'http://localhost:5000';
// const proxyName = 'https://event-orgnization.herokuapp.com';

// JWToken
// basic authorization
// sesion
// proxy => limit IP => react server IP => access
// FE server => BE server => third-party server => res.send() => cache

//https://event-orgnization.herokuapp.com

module.exports = function (app) {
  app.use(proxy('/api/joinEvent', { target: proxyName, changeOrigin: true }));
  app.use(proxy('/api/login', { target: proxyName, changeOrigin: true }));
  app.use(proxy('/upload/*', { target: proxyName, changeOrigin: true }));

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
