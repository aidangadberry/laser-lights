import Laser from './laser';

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
  }

  addLaser(pos) {
    const laser = new Laser(pos, this.ctx);

    this.lasers.push(laser);
  }
}

export default Game;
