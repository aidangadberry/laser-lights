import Laser from './laser';

class Sprite {
  constructor(ctx, x, y, width, height, deg, color = null) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rad = (deg * Math.PI) / 180;
    this.color = color;
    this.current = false;
  }

  getCenterPos() {
    return [this.x + this.width / 2, this.y + this.height / 2];
  }

  draw(drawShape, blackout = false) {
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;

    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(this.rad);

    drawShape(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      this.ctx,
      this.color
    );

    if (this.current && !blackout) {
      this.ctx.strokeStyle = "#C0C";

      if (this.mirror) {
        this.ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height - 4);
      } else {
        this.ctx.strokeRect(-this.width / 2, -this.height / 2, this.width - 10, this.height);
      }
    }

    this.ctx.rotate(2 * Math.PI - this.rad);
    this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
  }

  rotateSprite(dir) {
    const mult = dir === "clockwise" ? 1 : -1;

    if (this.laser) {
      this.rad += (mult * 0.5 * Math.PI) / 180;
    } else {
      this.rad += (mult * 1 * Math.PI) / 180;
    }

    this.rad = this.rad % (2 * Math.PI);
  }
}

export default Sprite;
