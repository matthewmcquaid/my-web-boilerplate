import config from '../../config/app.js';
import { apiRequest } from '../../lib/requestHelper.js';

export default async (request, response) => {

  console.log('v1/api/version');
  
  return apiRequest(
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