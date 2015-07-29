"use strict";
var path = require('path');
var config = require('../conf/config');
var restify = require('restify');

module.exports = function () {
  var server = restify.createServer({
    name: config.server.name,
    formatters: require('./MimeLib')
  });

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.jsonp());
  server.use(restify.gzipResponse());
  server.use(restify.conditionalRequest());

  server.get(/^\/css\/.*|^\/js\/.*|^\/images\/.*|^\/fonts\/.*|^\/favicon\.ico/, restify.serveStatic({
    directory: path.join(__dirname, '../', 'static')
  }));

  require('./routes')(server);

  server.listen(config.server.port, function () {
    console.log('%s listening at %s', server.name, server.url);
  });
};