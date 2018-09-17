import Laser from './laser';
import Mirror from './mirror';
import {getBeams} from './beam';
import {pointIsOnMirrorEdge, collidesWithObject} from './util';

class Game {
  constructor(canvas) {
    this.entities = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.mouseX;
    this.mouseY;
    this.dragging = false;
    this.dragX;
    this.dragY;

    this.currentEntity;


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
    console.log("resize");
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
    this.currentEntity = this.entities[0];
  }

  renderEntities() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      if (entity instanceof Laser) {
        // if (!this.dragging) {
          getBeams(entity, this.entities);
        // }
      }

      entity.draw();
    }
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

    document.addEventListener("keypress", event => {
      switch (event.code) {
        case "ArrowLeft":
        case "KeyA":
          this.currentEntity.rotateSprite("counterclockwise")
          this.renderEntities();
          break;
        case "ArrowRight":
        case "KeyD":
          this.currentEntity.rotateSprite("clockwise");
          this.renderEntities();
          break;
        default:
      }
    });

    window.addEventListener("resize", this.resizeCanvas);
    document.addEventListener("mousedown", this.startDrag);
  }

  startDrag(e) {
    console.log("Start Drag");
    
    e.stopPropagation();
    this.setCursorPosition(e);

    for (var i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      
      if (collidesWithObject([this.mouseX, this.mouseY], entity)) {
        this.currentEntity = entity;
        // ADD ACTIVE CLASS TO CURRENT SPRITE ICON

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
    console.log("Move Mouse");
    this.setCursorPosition(e);
    
    this.currentEntity.x = this.mouseX - this.dragX;
    this.currentEntity.y = this.mouseY - this.dragY;

    this.renderEntities();
  }

  endDrag(e) {
    console.log("End Drag");
    
    document.addEventListener("mousedown", this.startDrag, false);
    document.removeEventListener("mouseup", this.endDrag, false);

    if (this.dragging) {
      this.dragging = false;
      console.log("Remove");
      document.removeEventListener("mousemove", this.dragEntity, false);
    }

    this.renderEntities();
  }


  // onMouseMove(e) {
  //   e.stopPropagation();
  // }
}

export default Game;
