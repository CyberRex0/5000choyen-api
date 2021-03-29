const { createCanvas, registerFont } = require("canvas");
const { Canvas } = require("./canvas.js");

const http = require('http');
const escape = require('escape-html');
const process = require('process');
const fs = require('fs');
const crypto = require('crypto');

const APP_VER = '1.4';

// webp-converter対策
if (!fs.existsSync('node_modules/webp-converter/temp')) {
  fs.mkdirSync('node_modules/webp-converter/temp');
}

/* globals Canvas */
var _canvas = null;

registerFont('./notobk-subset.otf', {family: 'notobk'});
registerFont('./notoserifbk-subset.otf', {family: 'notoserifbk'});

function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
  }
  return ab;
}

http.createServer(function (req, resp) {

  if (req.url == '/' || req.url == '/index.html') {
    resp.writeHead(200, {'Content-type': 'text/html'});
    resp.end('<!DOCTYPE html><head><meta charset="utf-8"><title>5000兆円ほしい！</title></head><body><h1>5000兆円ほしい！</h1><h2>使い方</h2><p>例: https://gsapi.cyberrex.ml/image?top=上部文字列&bottom=下部文字列</p><br><p>(C)2021 CyberRex<br>Under GPL3.0 License</p><br><small>Runtime v'+APP_VER+'</small></body></html>');
    return;
  }

  if (req.url.match(/^\/image\?/)) {

    var queryString = req.url.split('?')[1];
    var args = [...new URLSearchParams(queryString).entries()].reduce((obj, e) => ({...obj, [e[0]]: e[1]}), {});

    var hoshii = false;
    var noalpha = false;
    var rainbow = false;
    var imgtype = 'png';
    
    if (args.top == undefined) {
      resp.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
      resp.end('パラメータtopが不足しています。');
      return;
    }

    if (args.hoshii) {
      hoshii = args.hoshii=='true' ? true : false;
    }

    if (args.noalpha) {
      noalpha = args.noalpha=='true' ? true : false;
    }

    if (args.rainbow) {
      rainbow = args.rainbow=='true' ? true : false;
    }
 
    if (args.bottom == undefined && !hoshii) {
      resp.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
      resp.end('パラメータbottomが不足しています。');
      return;
    }

    if (args.type) {
      if (args.type === 'jpg') {
        args.type = 'jpeg';
      }
      if (args.type != 'png' && args.type != 'jpeg' && args.type != 'webp') {
        resp.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
        resp.end('パラメータtypeの値が異常です。');
        return;
      }
      imgtype = args.type;
    }

    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(JSON.stringify(args));
    const cachefname = sha1sum.digest('hex');
    const cachename = '/tmp/'+cachefname+'.'+imgtype;
    let fileExist = false;

    try {
      const cachefile = fs.statSync(cachename);
      fileExist = true;
    } catch(e) {
      fileExist = false;
    }

    if (fileExist) {
      const data = fs.readFileSync(cachename);
      resp.writeHead(200, {'Content-type': 'image/'+imgtype});
      resp.write(data);
      resp.end();
      return;
    }
    
    // vulnerability countermeasures
    if (args.top.length > 50 || args.bottom.length > 50) {
      resp.writeHead(400, {'Content-type': 'text/html;charset=UTF-8'});
      resp.write('<h1>Bad Request</h1>');
      resp.end();
      return;
    }

    const canvas = new Canvas(createCanvas(3840,1080), {hoshii: hoshii, noalpha: noalpha});

    canvas.redrawTop(args.top, rainbow);

    if (! hoshii) {
      canvas.redrawBottom(args.bottom, null, rainbow);
    } else {
      canvas.redrawImage();
    }

    resp.writeHead(200, {'Content-type': 'image/'+imgtype});
    canvas.createBuffer(imgtype, function (data) {
       resp.write(data);
       resp.end();
       fs.writeFileSync(cachename, data); // save cache
    });

    return;

  } else if (req.url=='/image') {
    resp.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
    resp.end('<h1>Invalid Request</h1>');
    return;
  }

  resp.writeHead(404, {'Content-type': 'text/html'});
  resp.end('<h1>Not Found</h1><p>The requested URL '+escape(req.url)+' was not found on this server.</p>');


}).listen(process.env.PORT || 8080);
