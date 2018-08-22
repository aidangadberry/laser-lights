class Sprite {
  constructor(x, y, ctx, deg, url) {
    this.width = 50;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.deg = deg;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = url;

    this.img.onload = () => {
      this.draw();
    }
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y);
  }

  draw() {
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(this.deg * Math.PI / 180);

    this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2);
    
    this.ctx.rotate((360 - this.deg) * Math.PI / 180);
    this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
  }
}

export default Sprite;
