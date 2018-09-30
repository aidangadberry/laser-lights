import Laser from './laser';
import Mirror from './mirror';
import {getBeamPositions} from './beam';
import {collidesWithObject} from './util';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.entities = [];
    this.currentEntity;
    this.addEntityProperties = {
      type: "laser",
      color: "red",
      width: 50,
      height: 10,
      deg: 0
    }

    this.mouseX;
    this.mouseY;
    this.dragging = false;
    this.dragX;
    this.dragY;

    this.blackout = false;
  }

  // STARTUP METHODS
  run() {
    this.addListeners();

    this.addLaser(430, 300, 140, "red");
    this.addLaser(585, 347, 225, "lawngreen");
    this.addLaser(528, 460, 255, "blue");
    this.addMirror(210, 500, 70, 10, 180);
    this.addMirror(375, 155, 50, 10, 300);
    this.addMirror(92, 397, 30, 10, 270);
    this.addMirror(498, 180, 120, 10, 135);
    this.addMirror(435, 71, 100, 10, 0);

    this.resizeCanvas();
    this.currentEntity = this.entities[0];

    window.entities = this.entities;
  }

  addLaser(x, y, deg, color = "red") {
    this.entities.push(new Laser(this.ctx, x, y, 50, 10, deg, color));
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
    this.updateColor = this.updateColor.bind(this);
    this.toggleEntity = this.toggleEntity.bind(this);

    window.addEventListener("resize", this.resizeCanvas);
    document.addEventListener("keydown", this.controls);
    document.addEventListener("mousedown", this.startDrag);

    document.querySelector(".open-modal").addEventListener("click", this.toggleModal);
    document.querySelector(".close-button").addEventListener("click", this.toggleModal);
    window.addEventListener("click", this.windowOnClick);

    document.querySelectorAll("img").forEach(img => img.addEventListener("click", this.toggleEntity))

    document.getElementById("add-entity").addEventListener("click", this.addEntity);

    document.getElementById("red").addEventListener("click", this.updateColor);
    document.getElementById("yellow").addEventListener("click", this.updateColor);
    document.getElementById("lawngreen").addEventListener("click", this.updateColor);
    document.getElementById("blue").addEventListener("click", this.updateColor);

    document.querySelector("input").addEventListener("change", e => {
      this.addEntityProperties.width = parseInt(e.target.value);
    });

    document.getElementById("light-toggle").addEventListener("click", () => {
      this.blackout = !this.blackout;
      this.drawGame();
    });
  }

  toggleEntity(e) {
    document.querySelectorAll("img").forEach(img => img.classList.toggle("active"));
    this.addEntityProperties.type = this.addEntityProperties.type === "laser" ? "mirror" : "laser";
  }

  addEntity(e) {
    const { type, color, width, height, deg } = this.addEntityProperties;
    e.stopPropagation();
    this.setCursorPosition(e);

    this.dragX = width / 2;
    this.dragY = height / 2;

    if (type === "laser") {
      this.addLaser(this.mouseX - this.dragX, this.mouseY - this.dragY, deg, color);
    } else {
      this.addMirror(this.mouseX - this.dragX, this.mouseY - this.dragY, width, height, deg);
    }
    this.dragging = true;

    this.currentEntity = this.entities[this.entities.length - 1];
    this.drawGame();
    document.addEventListener("mousemove", this.dragEntity);
    document.addEventListener("mousedown", this.endDrag);
  }

  updateColor(e) {
    document.getElementById(this.addEntityProperties.color).classList.remove("selected-color");
    this.addEntityProperties.color = e.target.id;
    e.target.classList.add("selected-color");
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
    e.stopPropagation();

    if (this.dragging) {
      this.canvas.style.removeProperty("cursor");
      this.dragging = false;
      document.removeEventListener("mousemove", this.dragEntity, false);

      if (e.target === document.getElementById("remove-entity")) {
        this.entities.pop();
      }
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
    document.querySelector(".modal").classList.toggle("show-modal");
  }

  windowOnClick(e) {
    if (e.target === document.querySelector(".modal")) {
      this.toggleModal();
    }
  }

  // RENDER METHODS
  drawGame() {
    if (this.blackout) {
      this.ctx.fillStyle = "#000"
      this.ctx.rect(0, 0, window.innerWidth, window.innerHeight);
      this.ctx.fill();

      this.renderBeams();
      this.ctx.shadowBlur = 0;
    } else {
      this.ctx.fillStyle = "#EEE";
      this.ctx.rect(0, 0, window.innerWidth, window.innerHeight);
      this.ctx.fill();
  
      this.drawBackground();
      this.renderBeams();
      this.renderEntities();
    }
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

      if (entity.laser) {
        const positions = getBeamPositions(entity, this.entities);
        this.drawBeams(positions, entity.color);
      }
    }
  }

  drawBeams(positions, color) {
    const ctx = this.ctx;

    ctx.beginPath();

    for (let i = 0; i < positions.length - 1; i++) {
      ctx.moveTo(positions[i][0], positions[i][1]);
      ctx.lineTo(positions[i + 1][0], positions[i + 1][1]);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  renderEntities() {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].render();
    }
  }
}

export default Game;
