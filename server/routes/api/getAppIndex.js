import config from '../../config/app.js';

export default (request, response) => {
  console.log('app index');

  return response.status(config.status.ok)
    .send(config.server.name);
};
