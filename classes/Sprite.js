class Sprite {
  constructor(config) {
    this.name = config.name;
    this.loaded = false;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.image = new Image();
    this.image.src = config.imageSrc;
  }

  draw() {
    if (this.loaded) {
      ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }
  }

  init() {
    this.image.onload = () => {
      this.loaded = true;
    };
  }
}
