class Sprite {
  constructor(image, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
  }
}

class Fighter {
  constructor(image, x, y, w, h) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.start = { x: x, y: y };
    this.velocity = { x: 0, y: 0 };
    this.velocityMax = 5;
    this.speed = 0.25;
    this.framesCurrent = 0;
    this.framesMax = 10;
    this.canvasWidth = 800;
    this.health = 100;
    this.attackBox = {
      x: this.x + this.width,
      y: this.y + this.height / 2,
      width: this.width,
      height: this.height,
    };
    this.attacking = false;
    this.jumping = false;
    this.dead = false;
  }

  draw() {
    // ctx.drawImage(image, x, y, w, h, x2, y2, w2, h2)
    if (player.attacking) {
      ctx.drawImage(
        this.image,
        this.start.x + 180,
        this.start.y,
        this.width + 10,
        this.height,
        this.x + 20,
        this.y + canvas.height - this.height - 80,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        this.image,
        this.start.x,
        this.start.y,
        this.width,
        this.height,
        this.x,
        this.y + canvas.height - this.height - 80,
        this.width,
        this.height
      );
    }
  }

  update() {
    this.draw();
  }

  runLeft() {
    if (this.x > 0) {
      if (this.velocity.x <= this.velocityMax) {
        this.velocity.x += this.speed;
      }
      this.x -= this.velocity.x;
    }
  }

  runRight() {
    if (this.x < this.canvasWidth) {
      if (this.velocity.x <= this.velocityMax) {
        this.velocity.x += this.speed;
      }
      this.x += this.velocity.x;
    }
  }

  jump(gravity) {
    if (this.velocity.y < 0) {
      this.velocity.y += gravity;
      this.y += this.velocity.y;
    } else {
      this.velocity.y += gravity;
      this.fall();
    }
  }

  fall() {
    if (this.y < this.start.y) {
      this.y += this.velocity.y;
    } else {
      this.velocity.y = 0;
      this.y === this.start.y;
      this.jumping = false;
    }
  }

  // TODO:
  //   switchAnimation() {}
  //   collidesWith() {}
  //   attack1() {}
  //   attack2() {}
  //   takesHit() {}
  //   die() {}
}
