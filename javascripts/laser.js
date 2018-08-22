class Laser {
  constructor(pos, ctx, dir = 'E') {
    this.url = "images/laser_entity.png";
    this.size = [50, 20];
    this.pos = pos;
    this.dir = dir;
  }

  render(ctx) {
    const img = new Image();
    img.src = this.url;
    
    img.onload = function() {
      ctx.drawImage(img, 50, 50, 50, 20);
    }
  }
}

export default Laser;
