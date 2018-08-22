import Sprite from './sprite';

class Laser extends Sprite {
  constructor(x, y, ctx, deg = 0) {
    super(x, y, ctx, deg, "images/laser_entity.png");
  }
}

export default Laser;
