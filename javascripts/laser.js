import Sprite from './sprite';
import * as Util from './util';

class Laser extends Sprite {
  constructor(x, y, ctx, deg = 0) {
    super(x, y, ctx, deg, "images/laser_entity.png");
    this.laserPos = Util.getRotatedLaserPos(this.x, this.y, this.width, this.height, this.rad);
  }

  drawLaser() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.laserPos[0], this.laserPos[1]);
    this.ctx.lineTo(
      this.laserPos[0] + 100 * Math.cos(this.rad),
      this.laserPos[1] + 100 * Math.sin(this.rad)
    );
    this.ctx.stroke();
  }

  draw() {
    super.draw();
    this.laserPos = Util.getRotatedLaserPos(this.x, this.y, this.width, this.height, this.rad);
    this.drawLaser();
  }
}

export default Laser;
