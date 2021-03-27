const { createCanvas } = require("canvas");
const fs = require('fs');


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

Generator.prototype.createBuffer = function(width, height, callback) {
  const data = this.ctx.getImageData(0, 0, width, height);
  const canvas_width = data.width;
  const canvas_height = data.height - 10;
  const canvas = createCanvas(canvas_width, canvas_height);
  const ctx = canvas.getContext('2d');
  ctx.putImageData(data, 0, 0);
  canvas.toBuffer((err, buf) => {
    if (err) throw err;
    return callback(buf);
  });
}

module.exports = {Generator}
