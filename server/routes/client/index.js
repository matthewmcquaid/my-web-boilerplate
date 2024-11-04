import path from 'path';
import config from '../../config/app.js';
import applicationVersion from '../../../package.json' assert { type: 'json' };
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const staticDir = path.resolve(__dirname, '../../../../client/dist');

const index = (request, response) => {
  const labelData = request.label || {
    name: 'demo1',
    applicationText: 'MJM Demo',
    title: 'Web Boilerplate'
  };
  console.log('loading client');

  response.status(config.status.ok).render('index', {
    applicationVersion: applicationVersion.version,
    labelName: labelData.name,
    labelData: JSON.stringify(labelData),
    pageTitle: labelData.title
  });
};
export default { index, staticDir};
