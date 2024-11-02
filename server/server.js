'use strict';

const serverConfig = require('./config/app').server,
  logger = require('./lib/logger'),
  app = require('./app.js'),
  serverApp = app();

  const server = serverApp.listen(serverConfig.port, () => {

  const applicationVersion = process.env.npm_package_version;
  serverConfig.applicationVersion = applicationVersion;

  logger.info(`${serverConfig.name} 🌎 is listening at http://${serverConfig.host}:${serverConfig.port} version:${applicationVersion}`);
});

process.on('uncaughtException', (err) => {

  let exceptionMessage = err instanceof Error ? err.stack : err.toString();
  exceptionMessage = '<<< Uncaught Exception >>> ERROR: ' + exceptionMessage;

  logger.error(exceptionMessage);

  process.exit(1);

});

return server;