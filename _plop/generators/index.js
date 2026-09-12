/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const path = require('path');
const { execSync } = require('child_process');
const mainGenerator = require('./components/index.js');
/**
 * Every generated backup file gets this extension
 * @type {string}
 */
const BACKUPFILE_EXTENSION = 'rbgen';

module.exports = (plop) => {
  plop.setGenerator('component', mainGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.addHelper('eq', function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**',
      '**.js'
    )}`;

    try {
      execSync(`npm run prettify -- "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });
};

module.exports.BACKUPFILE_EXTENSION = BACKUPFILE_EXTENSION;
