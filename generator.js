const { createCanvas } = require("canvas");
const fs = require('fs');
const webp = require('webp-converter');

webp.grant_permission();

var Generator = function(ctx) {
  this.ctx = ctx;
}

Generator.prototype.save = function(width, height) {
  const data = this.ctx.getImageData(0, 0, width, height);
  //const canvas = document.createElement('canvas');
  const canvas_width = data.width;
  const canvas_height = data.height - 10;
  const canvas = createCanvas(canvas_width, canvas_height);
  const ctx = canvas.getContext('2d');
  ctx.putImageData(data, 0, 0);

  const out = fs.createWriteStream(__dirname+'/test.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  
}

Generator.prototype.createBuffer = function(width, height, t, callback) {
  const data = this.ctx.getImageData(0, 0, width, height);
  const canvas_width = data.width;
  const canvas_height = data.height - 10;
  const canvas = createCanvas(canvas_width, canvas_height);
  const ctx = canvas.getContext('2d');
  ctx.putImageData(data, 0, 0);

  // WebPの場合は別な処理を行う
  if (t === 'webp') {
    // 一旦PNG出力
    canvas.toBuffer((err, buf) => {
      // Q=64でWebP変換
      var webpbuf = webp.buffer2webpbuffer(buf, 'png');
      webpbuf.then(function (b) {
        return callback(b);
      });
    }, 'image/png');
    return;
  }

  canvas.toBuffer((err, buf) => {
    if (err) {
      console.log(err);
      callback('error');
      return;
    }
    return callback(buf);
  }, 'image/'+t);
}

module.exports = {Generator}
