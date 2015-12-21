"use strict";
var config = require('../conf/config');
var RestLib = require('./RestLib');

module.exports = {
  compress: function (filepath,callback) {
    var restLib = new RestLib(filepath);
    restLib.transfer(function (err, data) {
      if (err) {
        //throw err;
        console.log('压缩图片'+filepath+'错误，错误信息：'+err);
      } else {
        console.log('图片：' + filepath + '  尺寸：' + data.output.width + ' * ' + data.output.height+'  压缩前：' + parseInt(data.input.size / 1024) + 'k'+'  压缩后：' + parseInt(data.output.size / 1024) + 'k'+'  压缩比：' + (1 - data.output.ratio) * 100 + '%');
        // console.log('压缩前：' + parseInt(data.input.size / 1024) + 'k');
        // console.log('压缩后：' + parseInt(data.output.size / 1024) + 'k');
        // console.log('压缩比：' + (1 - data.output.ratio) * 100 + '%');
        restLib.rewrite(data.output.url, filepath);
      }
      if(callback){
        callback();
      }
    });
  }
};