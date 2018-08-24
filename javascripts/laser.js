import Sprite from './sprite';
import * as Util from './util';

class Laser extends Sprite {
  constructor(x, y, ctx, deg) {
    super(x, y, ctx, deg, "images/laser_entity.png");
    this.laserPos = Util.getRotatedLaserPos(this.x, this.y, this.width, this.height, this.rad);
  }
}

export default Laser;
