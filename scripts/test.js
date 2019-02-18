process.env.NODE_ENV = 'test';

require('@babel/register')();

require.extensions['.scss'] = () => null;

const {JSDOM} = require('jsdom');
const exposedProperties = ['window', 'document', 'navigator'];

var jsdom = new JSDOM('', {
  url: "http://localhost"
});
const {window} = jsdom;
global.document = window.document;
global.navigator = {
  'userAgent': 'node.js'
};
global.window = window;

Object.keys(window).forEach(prop => {
  if(typeof(global[prop]) === 'undefined') {
    exposedProperties.push(prop);
    global[prop] = window[prop];
  }
});

documentRef = window.document;