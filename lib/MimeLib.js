"use strict";
var MimeLib = {};

['text/html', 'text/css', 'application/javascript'].forEach(function (mime) {
  MimeLib[mime] = function (req, res, body) {
    if (body instanceof Error)
      return body.stack;
    if (Buffer.isBuffer(body))
      return body.toString();
    return body;
  }
});

module.exports = MimeLib;