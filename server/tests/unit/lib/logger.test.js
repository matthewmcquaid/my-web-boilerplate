import { expect } from 'chai';
import sinon from 'sinon';
import logger from '../../../lib/logger.js';

describe('Logger', () => {
  let infoSpy;

  beforeEach(() => {
    infoSpy = sinon.spy(logger, 'info');
  });

  afterEach(() => {
    infoSpy.restore();
  });

  it('should log messages with the correct log level', () => {
    logger.info('Test log message');

    expect(infoSpy.calledOnce).to.be.true;
    expect(infoSpy.calledWith('Test log message')).to.be.true;
  });

  it('should trim whitespace from the message in logger.stream.write', () => {
    logger.stream.write('  Test stream log message  ');

    expect(infoSpy.calledOnce).to.be.true;
    expect(infoSpy.calledWith('Test stream log message')).to.be.true;
  });

  it('should log at the level set in process.env.LOG_LEVEL or default to "info"', () => {
    const logLevel = process.env.LOG_LEVEL || 'info';
    expect(logger.level).to.equal(logLevel);
  });
});