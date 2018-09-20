import Laser from './laser';
import Mirror from './mirror';
import {getBeams} from './beam';
import {collidesWithObject} from './util';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.entities = [];
    this.currentEntity;
    this.addEntityProperties = {
      type: "laser",
      color: "#F00",
      width: 50,
      height: 10,
      deg: 0
    }

    this.mouseX;
    this.mouseY;
    this.dragging = false;
    this.dragX;
    this.dragY;
  }

  // STARTUP METHODS
  run() {
    this.createControlPanel();
    this.addListeners();

    this.addLaser(200, 200, 312, "#00F");
    this.addLaser(430, 300, 140);
    this.addMirror(300, 100, 50, 10, 0);
    this.addMirror(310, 130, 50, 10, 180);
    this.addMirror(100, 400, 50, 10, 270);
    this.addMirror(400, 40, 50, 10, 0);
    this.addMirror(210, 500, 50, 10, 180);

    this.resizeCanvas();
    this.currentEntity = this.entities[0];
  }

  createControlPanel() {
    const ul = document.getElementById("panel-list");
    const colorPanel = document.createElement("li");


  }

  addLaser(x, y, deg, color = "#F00") {
    console.log(this.entities);
    this.entities.push(new Laser(this.ctx, x, y, 50, 10, deg, color));
    console.log("Add laser");
    console.log(this.entities);
  }

  addMirror(x, y, width, height, deg) {
    this.entities.push(new Mirror(this.ctx, x, y, width, height, deg));
  }

  // EVENT LISTENER METHODS
  addListeners() {
    this.startDrag = this.startDrag.bind(this);
    this.dragEntity = this.dragEntity.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.controls = this.controls.bind(this);
    this.windowOnClick = this.windowOnClick.bind(this);
    this.addEntity = this.addEntity.bind(this);

    window.addEventListener("resize", this.resizeCanvas);
    document.addEventListener("keydown", this.controls);
    document.addEventListener("mousedown", this.startDrag);

    document.querySelector(".open-modal").addEventListener("click", this.toggleModal);
    document.querySelector(".close-button").addEventListener("click", this.toggleModal);
    window.addEventListener("click", this.windowOnClick);

    document.getElementById("add-entity").addEventListener("click", this.addEntity);

    // document.getElementById("red").addEventListener("click",);
    // document.getElementById("yellow").addEventListener("click",);
    // document.getElementById("green").addEventListener("click",);
    // document.getElementById("blue").addEventListener("click",);
  }

  addEntity(e) {
    console.log(this.addEntityProperties);
    const { type, color, width, height, deg } = this.addEntityProperties;
    e.stopPropagation();
    this.setCursorPosition(e);

    if (type === "laser") {
      this.addLaser(this.mouseX, this.mouseY, deg, color);
    } else {
      this.addMirror(this.mouseX, this.mouseY, width, height, deg);
    }
    this.dragX = width / 2;
    this.dragY = height / 2;
    this.dragging = true;

    this.currentEntity = this.entities[this.entities.length - 1];
    document.addEventListener("mousemove", this.dragEntity);
    document.addEventListener("mousedown", this.endDrag);
  }

  controls(e) {
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        this.currentEntity.rotateSprite("counterclockwise");
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
        this.entities.splice(i, 1);
        this.entities.push(entity);

        this.dragging = true;
        this.dragX = this.mouseX - entity.x;
        this.dragY = this.mouseY - entity.y;
      }
    }

    if (this.dragging) {
      this.canvas.style.setProperty("cursor", "move");
      document.addEventListener("mousemove", this.dragEntity, false);
    }

    document.removeEventListener("mousedown", this.startDrag, false);
    document.addEventListener("mouseup", this.endDrag, false);
  }

  dragEntity(e) {
    this.setCursorPosition(e);
    const posX = this.mouseX - this.dragX;
    const posY = this.mouseY - this.dragY;
    const minX = 0 - this.dragX;
    const minY = 0 - this.dragY;
    const maxX = window.innerWidth - this.dragX;
    const maxY = window.innerHeight - this.dragY;

    this.currentEntity.x = posX < minX ? minX : posX > maxX ? maxX : posX;
    this.currentEntity.y = posY < minY ? minY : posY > maxY ? maxY : posY;

    this.drawGame();
  }

  endDrag(e) {
    document.addEventListener("mousedown", this.startDrag, false);
    document.removeEventListener("mouseup", this.endDrag, false);

    if (this.dragging) {
      this.canvas.style.removeProperty("cursor");
      this.dragging = false;
      document.removeEventListener("mousemove", this.dragEntity, false);
    }

    this.drawGame();
  }

  resizeCanvas() {
    this.scaleByDevicePixelRatio(window.innerWidth, window.innerHeight);
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

  setCursorPosition(e) {
    const bounds = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - bounds.left;
    this.mouseY = e.clientY - bounds.top;
  }

  toggleModal() {
    console.log("modal");
    document.querySelector(".modal").classList.toggle("show-modal");
  }

  windowOnClick(e) {
    if (e.target === document.querySelector(".modal")) {
      this.toggleModal();
    }
  }

  // RENDER METHODS
  drawGame() {
    this.ctx.fillStyle = "#EEE";
    this.ctx.rect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.fill();

    this.drawBackground();
    this.renderBeams();
    this.renderEntities();
  }

  drawBackground() {
    this.ctx.strokeStyle = "#AAA";
    this.ctx.lineWidth = 2;
    this.ctx.globalAlpha = 0.2;

    for (var i = 0; i < window.innerWidth; i += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.height);
      this.ctx.stroke();
    }

    for (var i = 0; i < window.innerHeight; i += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
      this.ctx.stroke();
    }

    this.ctx.globalAlpha = 1;
  }

  renderBeams() {
    for (var i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      if (entity instanceof Laser) {
        getBeams(entity, this.entities);
      }
    }
  }

  renderEntities() {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].render();
    }
  }
}

export default Game;
