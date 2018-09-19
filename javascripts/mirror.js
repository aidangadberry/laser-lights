import Sprite from './sprite';

class Mirror extends Sprite {
  constructor(ctx, x, y, width, height, deg) {
    super(ctx, x, y, width, height, deg);
  }

  corners() {
    return [
      [this.x, this.y + this.height],
      [this.x + this.width, this.y + this.height]
    ];
  }

  reflectedAngle(angle) {
    if (this.rad % Math.PI === 0) {
      return -angle;
    } else {
      return Math.PI - angle;
    }
  }

  drawMirror(x, y, width, height, ctx) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, width, height - 4);
    ctx.strokeRect(x, y, width, height - 4);
    ctx.fillStyle = "#BBB";
    ctx.fillRect(x, y + height - 4, width, 4);
    ctx.strokeRect(x, y + height - 4, width, 4);
  }

  render() {
    super.draw(this.drawMirror);
  }
}

export default Mirror;
