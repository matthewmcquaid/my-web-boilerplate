import { expect } from 'chai';
import sinon from 'sinon';
import config from '../../../config/app.js';
import { buildQueryParametersString, buildUrl, apiRequest } from '../../../lib/requestHelper.js';

describe('requestHelper ', () => {

  describe('buildQueryParametersString', () => {
    it('should return a query string for GET requests with parameters', () => {
      const parameters = { name: 'test', age: 25 };
      const query = buildQueryParametersString(parameters, 'get');
      expect(query).to.equal('?name=test&age=25');
    });

    it('should return an empty string if request type is not GET', () => {
      const parameters = { name: 'test', age: 25 };
      const query = buildQueryParametersString(parameters, 'post');
      expect(query).to.equal('');
    });

    it('should return an empty string if no parameters are provided', () => {
      const query = buildQueryParametersString(null, 'get');
      expect(query).to.equal('');
    });
  });

  describe('buildUrl', () => {
    beforeEach(() => {
      sinon.stub(config, 'apiProtocol').value('http:');
      sinon.stub(config, 'apiHostname').value('localhost');
      sinon.stub(config, 'apiPort').value(3000);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should build a URL with query parameters for GET requests', () => {
      const endpoint = '/api/test';
      const parameters = { name: 'test' };
      const url = buildUrl(endpoint, parameters, 'get');
      expect(url).to.equal('http://localhost:3000/api/test?name=test');
    });

    it('should build a URL without query parameters for non-GET requests', () => {
      const endpoint = '/api/test';
      const url = buildUrl(endpoint, null, 'post');
      expect(url).to.equal('http://localhost:3000/api/test');
    });
  });

  describe('apiRequest', () => {
    it('should return a mock response with testing data', async () => {
      const response = await apiRequest('get', '/api/test', null, null, null, null, false);
      expect(response).to.deep.equal({ data: { testing: 'good' }, status: 200 });
    });
  });
});