/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascripts/app.js":
/*!****************************!*\
  !*** ./javascripts/app.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./javascripts/game.js");


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);

  game.run();
});


/***/ }),

/***/ "./javascripts/beam.js":
/*!*****************************!*\
  !*** ./javascripts/beam.js ***!
  \*****************************/
/*! exports provided: getBeams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBeams", function() { return getBeams; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./javascripts/util.js");
/* harmony import */ var _mirror__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mirror */ "./javascripts/mirror.js");



function drawBeam(startPos, endPos, color) {
  const ctx = document.getElementById('canvas').getContext('2d');

  ctx.beginPath();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(endPos[0], endPos[1]);

  ctx.strokeStyle = color;
  ctx.shadowBlur = 15;
  ctx.shadowColor = color;
  
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function getBeamCollision(startPos, angle, entities) {
  let currPos = startPos.slice(0);
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  while (Object(_util__WEBPACK_IMPORTED_MODULE_0__["isInBounds"])(currPos)) {
    currPos[0] += dx / 10;
    currPos[1] += dy / 10;

    for (var i = 0; i < entities.length; i++) {
      const entity = entities[i];
      
      if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["collidesWithObject"])(currPos, entities[i])) {
        if (entity instanceof _mirror__WEBPACK_IMPORTED_MODULE_1__["default"]) {
          if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["pointIsOnMirrorEdge"])(currPos, entity)) {
            return ({ endPos: currPos, angle: entity.reflectedAngle(angle), beamEnd: false });
          }
        }

        return ({ endPos: currPos, angle: angle, beamEnd: true });
      }
    }
  }

  return ({endPos: currPos, angle: angle, beamEnd: true});
}

const getBeams = (laser, entities) => {
  let laserPos = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRotatedLaserPos"])(laser.x, laser.y, laser.width, laser.height, laser.rad);
  let angle = laser.rad;
  let beamEnd = false;
  let endPos;
  let startPos = laserPos.slice(0);

  while (beamEnd === false) {
    ({endPos, angle, beamEnd} = getBeamCollision(startPos, angle, entities));
    drawBeam(startPos, endPos, laser.color);
    startPos = endPos.slice(0);
  }
}


/***/ }),

/***/ "./javascripts/game.js":
/*!*****************************!*\
  !*** ./javascripts/game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _laser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./laser */ "./javascripts/laser.js");
/* harmony import */ var _mirror__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mirror */ "./javascripts/mirror.js");
/* harmony import */ var _beam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./beam */ "./javascripts/beam.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./javascripts/util.js");





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
  }

  // STARTUP METHODS
  run() {
    this.addListeners();

    this.addLaser(200, 200, 312, "blue");
    this.addLaser(430, 300, 140);
    this.addMirror(300, 100, 50, 10, 0);
    this.addMirror(310, 130, 50, 10, 180);
    this.addMirror(100, 400, 50, 10, 270);
    this.addMirror(400, 40, 50, 10, 0);
    this.addMirror(210, 500, 50, 10, 180);

    this.resizeCanvas();
    this.currentEntity = this.entities[0];
  }

  addLaser(x, y, deg, color = "#F00") {
    this.entities.push(new _laser__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, x, y, 50, 10, deg, color));
  }

  addMirror(x, y, width, height, deg) {
    this.entities.push(new _mirror__WEBPACK_IMPORTED_MODULE_1__["default"](this.ctx, x, y, width, height, deg));
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
    document.getElementById("green").addEventListener("click", this.updateColor);
    document.getElementById("blue").addEventListener("click", this.updateColor);

    document.querySelector("input").addEventListener("change", e => {
      this.addEntityProperties.width = parseInt(e.target.value);
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

      if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["collidesWithObject"])([this.mouseX, this.mouseY], entity)) {
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

      if (entity instanceof _laser__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        Object(_beam__WEBPACK_IMPORTED_MODULE_2__["getBeams"])(entity, this.entities);
      }
    }
  }

  renderEntities() {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].render();
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./javascripts/laser.js":
/*!******************************!*\
  !*** ./javascripts/laser.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./javascripts/sprite.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./javascripts/util.js");



class Laser extends _sprite__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(ctx, x, y, width, height, deg, color = "#F00") {
    super(ctx, x, y, width, height, deg, color);
    this.laserPos = _util__WEBPACK_IMPORTED_MODULE_1__["getRotatedLaserPos"](
      this.x,
      this.y,
      this.width,
      this.height,
      this.rad
    );
  }

  drawLaser(x, y, width, height, ctx, color) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, width - 10, height);
    ctx.strokeRect(x, y, width - 10, height);
    ctx.fillStyle = color;
    ctx.fillRect(x + width - 10, y, 10, height);
    ctx.strokeRect(x + width - 10, y, 10, height);
  }

  render() {
    super.draw(this.drawLaser);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Laser);


/***/ }),

/***/ "./javascripts/mirror.js":
/*!*******************************!*\
  !*** ./javascripts/mirror.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./javascripts/sprite.js");


class Mirror extends _sprite__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(ctx, x, y, width, height, deg) {
    super(ctx, x, y, width, height, deg);
  }

  corners() {
    return [
      [this.x, this.y + this.height],
      [this.x + this.width, this.y + this.height]
    ];
  }

  reflectedAngle(angle) {
    if (this.rad % Math.PI === 0) {
      return -angle;
    } else {
      return Math.PI - angle;
    }
  }

  drawMirror(x, y, width, height, ctx) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, width, height - 4);
    ctx.strokeRect(x, y, width, height - 4);
    ctx.fillStyle = "#BBB";
    ctx.fillRect(x, y + height - 4, width, 4);
    ctx.strokeRect(x, y + height - 4, width, 4);
  }

  render() {
    super.draw(this.drawMirror);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Mirror);


/***/ }),

/***/ "./javascripts/sprite.js":
/*!*******************************!*\
  !*** ./javascripts/sprite.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _laser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./laser */ "./javascripts/laser.js");


class Sprite {
  constructor(ctx, x, y, width, height, deg, color = null) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rad = (deg * Math.PI) / 180;
    this.color = color;
  }

  getCenterPos() {
    return [this.x + this.width / 2, this.y + this.height / 2];
  }

  draw(drawShape) {
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = "transparent";
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;

    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(this.rad);

    drawShape(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      this.ctx,
      this.color
    );

    this.ctx.rotate(2 * Math.PI - this.rad);
    this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
  }

  rotateSprite(dir) {
    const mult = dir === "clockwise" ? 1 : -1;

    if (this instanceof _laser__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.rad += (mult * 0.5 * Math.PI) / 180;
    } else {
      this.rad += (mult * 90 * Math.PI) / 180;
    }
    
    this.rad = this.rad % (2 * Math.PI);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Sprite);


/***/ }),

/***/ "./javascripts/util.js":
/*!*****************************!*\
  !*** ./javascripts/util.js ***!
  \*****************************/
/*! exports provided: getRotatedLaserPos, getRotatedPos, isInBounds, pointIsOnMirrorEdge, collidesWithObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotatedLaserPos", function() { return getRotatedLaserPos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotatedPos", function() { return getRotatedPos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInBounds", function() { return isInBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointIsOnMirrorEdge", function() { return pointIsOnMirrorEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collidesWithObject", function() { return collidesWithObject; });
const getRotatedLaserPos = (x, y, width, height, rad) => {
  const theta = rad / 2;
  const h = width * Math.sin(theta);

  const dx = h * Math.sin(theta);
  const dy = h * Math.cos(theta);

  return [x + width - dx, y + height / 2 + dy];
}

const getRotatedPos = (pos, centerPos, rad) => {
  const cx = centerPos[0];
  const cy = centerPos[1];
  let px = pos[0];
  let py = pos[1];

  px -= cx;
  py -= cy;

  const rx = px * Math.cos(rad) - py * Math.sin(rad);
  const ry = px * Math.sin(rad) + py * Math.cos(rad);

  return [rx + cx, ry + cy];
}

const isInBounds = pos => {
  const canvas = document.getElementById('canvas');
  const width = parseInt(canvas.style.width.slice(0, -2));
  const height = parseInt(canvas.style.height.slice(0, -2));

  return (pos[0] > 0 && pos[0] < width && pos[1] > 0 && pos[1] < height);
}


const pointIsOnMirrorEdge = (pos, mirror) => {
  const x0 = getRotatedPos(pos, mirror.getCenterPos(), -mirror.rad)[0];
  const y0 = getRotatedPos(pos, mirror.getCenterPos(), -mirror.rad)[1];
  const corners = mirror.corners();
  const x1 = corners[0][0];
  const y1 = corners[0][1];
  const x2 = corners[1][0];
  const y2 = corners[1][1];

  const dist = Math.abs((y2 - y1)*x0 - (x2 - x1)*y0 + x2*y1 - y2*x1) / mirror.width;

  return (dist <=  .2);
}

const collidesWithObject = (pos, object) => {
  const rotatedPos = getRotatedPos(pos, object.getCenterPos(), -object.rad);

  return (
    rotatedPos[0] >= object.x && rotatedPos[0] <= object.x + object.width &&
    rotatedPos[1] >= object.y && rotatedPos[1] <= object.y + object.height
  );
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map