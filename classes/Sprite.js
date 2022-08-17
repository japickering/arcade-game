class Sprite {
  constructor(config) {
    this.name = config.name;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.image = new Image();
    this.image.src = config.imageSrc;
    this.loaded = false;

    this.init();
  }

  draw() {
    this.loaded && ctx.drawImage(this.image, 0, 0, this.width, this.height);
  }

  update() {
    this.draw();
  }

  init() {
    this.image.onload = () => {
      this.loaded = true;
    };
  }
}
