const { createCanvas } = require("canvas");
const { Canvas } = require("./canvas.js");

const http = require('http');
const escape = require('escape-html');
const process = require('process');

const APP_VER = '1.0';

/* globals Canvas */
var _canvas = null;

function initCanvas() {
  var canvas = createCanvas(1920, 1080);
  _canvas = new Canvas(canvas);
};


/*
initCanvas();
_canvas.redrawTop('なんだろう');
_canvas.redrawBottom('欲しい！');
_canvas.save();
*/

http.createServer(function (req, resp) {

  if (req.url == '/' || req.url == '/index.html') {
    resp.writeHead(200, {'Content-type': 'text/html'});
    resp.end('<!DOCTYPE html><head><meta charset="utf-8"><title>5000兆円ほしい！</title></head><body><h1>5000兆円ほしい！</h1><h2>使い方</h2><p>https://onetr.cyberrex.ml/image?top=上部文字列&bottom=下部文字列</p><br><p>(C)2021 CyberRex<br>Under GPL3.0 License</p><br><small>Runtime v'+APP_VER+'</small></body></html>');
    return;
  }

  if (req.url.match(/^\/image\?/)) {

    var queryString = req.url.split('?')[1];
    var args = [...new URLSearchParams(queryString).entries()].reduce((obj, e) => ({...obj, [e[0]]: e[1]}), {});

    if (args.top == undefined) {
      resp.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
      resp.end('パラメータtopが不足しています。');
      return;
    }

    if (args.bottom == undefined) {
      resp.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
      resp.end('パラメータbottomが不足しています。');
      return;
    }

    /*resp.writeHead(200, {'Content-type': 'text/html'});
    resp.end('test');*/
    const canvas = new Canvas(createCanvas(1920,1080));
    canvas.redrawTop(args.top);
    canvas.redrawBottom(args.bottom);
    resp.writeHead(200, {'Content-type': 'image/png'});
    resp.end(_canvas.createBuffer());

    return;

  } else if (req.url=='/image') {
    resp.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
    resp.end('使い方が間違っています。<br><a href="/">使い方を確認</a>');
    return;
  }

  resp.writeHead(404, {'Content-type': 'text/html'});
  resp.end('<h1>Not Found</h1><p>The requested URL '+escape(req.url)+' was not found on this server.</p>');


}).listen(process.env.PORT);
