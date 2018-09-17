import Sprite from './sprite';

class Mirror extends Sprite {
  constructor(x, y, ctx, deg) {
    super(x, y, ctx, deg, "images/mirror_entity.png");
  }

  corners() {
    return [[this.x, this.y + this.height], [this.x + this.width, this.y + this.height]];
  }

  reflectedAngle(angle) {
    if (this.rad % (Math.PI) === 0) {
      return (-angle)
    } else {
      return (Math.PI - angle);
    }
  }
}

export default Mirror;
