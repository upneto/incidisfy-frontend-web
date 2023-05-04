const proxy = [
  {
    context: ['/api'],
    target: 'http://localhost:9080',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  },
  {
    context: ['/api'],
    target: 'https://incidisfy-backend-gateway.herokuapp.com',
    secure: true,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  }
];

module.exports = proxy;
