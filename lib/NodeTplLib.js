"use strict";
var fs = require('fs');
var path = require('path');
var nodetpl = require('nodetpl');

var NodeTplLib = function (req, res) {
  this.req = req;
  this.res = res;
  return this;
};

NodeTplLib.prototype.register = function () {
  var that = this;
  that.res.render = function (tpl, data, callback) {
    tpl = path.join(__dirname, '../views', tpl + '.tpl');
    if (typeof data === 'function') {
      callback = data;
      data = {};
    }
    fs.readFile(tpl, 'utf-8', function (err, d) {
      if (err) {
        callback(err);
      } else {
        if (that.res) {
          data = nodetpl.tplcompile(d, data);
          that.res.setHeader('Content-Type', 'text/html');
          that.res.charSet('utf-8');
          that.res.send(data);
          callback && callback(null, data)
        }
      }
    });
  };
  return this;
};

module.exports = NodeTplLib;