import Sprite from './sprite';

class Laser extends Sprite {
  constructor(pos, ctx, dir = 'E') {
    super(pos, ctx, dir);
    this.url = "images/laser_entity.png";
  }

  render(ctx) {
    const img = new Image();
    img.src = this.url;

    img.onload = () => {
      ctx.drawImage(img, this.pos[0], this.pos[1]);
    }
  }
}

export default Laser;
