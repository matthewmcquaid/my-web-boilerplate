import config from '../config/app.js';
import logger from './logger.js';

export const buildQueryParametersString = (parameters, requestType) => {
  let query = '';

  if (requestType.toLowerCase() === 'get' && parameters) {
    query += '?' + Object.keys(parameters).map((key) => 
      `${key}=${encodeURIComponent(parameters[key])}`
    ).join('&');
  }

  return query;
};

export const buildUrl = (endpoint, parameters, requestType) => {
  const { apiProtocol, apiHostname, apiPort } = config;
  
  return `${apiProtocol}//${apiHostname}:${apiPort}${endpoint}${buildQueryParametersString(parameters, requestType)}`;
};

export const apiRequest = (requestType, endpoint, queryParameters, parameters, username, password, authRequired) => {
  return new Promise((resolve) => {
    const responseData = { testing: 'good' };

    resolve({ data: responseData, status: 200 });
  });
};


export default { 
  apiRequest 
};