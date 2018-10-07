import Sprite from './sprite';
import * as Util from './util';

class Laser extends Sprite {
  constructor(ctx, x, y, width, height, deg, color = "#F00") {
    super(ctx, x, y, width, height, deg, color);
    this.laserPos = Util.getRotatedLaserPos(
      this.x,
      this.y,
      this.width,
      this.height,
      this.rad
    );
    this.laser = true;
  }

  drawLaser(x, y, width, height, ctx, color) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, width - 10, height);
    ctx.strokeRect(x, y, width - 10, height);
    ctx.fillStyle = color;
    ctx.fillRect(x + width - 10, y, 10, height);
    ctx.strokeRect(x + width - 10, y, 10, height);
  }

  drawLaserPoint(x, y, width, height, ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x + width - 10, y, 10, height);
    ctx.strokeRect(x + width - 10, y, 10, height);
  }

  renderBlackout() {
    super.draw(this.drawLaserPoint, true);
  }

  render() {
    super.draw(this.drawLaser);
  }
}

export default Laser;
