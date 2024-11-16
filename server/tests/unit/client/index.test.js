import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';
import config from '../../../config/app.js';
import applicationVersion from '../../../../package.json' assert { type: 'json' };
import clientModule from '../../../routes/client/index.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

describe('Client Module', () => {
  describe('staticDir', () => {
    it('should resolve to the correct static directory path', () => {
      const expectedPath = path.resolve(__dirname, '../../../../../client/dist');
      expect(clientModule.staticDir).to.equal(expectedPath);
    });
  });

  describe('index', () => {
    let request, response;

    beforeEach(() => {
      request = { label: null }; 
      response = {
        status: sinon.stub().returnsThis(),
        render: sinon.spy()
      };
    });

    it('should call response.render with default label data when request.label is null', () => {
      clientModule.index(request, response);

      expect(response.status.calledOnceWith(config.status.ok)).to.be.true;
      expect(response.render.calledOnce).to.be.true;
      expect(response.render.calledWith('index', {
        applicationVersion: applicationVersion.version,
        labelName: 'demo1',
        labelData: JSON.stringify({
          name: 'demo1',
          applicationText: 'MJM Demo',
          title: 'Web Boilerplate'
        }),
        pageTitle: 'Web Boilerplate'
      })).to.be.true;
    });

    it('should call response.render with custom label data when request.label is provided', () => {
      const customLabelData = {
        name: 'customApp',
        applicationText: 'Custom Application Text',
        title: 'Custom Title'
      };
      request.label = customLabelData;

      clientModule.index(request, response);

      expect(response.status.calledOnceWith(config.status.ok)).to.be.true;
      expect(response.render.calledOnce).to.be.true;
      expect(response.render.calledWith('index', {
        applicationVersion: applicationVersion.version,
        labelName: customLabelData.name,
        labelData: JSON.stringify(customLabelData),
        pageTitle: customLabelData.title
      })).to.be.true;
    });
  });
});