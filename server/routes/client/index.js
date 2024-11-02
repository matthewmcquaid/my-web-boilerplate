
'use strict';

const path = require('path'),
  applicationVersion = require('../../../package.json'),
  config = require('../../config/app');

exports.staticDir = path.resolve(__dirname, '../../../../client/dist');

exports.index = (request, response) => {

  var labelData = request.label ? request.label : {
    name: 'demo1',
    applicationText: 'MJM Demo',
    title: 'Web Boilerplate'
  };

  response.status(config.status.ok).render('index', {
    applicationVersion: applicationVersion.version,
    labelName: labelData.name,
    labelData: JSON.stringify(labelData),
    pageTitle: labelData.title
  });

};


