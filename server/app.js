'use strict';

const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  compression = require('compression'),
  logger = require('./lib/logger');


module.exports = () => {

  app.use(morgan('combined',{ 'stream': logger.stream }));

  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');
  app.use(compression());
  app.use('/api', require('./apiRouter'));
  app.use('', require('./clientRouter.js'));

  return app;
};