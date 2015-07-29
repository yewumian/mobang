"use strict";
var config = require('../conf/config');
var RestLib = require('./RestLib');
var NodeTplLib = require('./NodeTplLib');

module.exports = function (server) {
  // 提前处理
  server.pre(function (req, res, next) {
    // 为 response 注册 render 方法
    new NodeTplLib(req, res).register();
    next();
  });

  // Routes
  server.get('/', function (req, res, next) {
    res.render('index', next);
  });

  server.post('/upload', function (req, res, next) {
    var restLib = new RestLib(req);
    restLib.transfer(function (err, data) {
      if (err) {
        console.log(err);
        res.send(500, err.toString());
      } else {
        res.setHeader('content-type', 'application/json');
        res.charSet('utf-8');
        if (data.output && data.output.url) {
          data.output.url = data.output.url.split('/').reverse().slice(0, 1).join('');
        }
        res.send(200, {
          flag: 1,
          data: data
        });
      }
    })
  });

  server.get('/download/:name/:path', function (req, res, next) {
    var restLib = new RestLib(req);
    restLib.download(req.params.name + '/' + req.params.path, res);
  });

};