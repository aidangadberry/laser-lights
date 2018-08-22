import Laser from './laser';
import Mirror from './mirror';

class Game {
  constructor(ctx) {
    this.lasers = [];
    this.mirrors = [];
    this.ctx = ctx;
  }

  run() {
    this.renderEntities();
  }

  renderEntities() {
    for (var i = 0; i < this.lasers.length; i++) {
      this.lasers[i].render(this.ctx);
    }
    for (var i = 0; i < this.mirrors.length; i++) {
      this.mirrors[i].render(this.ctx);
    }
  }

  addLaser(pos) {
    const laser = new Laser(pos, this.ctx);

    this.lasers.push(laser);
  }
  
  addMirror(pos) {
    const mirror = new Mirror(pos, this.ctx);

    this.mirrors.push(mirror);
  }
}

export default Game;
