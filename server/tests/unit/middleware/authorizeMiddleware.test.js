import  { expect } from 'chai';
import sinon from 'sinon';

import config from '../../../config/app.js';
import authorizeMiddleware from '../../../middleware/authorizeMiddleware.js';
describe('Authorization Middleware', () => {
    let req, res, next;
  
    beforeEach(() => {

      req = {
        headers: {}
      };
      res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };
      next = sinon.spy();
    });
  
    it('should call next if authorization token is present', async () => {
      req.headers['authorization'] = 'valid-token';
      
      await authorizeMiddleware(req, res, next);
  
      expect(next).to.have.been.calledOnce;
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });
  
    it('should respond with 401 if authorization token is missing', async () => {
      await authorizeMiddleware(req, res, next);
  
      expect(res.status).to.have.been.calledOnceWith(config.status.unauthorized);
      expect(res.send).to.have.been.calledOnceWith({ message: config.error.unauthorized });
      expect(next).to.not.have.been.called;
    });
  
    it('should respond with 401 if an error occurs during authorization', async () => {
      req.headers['authorization'] = 'invalid-token';
  
      // Simulate an error in the authorize function
      const authorizeStub = sinon.stub().rejects();
      await authorizeMiddleware(req, res, next);
  
      expect(res.status).to.have.been.calledOnceWith(config.status.unauthorized);
      expect(res.send).to.have.been.calledOnceWith({ message: config.error.unauthorized });
      expect(next).to.not.have.been.called;
    });
  });