import Laser from './laser';
import Mirror from './mirror';

class Game {
  constructor(canvas) {
    this.lasers = [];
    this.mirrors = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.scaleByDevicePixelRatio(600);

    document.addEventListener('keydown', event => {
      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          console.log(this.lasers[0]);
          this.lasers[0].rotateSprite(-1.5);
          this.renderEntities();
          break;
        case 'ArrowRight':
        case 'KeyD':
          console.log(this.lasers[0]);
          this.lasers[0].rotateSprite(1.5);
          this.renderEntities();
          break;
        default:

      }
    });
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.mirrors.length; i++) {
      this.mirrors[i].draw();
    }

    for (var i = 0; i < this.lasers.length; i++) {
      this.lasers[i].draw();
    }

    for (var i = 0; i < this.lasers.length; i++) {
      this.lasers[i].drawLaser();
    }
  }

  addLaser(x, y) {
    const laser = new Laser(x, y, this.ctx, -180);

    this.lasers.push(laser);
  }

  addMirror(x, y) {
    const mirror = new Mirror(x, y, this.ctx);

    this.mirrors.push(mirror);
  }
}

export default Game;
