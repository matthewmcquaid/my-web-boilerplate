'use strict';

const express = require('express'),
  client = require('./routes/client/index'),
  router = express.Router();

router.use(express.static(client.staticDir));

router.get('*', client.index);

module.exports = router;
