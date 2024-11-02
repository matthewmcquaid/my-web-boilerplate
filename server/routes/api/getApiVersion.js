
'use strict';

const config = require('../../config/app'),
  requestHelper = require('../../lib/requestHelper');

module.exports = (request, response) => {
  return requestHelper.apiRequest(
    'GET',
    '/v1/api/version',
    null,
    null,
    null,
    null,
    null
  ).then((res) => {
    response
      .status(res.status)
      .json(res.data);
  }).catch((err) => {
    response
      .status(err.status || config.status.gatewayTimeout)
      .send(err.response && err.response.text || config.error.noResponse);
  });

};
