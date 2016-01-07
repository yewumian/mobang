魔棒
========
[![Build Status](https://secure.travis-ci.org/pillys/mobang.png)](http://travis-ci.org/pillys/mobang)

非常高效的图片无损压缩工具，前端开发人员必备，压缩比通常能够达到 60%

## 图片无损压缩工具

* 支持启动本地server，默认开启 3003 端口

* 支持使用命令直接压缩本地文件

* 支持 png、jpg 格式的图片

## 安装
    
    npm install -g mobang

## 使用帮助

### 启动本地 server

控制台运行

    mobang server

即可启动web服务，浏览器访问 http://127.0.0.1:3003

### 直接命令行压缩图片

控制台运行

    mobang ./imagePath.png

    或

    mobang /my/dir/name/

即可压缩对应的图片或目录中所有图片，支持相对路径、绝对路径

### 图片压缩内核

压缩内核驱动：tinypng