import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import jsxChai from 'jsx-chai'

//import jsdom from 'jsdom';
//const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
//const win = doc.defaultView;
//
//global.document = doc;
//global.window = win;
//
//Object.keys(window).forEach((key) => {
//  if (!(key in global)) {
//    global[key] = window[key];
//  }
//});

chai.use(chaiImmutable);
chai.use(jsxChai);

//
//module.exports = function(markup) {
//  if (typeof document !== 'undefined') return;
//  var jsdom = require('jsdom').jsdom;
//  global.document = jsdom(markup || '');
//  global.window = document.parentWindow;
//  global.navigator = {
//    userAgent: 'node.js'
//  };
//};
//
//Then, at the top of any test that needs a DOM, we put this snippet:
//
//require('./testdom')('<html><body></body></html>');
