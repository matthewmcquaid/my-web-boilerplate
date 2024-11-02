

'use strict';

const router = require('express').Router(),
  routes = require('./routes'),
  bodyParser = require('body-parser'),
  validateRequest = require('./middleware/validateRequest');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.get('/', routes.getAppIndex);


router.get('/version', validateRequest, routes.getApiVersion);

module.exports = router;
