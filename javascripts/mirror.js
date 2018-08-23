import Sprite from './sprite';

class Mirror extends Sprite {
  constructor(x, y, ctx, deg = 0) {
    super(x, y, ctx, deg, "images/mirror_entity.png");
  }
}

export default Mirror;
