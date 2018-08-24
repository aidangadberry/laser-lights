import Sprite from './sprite';

class Mirror extends Sprite {
  constructor(x, y, ctx, deg = 0) {
    super(x, y, ctx, deg, "images/mirror_entity.png");
    this.corners = [[x, y + this.height], [x + this.width, y + this.height]];
  }

  reflectedAngle(angle) {
    return 50;
  }
}

export default Mirror;
