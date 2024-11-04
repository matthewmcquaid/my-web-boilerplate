import errorJson from './error.json' assert { type: 'json' };
import serverJson from './server.json' assert { type: 'json' };
import statusJson from './status.json' assert { type: 'json' };

const config = {
  error: errorJson,
  server: serverJson,
  status: statusJson,
  apiHostname: process.env.API_HOSTNAME ? /* istanbul ignore next */ process.env.API_HOSTNAME : '127.0.0.1',
  apiPort: process.env.API_PORT ? /* istanbul ignore next */ process.env.API_PORT : '3001',
  apiProtocol: process.env.API_PROTOCOL ? /* istanbul ignore next */ process.env.API_PROTOCOL : 'http:'
};

export default config;