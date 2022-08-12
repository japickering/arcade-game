class Sprite {
  constructor(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class Fighter extends Sprite {
  constructor(name, x, y, width, height, imageSrc = '') {
    super();
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.start = { x: x, y: y };
    this.velocity = { x: 0, y: 0 };
    this.image = new Image();
    this.image.src = imageSrc;
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
    this.jumping = false;
    this.dead = false;
    this.isAttacking = false;
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  runLeft() {
    if (this.x > 0) {
      this.velocity.x += 0.25;
      this.x -= this.velocity.x;
      this.draw();
    }
  }

  runRight() {
    if (this.x < this.canvasWidth) {
      this.velocity.x += 0.25;
      this.x += this.velocity.x;
      this.draw();
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
  switchAnimation() {}
  //   collidesWith() {}
  //   attack1() {}
  //   attack2() {}
  //   takesHit() {}
  //   die() {}
}
