#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
var readdir = require('fsk-readdir');
var tools=require('../lib/tools');

if (argv._ && argv._.length > 0) {
  if (argv._.indexOf('server') !== -1) {
    require('../lib/server')();
  } else {
    if(readdir.isDir(argv._[0])){
      var currGroup=0,groupIndex=0,
         files=readdir.readdirSync(argv._[0],false,false,true),
         num=5,//每次并发数量
         length=Math.floor(files.length/num);
      compressdir(files.slice(currGroup*num, (currGroup+1)*num));
    }else if(readdir.isFile(argv._[0])){
      require('../lib/tools').compress(argv._[0]);
    }else{
      console.log('参数应是目录或文件名！');
    }
  }
} else {
  console.log('启动服务：mobang server');
  console.log('本地压缩：mobang ./imagePath.png');
}
function compressdir(groupfiles){
  groupfiles.map(function(val){
    var backname=val.substr(val.lastIndexOf('.')).toLowerCase();
    if('.jpg|.png'.indexOf(backname)!==-1){
      tools.compress(val,function(){
        groupIndex++;
        if(groupIndex==num && currGroup<length){
          currGroup++;
          groupIndex=0;
          compressdir(files.slice(currGroup*num, (currGroup+1)*num));
        }
      });
    }
  });
}