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
  
      expect(next.called).to.be.true;
      expect(res.status.called).to.be.false;
      expect(res.send.called).to.be.false;
    });
  
    it('should respond with 401 if authorization token is missing', async () => {
      await authorizeMiddleware(req, res, next);
  
      expect(res.status.lastCall.args[0]).to.equal(config.status.unauthorized)
      expect(res.send.lastCall.args[0].message).to.equal(config.error.unauthorized);
      expect(next.called).to.be.false;
    });
  
  });