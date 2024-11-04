import serverConfig from './config/app.js';
import logger from './lib/logger.js';
import app from './app.js';

const serverApp = app();

const server = serverApp.listen(serverConfig.server.port, () => {
  const applicationVersion = process.env.npm_package_version;
  serverConfig.applicationVersion = applicationVersion;

  logger.info(`${serverConfig.name} 🌎 is listening at http://${serverConfig.server.host}:${serverConfig.server.port} version:${applicationVersion}`);
});

process.on('uncaughtException', (err) => {
  let exceptionMessage = err instanceof Error ? err.stack : err.toString();
  exceptionMessage = '<<< Uncaught Exception >>> ERROR: ' + exceptionMessage;

  logger.error(exceptionMessage);

  process.exit(1);
});

export default server;