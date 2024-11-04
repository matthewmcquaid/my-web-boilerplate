import config from '../config/app.js';

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

export default async (req, res, next) => {
  return authorize(req)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(config.status.unauthorized).send({message: config.error.unauthorized});
    });
};

