const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
  // 
  app.use(proxy("/api/login", { target: "http://localhost:5000", changeOrigin: true, }));
  app.use(proxy("/api/login-google", { target: "http://localhost:5000", changeOrigin: true, }));
  app.use(proxy("/api/*", { target: "http://localhost:5000", changeOrigin: true, }));

};