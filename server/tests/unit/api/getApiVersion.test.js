import { expect } from 'chai';
import sinon from 'sinon';
import config from '../../../config/app.js';
import requestHelper from '../../../lib/requestHelper.js';
import getApiVersion from '../../../routes/api/getApiVersion.js';

describe('API Version', () => {
  let req, res;

  beforeEach(() => {
    req = {}; 
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      send: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should respond with status and data on successful request', async () => {
    const mockResponse = { status: 200, data: { version: '1.0.0' } };
    sinon.stub(requestHelper, 'apiRequest').resolves(mockResponse);

    await getApiVersion(req, res);

    expect(res.status.lastCall.args[0] === 200).to.be.true;
    expect(res.json.lastCall.args[0]).to.equal(mockResponse.data);
  });

  it('should respond with error status and message if request fails', async () => {
    const mockError = { status: 504, response: { text: 'Gateway Timeout' } };
    sinon.stub(requestHelper, 'apiRequest').rejects(mockError);

    await getApiVersion(req, res);

    expect(res.status.lastCall.args[0] === 504).to.be.true;
    expect(res.send.lastCall.args[0]).to.equal('Gateway Timeout');

  });

  it('should use default status and message if error response is missing', async () => {
    const mockError = {}; 
    sinon.stub(requestHelper, 'apiRequest').rejects(mockError);

    await getApiVersion(req, res);

    expect(res.status).to.have.been.calledOnceWith(config.status.gatewayTimeout);
    expect(res.send).to.have.been.calledOnceWith(config.error.noResponse);
  });
});