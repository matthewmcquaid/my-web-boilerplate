
'use strict';

const config = require('./../config/app');

const authorize = (req) => {

  return new Promise((resolve, reject) => {

    let token = req.headers['authorization'];
    if (!token) {
      reject(req);
    } else {
      try {
        //TODO: Add user healper verifyToken
        resolve(req);
      } catch (e) {
        reject(req);
      }
    }
  })
};

module.exports = (req, res, next) => {
  return authorize(req)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(config.status.unauthorized).send({message: config.error.unauthorized});
    });
};

