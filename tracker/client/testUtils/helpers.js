// Import required modules
const path = require('path');
const { JSDOM } = require('jsdom');

// Create a fake DOM to test
const renderDOM = async (htmlPath) => {
  const dom = await JSDOM.fromFile(
    path.resolve(process.cwd(), htmlPath),
    'utf8'
  );

  return dom;
};

// Export the fake DOM to be used in testing
module.exports = { renderDOM };
