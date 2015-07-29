#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
if (argv._ && argv._.length > 0) {
  if (argv._.indexOf('server') !== -1) {
    require('../lib/server')();
  } else {
    require('../lib/tools').compress(argv._);
  }
} else {
  console.log('启动服务：mobang server');
  console.log('本地压缩：mobang ./imagePath.png');
}