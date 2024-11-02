'use strict';

module.exports = {
  error: require('./error.json'),
  server: require('./server.json'),
  status: require('./status.json'),
  apiHostname: process.env.API_HOSTNAME ? /* istanbul ignore next */ process.env.API_HOSTNAME : '127.0.0.1',
  apiPort: process.env.API_PORT ? /* istanbul ignore next */ process.env.API_PORT : '3000',
  apiProtocol: process.env.API_PROTOCOL ? /* istanbul ignore next */ process.env.API_PROTOCOL : 'http:'
};
