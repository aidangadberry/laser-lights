import Laser from './laser';
import Mirror from './mirror';

class Game {
  constructor(canvas) {
    this.lasers = [];
    this.mirrors = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.scaleByDevicePixelRatio(600);
  }

  scaleByDevicePixelRatio(canvasSize) {
    this.canvas.style.width = canvasSize + "px";
    this.canvas.style.height = canvasSize + "px";

    const scale = window.devicePixelRatio;
    this.canvas.width = canvasSize * scale;
    this.canvas.height = canvasSize * scale;

    this.ctx.scale(scale, scale);
  }

  run() {
    this.addLaser(200, 200);
    this.addMirror(300, 300);
    this.renderEntities();
  }

  renderEntities() {
    for (var i = 0; i < this.lasers.length; i++) {
      this.lasers[i].draw();
      this.lasers[i].drawLaser();
    }
    for (var i = 0; i < this.mirrors.length; i++) {
      this.mirrors[i].draw();
    }
  }

  addLaser(x, y) {
    const laser = new Laser(x, y, this.ctx, -7);

    this.lasers.push(laser);
  }

  addMirror(x, y) {
    const mirror = new Mirror(x, y, this.ctx);

    this.mirrors.push(mirror);
  }
}

export default Game;
