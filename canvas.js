/* globals SETTINGS, Drawer */

const { Drawer } = require('./drawer.js');
const { SETTINGS } = require('./settings.js');

const Canvas = function(canvas) {
  this.canvas = canvas;
  /*this.canvas.addEventListener('mousedown', this.onDown.bind(this), false);
  this.canvas.addEventListener('mousemove', this.onMove.bind(this), false);
  this.canvas.addEventListener('mouseup', this.onUp.bind(this), false);
  this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
  this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false);
  this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), false);
  */
  
  this.ctx = canvas.getContext('2d');
  this.ctx.lineJoin = 'round';
  this.ctx.lineCap = 'round';
  this.ctx.fillStyle = 'white';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
  this.offset = {
    top:    { x: 0, y: 0 },
    bottom: { x: 250, y: 130 }
  };

  this.dragging = false;
  this.dragPosition = { x0: 0, y0: 0 };

  this.drawer = new Drawer(this.ctx);
}

Canvas.prototype.onDown = function(e) {
  this.dragging = true;
  this.dragPosition.x0 = e.clientX;
  this.dragPosition.y0 = e.clientY;
};

Canvas.prototype.onMove = function(e) {
  const dx = e.clientX - this.dragPosition.x0;
  const x  = this.offset.bottom.x + dx;
  if (this.dragging) {
    if (SETTINGS.TEXT_ORDER() === `image`)
      this.redrawImage(x);
    else
      this.redrawBottom(x);
  }
  if (this.upperEndPosition() < e.clientY && e.clientY < this.lowerEndPosition())
    document.body.style.cursor = "move";
  else
    document.body.style.cursor = "auto"
};

Canvas.prototype.onUp = function(e) {
  var dx = e.clientX - this.dragPosition.x0;
  this.offset.bottom.x += dx;
  this.dragging = false;
};

Canvas.prototype.onTouchStart = function(e) {
  e.preventDefault();
  e.clientX = e.touches[0].clientX;
  e.clientY = e.touches[0].clientY;
  this.onDown(e);
};

Canvas.prototype.onTouchMove = function(e) {
  e.preventDefault();
  e.clientX = e.touches[0].clientX;
  e.clientY = e.touches[0].clientY;
  this.onMove(e);
};

Canvas.prototype.onTouchEnd = function(e) {
  e.preventDefault();
  e.clientX = e.changedTouches[0].clientX;
  e.clientY = e.changedTouches[0].clientY;
  this.onUp(e);
};

Canvas.prototype.upperEndPosition = function() {
  return this.canvas.getBoundingClientRect().top + this.offset.bottom.y;
}

Canvas.prototype.lowerEndPosition = function() {
  return this.canvas.getBoundingClientRect().top + (this.canvas.height - 10);
}

Canvas.prototype.redrawTop = function (text) {
  const x     = 70;
  const y     = 100;
  const order = SETTINGS.BACKGROUND_ORDER();
  this.drawer.redrawTop(text, x, y, order);
  if (SETTINGS.TEXT_ORDER() === "image")
    this.redrawImage();
  else
    this.redrawBottom(text);
}

Canvas.prototype.redrawBottom = function (txt, offsetX) {
  const text  = txt.replace(/！/, `!`);
  const x     = (offsetX || this.offset.bottom.x) + 70;
  const y     = this.offset.bottom.y + 100;
  const order = SETTINGS.BACKGROUND_ORDER();
  this.drawer.redrawBottom(text, x, y, order);
}

Canvas.prototype.redrawImage = function(offsetX) {
  const x     = (offsetX || this.offset.bottom.x) + 70;
  const y     = this.offset.bottom.y;
  const order = SETTINGS.BACKGROUND_ORDER();
  this.drawer.redrawImage(x, y, order);
}

Canvas.prototype.save = function() {
  this.drawer.save();
}

module.exports = {Canvas}