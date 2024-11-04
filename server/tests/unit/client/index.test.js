import { expect } from 'chai';
import sinon from 'sinon';
import index from '../../../routes/client/index.js';
import config from '../../../config/app.js';
import applicationVersion from '../../../../package.json' assert { type: 'json' };

describe('Index Handler', () => {
  let req, res;

  beforeEach(() => {
    req = {}; 
    res = {
      status: sinon.stub().returnsThis(),
      render: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the index page with default label data if request label is not provided', () => {
    index(req, res);

    expect(res.status).to.have.been.calledOnceWith(config.status.ok);
    expect(res.render).to.have.been.calledOnceWith('index', {
      applicationVersion: applicationVersion.version,
      labelName: 'demo1',
      labelData: JSON.stringify({
        name: 'demo1',
        applicationText: 'MJM Demo',
        title: 'Web Boilerplate'
      }),
      pageTitle: 'Web Boilerplate'
    });
  });

  it('should render the index page with custom label data if request label is provided', () => {
    req.label = {
      name: 'customLabel',
      applicationText: 'Custom App Text',
      title: 'Custom Title'
    };

    index(req, res);

    expect(res.status).to.have.been.calledOnceWith(config.status.ok);
    expect(res.render).to.have.been.calledOnceWith('index', {
      applicationVersion: applicationVersion.version,
      labelName: 'customLabel',
      labelData: JSON.stringify(req.label),
      pageTitle: 'Custom Title'
    });
  });
});