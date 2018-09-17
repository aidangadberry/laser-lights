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

    this.addListeners();
  }

  scaleByDevicePixelRatio(canvasSizeX, canvasSizeY) {
    this.canvas.style.width = canvasSizeX + "px";
    this.canvas.style.height = canvasSizeY + "px";

    const scale = window.devicePixelRatio;
    this.canvas.width = canvasSizeX * scale;
    this.canvas.height = canvasSizeY * scale;

    this.ctx.scale(scale, scale);
  }

  resizeCanvas() {
    this.scaleByDevicePixelRatio(window.innerWidth, window.innerHeight)

    this.renderEntities();
  }

  run() {
    this.addLaser(200, 200, 312);
    this.addLaser(430, 300, 140);
    this.addMirror(300, 100);
    this.addMirror(310, 130, 180);
    this.addMirror(100, 400, 270);
    this.addMirror(400, 40);
    this.addMirror(210, 500, 180);
    this.resizeCanvas();
    this.currentSprite[0] = this.lasers[1];
  }

  renderEntities() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (var i = 0; i < this.lasers.length; i++) {
      let laser = this.lasers[i]
      getBeams(laser, this.lasers, this.mirrors);
    }

    for (var i = 0; i < this.mirrors.length; i++) {
      this.mirrors[i].draw();
    }

    for (var i = 0; i < this.lasers.length; i++) {
      this.lasers[i].draw();
    }
  }

  addLaser(x, y, deg = 0) {
    const laser = new Laser(x, y, this.ctx, deg);

    this.lasers.push(laser);
  }

  addMirror(x, y, deg = 0) {
    const mirror = new Mirror(x, y, this.ctx, deg);

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

  addListeners() {
    let turnInterval = null;

    document.addEventListener("keypress", event => {
      switch (event.code) {
        case "ArrowLeft":
        case "KeyA":
          if (this.currentSprite[0] instanceof Laser) {
            turnInterval = setInterval(this.currentSprite[0].rotateSprite(-0.5), 1);
          } else {
            this.currentSprite[0].rotateSprite(-90);
          }
          this.renderEntities();
          break;
        case "ArrowRight":
        case "KeyD":
          if (this.currentSprite[0] instanceof Laser) {
            this.currentSprite[0].rotateSprite(0.1);
          } else {
            this.currentSprite[0].rotateSprite(90);
          }
          this.renderEntities();
          break;
        default:
      }
    });

    document.addEventListener("keyup", clearInterval(turnInterval));

    document.addEventListener("mousedown", e => this.onMouseDown(e));
    window.addEventListener("resize", () => this.resizeCanvas());
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
