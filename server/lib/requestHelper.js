
'use strict';

var config = require('../config/app'),
  logger = require('./logger');

var buildQueryParametersString = (parameters, requestType) => {

  var query = '';

  if (requestType.toLowerCase() === 'get' && parameters) {
    query += '?' + Object.keys(parameters).map(function (key) {
        return key + '=' + encodeURIComponent(parameters[key]);
      }).join('&');
  }

  return query;
};

var buildUrl = (endpoint, parameters, requestType)=>  {

  var apiProtocol = config.apiProtocol;
  var apiHostname = config.apiHostname;
  var apiPort = config.apiPort;

  return apiProtocol + '//' + apiHostname + ':' + apiPort + endpoint + buildQueryParametersString(parameters, requestType);
};

var apiRequest = (requestType, endpoint, queryParameters, parameters, username, password, authRequired) => {
  return new Promise((resolve, reject) => {

    var responseData = {testing: 'good'};

  

    resolve({data: responseData, status: 200});
       

  })

};

exports.buildQueryParametersString = buildQueryParametersString;
exports.apiRequest = apiRequest;
exports.buildUrl = buildUrl;