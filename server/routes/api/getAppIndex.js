
'use strict';

const config = require('../../config/app');

module.exports = (request, response) => {
  return response.status(config.status.ok)
    .send(config.server.name);
};
