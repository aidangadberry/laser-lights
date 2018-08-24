import Laser from './laser';
import Mirror from './mirror';
import {getBeams} from './beam';
import {pointIsOnMirrorEdge, collidesWithObject} from './util';

class Game {
  constructor(canvas) {
    this.lasers = [];
    this.mirrors = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.currentSprite = [];

    this.scaleByDevicePixelRatio(600);

    document.addEventListener('keydown', event => {
      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          if (this.currentSprite[0] instanceof Laser) {
            this.currentSprite[0].rotateSprite(-1.5);
          } else {
            this.currentSprite[0].rotateSprite(-90);
          }
          this.renderEntities();
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (this.currentSprite[0] instanceof Laser) {
            this.currentSprite[0].rotateSprite(1.5);
          } else {
            this.currentSprite[0].rotateSprite(90);
          }
          this.renderEntities();
          break;
        default:

      }
    });

    document.addEventListener('mousedown', e => this.onMouseDown(e));
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
    this.addLaser(430, 300);
    this.addMirror(300, 100);
    this.addMirror(310, 130);
    this.addMirror(100, 200);
    this.addMirror(400, 40);
    this.addMirror(210, 500);
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
      let laser = this.lasers[i]
      getBeams(laser, this.lasers, this.mirrors);
    }
  }

  addLaser(x, y) {
    const laser = new Laser(x, y, this.ctx, -45);

    this.lasers.push(laser);
  }

  addMirror(x, y) {
    const mirror = new Mirror(x, y, this.ctx);

    this.mirrors.push(mirror);
  }

  getCursorPosition(canvas, e) {
      var bounds = canvas.getBoundingClientRect();
      var x = e.clientX - bounds.left;
      var y = e.clientY - bounds.top;
      return [x, y];
  }

  rectangleMouseCollision(cursorPos, sprite) {
    return (
      cursorPos[0] >= sprite.x && cursorPos[0] <= sprite.x + sprite.width &&
      cursorPos[1] >= sprite.y && cursorPos[1] <= sprite.y + sprite.height
    );
  }

  onMouseDown(e) {
    e.stopPropagation();

    for (var i = 0; i < this.lasers.length; i++) {
      if (collidesWithObject(this.getCursorPosition(this.canvas, e), this.lasers[i])) {
        this.currentSprite[0] = this.lasers[i];
        Array.from(document.getElementsByTagName('img')).forEach(img => img.classList.remove('active'));
        document.getElementById('laser-image').classList.add('active');
        // this.canvas.addEventListener('mousemove', this.onMouseMove);
        return;
      }
    }
    for (var i = 0; i < this.mirrors.length; i++) {
      if (collidesWithObject(this.getCursorPosition(this.canvas, e), this.mirrors[i])) {
        this.currentSprite[0] = this.mirrors[i];
        Array.from(document.getElementsByTagName('img')).forEach(img => img.classList.remove('active'));
        document.getElementById('mirror-image').classList.add('active');
        // this.canvas.addEventListener('mousemove', this.onMouseMove);
        return;
      }
    }
  }

  // onMouseMove(e) {
  //   e.stopPropagation();
  // }
}

export default Game;
