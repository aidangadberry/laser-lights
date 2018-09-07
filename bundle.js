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


function drawBeam(startPos, endPos) {
  const ctx = document.getElementById('canvas').getContext('2d');

  ctx.beginPath();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(endPos[0], endPos[1]);


  ctx.strokeStyle = "#F00";
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#F00"
  
  ctx.lineWidth = 1;
  ctx.stroke();
}


function getCollision(startPos, angle, lasers, mirrors) {
  let currPos = startPos.slice(0);
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  while (Object(_util__WEBPACK_IMPORTED_MODULE_0__["isInBounds"])(currPos)) {
    currPos[0] += dx / 5;
    currPos[1] += dy / 5;

    for (var i = 0; i < mirrors.length; i++) {
      if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["collidesWithObject"])(currPos, mirrors[i])) {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["pointIsOnMirrorEdge"])(currPos, mirrors[i])) {
          console.log("hit a mirror");
          return ({endPos: currPos, angle: mirrors[i].reflectedAngle(angle), beamEnd: false});
        } else {
          console.log("not a mirror");
          return ({endPos: currPos, angle: angle, beamEnd: true});
        }
      }
    }
    for (var i = 0; i < lasers.length; i++) {
      if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["collidesWithObject"])(currPos, lasers[i])) {
        console.log("not a mirror");
        return ({endPos: currPos, angle: angle, beamEnd: true});
      }
    }
  }

  console.log("border");
  return ({endPos: currPos, angle: angle, beamEnd: true});
}

const getBeams = (laser, lasers, mirrors) => {
  let laserPos = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRotatedLaserPos"])(laser.x, laser.y, laser.width, laser.height, laser.rad);
  let angle = laser.rad;
  let beamEnd = false;
  let endPos;
  console.log(laserPos);

  let startPos = laserPos.slice(0);
  while (beamEnd === false) {
    ({endPos, angle, beamEnd} = getCollision(startPos, angle, lasers, mirrors));
    console.log(startPos, endPos);
    drawBeam(startPos, endPos);
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
    this.lasers = [];
    this.mirrors = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.currentSprite = [];

    this.scaleByDevicePixelRatio(600);

    this.addListeners();
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
    this.addLaser(200, 200, 312);
    this.addLaser(430, 300, 140);
    this.addMirror(300, 100);
    this.addMirror(310, 130, 180);
    this.addMirror(100, 400, 270);
    this.addMirror(400, 40);
    this.addMirror(210, 500, 180);
    this.renderEntities();
    this.currentSprite[0] = this.lasers[1];
  }

  renderEntities() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (var i = 0; i < this.lasers.length; i++) {
      let laser = this.lasers[i]
      Object(_beam__WEBPACK_IMPORTED_MODULE_2__["getBeams"])(laser, this.lasers, this.mirrors);
    }

    for (var i = 0; i < this.mirrors.length; i++) {
      this.mirrors[i].draw();
    }

    for (var i = 0; i < this.lasers.length; i++) {
      this.lasers[i].draw();
    }
  }

  addLaser(x, y, deg = 0) {
    const laser = new _laser__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, this.ctx, deg);

    this.lasers.push(laser);
  }

  addMirror(x, y, deg = 0) {
    const mirror = new _mirror__WEBPACK_IMPORTED_MODULE_1__["default"](x, y, this.ctx, deg);

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
    document.addEventListener("keydown", event => {
      switch (event.code) {
        case "ArrowLeft":
        case "KeyA":
          if (this.currentSprite[0] instanceof _laser__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            this.currentSprite[0].rotateSprite(-0.1);
          } else {
            this.currentSprite[0].rotateSprite(-90);
          }
          this.renderEntities();
          break;
        case "ArrowRight":
        case "KeyD":
          if (this.currentSprite[0] instanceof _laser__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            this.currentSprite[0].rotateSprite(0.1);
          } else {
            this.currentSprite[0].rotateSprite(90);
          }
          this.renderEntities();
          break;
        default:
      }
    });

    document.addEventListener("mousedown", e => this.onMouseDown(e));
  }

  onMouseDown(e) {
    e.stopPropagation();

    for (var i = 0; i < this.lasers.length; i++) {
      if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["collidesWithObject"])(this.getCursorPosition(this.canvas, e), this.lasers[i])) {
        this.currentSprite[0] = this.lasers[i];
        Array.from(document.getElementsByTagName('img')).forEach(img => img.classList.remove('active'));
        document.getElementById('laser-image').classList.add('active');
        // this.canvas.addEventListener('mousemove', this.onMouseMove);
        return;
      }
    }
    for (var i = 0; i < this.mirrors.length; i++) {
      if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["collidesWithObject"])(this.getCursorPosition(this.canvas, e), this.mirrors[i])) {
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
  constructor(x, y, ctx, deg) {
    super(x, y, ctx, deg, "images/laser_entity.png");
    this.laserPos = _util__WEBPACK_IMPORTED_MODULE_1__["getRotatedLaserPos"](this.x, this.y, this.width, this.height, this.rad);
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
  constructor(x, y, ctx, deg) {
    super(x, y, ctx, deg, "images/mirror_entity.png");
    this.corners = [[x, y + this.height], [x + this.width, y + this.height]];
  }

  reflectedAngle(angle) {
    if (this.rad % (Math.PI) === 0) {
      return (-angle)
    } else {
      return (Math.PI - angle);
    }
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
class Sprite {
  constructor(x, y, ctx, deg, url) {
    this.width = 50;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.rad = deg * Math.PI / 180;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = url;

    this.img.onload = () => {
      this.draw();
    }
  }

  getCenterPos() {
    return [this.x + this.width / 2, this.y + this.height / 2];
  }

  draw() {
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = "transparent";
    
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(this.rad);

    this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2);

    this.ctx.rotate(2 * Math.PI - this.rad);
    this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
  }

  rotateSprite(deg) {
    this.rad += deg * Math.PI / 180;
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
  const x1 = mirror.corners[0][0];
  const y1 = mirror.corners[0][1];
  const x2 = mirror.corners[1][0];
  const y2 = mirror.corners[1][1];

  const dist = Math.abs((y2 - y1)*x0 - (x2 - x1)*y0 + x2*y1 - y2*x1) / mirror.width;

  return (dist <=  .75);
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