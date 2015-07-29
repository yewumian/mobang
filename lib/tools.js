"use strict";
var config = require('../conf/config');
var RestLib = require('./RestLib');

module.exports = {
  compress: function (filepath) {
    filepath = filepath[0];
    var restLib = new RestLib(filepath);
    restLib.transfer(function (err, data) {
      if (err) {
        throw err;
      } else {
        console.log('尺寸：' + data.output.width + ' * ' + data.output.height);
        console.log('压缩前：' + parseInt(data.input.size / 1024) + 'k');
        console.log('压缩后：' + parseInt(data.output.size / 1024) + 'k');
        console.log('压缩比：' + (1 - data.output.ratio) * 100 + '%');
        restLib.rewrite(data.output.url, filepath);
      }
    });
  }
};