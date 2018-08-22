import Sprite from './sprite';

class Mirror extends Sprite {
  constructor(x, y, ctx, dir = 'E') {
    super(x, y, ctx, dir);
    this.url = "images/mirror_entity.png";
  }

  render(ctx) {
    const img = new Image();
    img.src = this.url;

    img.onload = () => {
      ctx.drawImage(img, this.x, this.y);
    }
  }
}

export default Mirror;
