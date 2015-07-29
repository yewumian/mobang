"use strict";
var fs = require('fs');
var path = require('path');
var restify = require('restify');
var async = require('async');

var RestLib = function (req) {
  this.req = req;
  this.url = 'https://tinypng.com';
  return this;
};

RestLib.prototype.transfer = function (callback) {
  var that = this,
    client;
  client = restify.createClient({
    url: that.url
  });
  client.request(client._options('POST', '/site/shrink'), function (err, req) {
    if (err) {
      callback(err);
    } else {
      req.on('result', function (err, res) {
        if (err) {
          callback(err);
        } else {
          var chunks = [];
          res.on('data', function (chunk) {
            chunks.push(chunk);
          });
          res.on('error', function (err) {
            callback(err);
          });
          res.on('end', function () {
            var data = chunks.join('');
            try {
              data = JSON.parse(data);
              if (res.statusCode === 200 || res.statusCode === 201) {
                callback(null, data);
              } else {
                callback(new Error('http status ' + res.statusCode));
              }
            } catch (e) {
              console.log(e);
              callback(e);
            }
          });
        }
      });
      that._getUploadData(req, function (err) {
        if (err) {
          callback(err);
        } else {
          req.end();
        }
      });
    }
  });
};

RestLib.prototype.rewrite = function (url, filepath) {
  var that = this,
    client;
  client = restify.createClient({
    url: that.url
  });
  url = url + '/' + filepath.replace(/\\/g, '/').split('/').reverse().slice(0, 1);
  client.request(client._options('GET', url.replace(that.url, '')), function (err, req) {
    if (err) {
      throw err;
    } else {
      req.on('result', function (err, res) {
        if (err) {
          throw err;
        } else {
          res.pipe(fs.createWriteStream(filepath));
        }
      });
      req.end();
    }
  });
};

RestLib.prototype.download = function (url, response) {
  var that = this,
    client;
  client = restify.createClient({
    url: that.url
  });
  url = '/site/output/' + url;
  client.request(client._options('GET', url), function (err, req) {
    if (err) {
      callback(err);
    } else {
      req.on('result', function (err, res) {
        if (err) {
          callback(err);
        } else {
          response.setHeader('content-type', 'application/octet-stream');
          res.pipe(response);
        }
      });
      req.end();
    }
  });
};

RestLib.prototype._getUploadData = function (req, callback) {
  var that = this,
    files = [];
  if (typeof that.req === 'string') {
    if (!path.isAbsolute(that.req)) {
      that.req = path.join(process.cwd(), that.req);
    }
    files.push(that.req);
  } else {
    if (that.req._contentType === 'multipart/form-data' && that.req.files) {
      Object.keys(that.req.files).forEach(function (key) {
        files.push(that.req.files[key].path);
      });
    }
  }
  if (files.length > 0) {
    console.log('compressing ' + files + ' ...');
    async.eachSeries(Object.keys(files), function (file, callback) {
      var readstream = fs.createReadStream(files[file]);
      readstream.on('error', function (err) {
        callback(err);
      });
      readstream.on('end', function () {
        callback(null);
      });
      readstream.pipe(req);
    }, function (err) {
      callback(err);
    });
  } else {
    callback(null);
  }
};

module.exports = RestLib;