// Path module for working with directories and filepaths
const path = require('path');
const jsdom = require('jsdom');

// Create JSDOM constructor
const { JSDOM } = jsdom;

const renderDOM = async (filename) => {
    // Define the filepath
    const filePath = path.join(process.cwd(), filename);

    // Construct the DOM to test
    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously',
        resources: 'usable'
    });

    // Wait for DOM to load
    return new Promise((resolve, _) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom);
        });
    });
};

// Export function
module.exports = { renderDOM };