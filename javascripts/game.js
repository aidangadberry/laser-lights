import Laser from './laser';
import Mirror from './mirror';
import {getBeams} from './beam';
import {pointIsOnMirrorEdge, collidesWithObject} from './util';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.entities = [];
    this.currentEntity;

    this.mouseX;
    this.mouseY;
    this.dragging = false;
    this.dragX;
    this.dragY;
  }

  run() {
    this.addListeners();

    this.addLaser(200, 200, 312);
    this.addLaser(430, 300, 140);
    this.addMirror(300, 100);
    this.addMirror(310, 130, 180);
    this.addMirror(100, 400, 270);
    this.addMirror(400, 40);
    this.addMirror(210, 500, 180);
    this.resizeCanvas();
    this.currentEntity = this.entities[0];
  }
  
  resizeCanvas() {
    this.scaleByDevicePixelRatio(window.innerWidth, window.innerHeight)
    this.drawGame();
  }
  
  scaleByDevicePixelRatio(canvasSizeX, canvasSizeY) {
    this.canvas.style.width = canvasSizeX + "px";
    this.canvas.style.height = canvasSizeY + "px";

    const scale = window.devicePixelRatio;
    this.canvas.width = canvasSizeX * scale;
    this.canvas.height = canvasSizeY * scale;

    this.ctx.scale(scale, scale);
  }

  drawGame() {
    this.ctx.fillStyle = "#EEE";
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();

    this.drawBackground();
    this.renderBeams();
    this.renderEntities();
  }

  renderEntities() {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].draw();
    }
  }

  renderBeams() {
    for (var i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      if (entity instanceof Laser) {
        getBeams(entity, this.entities);
      }
    }
  }

  drawBackground() {
    this.ctx.strokeStyle = "#AAA";
    this.ctx.lineWidth = 2;
    this.ctx.globalAlpha = 0.2;

    for (var i = 0; i < this.canvas.width; i += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.height);
      this.ctx.stroke();
    }

    for (var i = 0; i < this.canvas.height; i += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
      this.ctx.stroke();
    }

    this.ctx.globalAlpha = 1;
  }

  addLaser(x, y, deg = 0) {
    this.entities.push(new Laser(x, y, this.ctx, deg));
  }

  addMirror(x, y, deg = 0) {
    this.entities.push(new Mirror(x, y, this.ctx, deg));
  }

  setCursorPosition(e) {
      const bounds = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - bounds.left;
      this.mouseY = e.clientY - bounds.top;
      return [this.mouseX, this.mouseY];
  }

  addListeners() {
    this.startDrag = this.startDrag.bind(this);
    this.dragEntity = this.dragEntity.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.controls = this.controls.bind(this);

    window.addEventListener("resize", this.resizeCanvas);
    document.addEventListener("keydown", this.controls);
    document.addEventListener("mousedown", this.startDrag);
  }

  controls(e) {
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        this.currentEntity.rotateSprite("counterclockwise")
        this.drawGame();
        break;
      case "ArrowRight":
      case "KeyD":
        this.currentEntity.rotateSprite("clockwise");
        this.drawGame();
        break;
      default:
    }
  }

  startDrag(e) {
    e.stopPropagation();
    this.setCursorPosition(e);

    for (var i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      
      if (collidesWithObject([this.mouseX, this.mouseY], entity)) {
        this.currentEntity = entity;
        this.entities.splice(i, 1)
        this.entities.push(entity);

        this.dragging = true;
        this.dragX = this.mouseX - entity.x;
        this.dragY = this.mouseY - entity.y;
      }
    }

    if (this.dragging) {
      document.addEventListener("mousemove", this.dragEntity, false);
    }

    document.removeEventListener("mousedown", this.startDrag, false);
    document.addEventListener("mouseup", this.endDrag, false);
  }

  dragEntity(e) {
    this.setCursorPosition(e);
    
    this.currentEntity.x = this.mouseX - this.dragX;
    this.currentEntity.y = this.mouseY - this.dragY;

    this.drawGame();
  }

  endDrag(e) {
    
    document.addEventListener("mousedown", this.startDrag, false);
    document.removeEventListener("mouseup", this.endDrag, false);

    if (this.dragging) {
      this.dragging = false;
      document.removeEventListener("mousemove", this.dragEntity, false);
    }

    this.drawGame();
  }
}

export default Game;
