import Sprite from './sprite';

class Mirror extends Sprite {
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

export default Mirror;
