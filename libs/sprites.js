class Sprite {
  constructor(x, y, width, height, imageSrc = '') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    this.image.onload = () => {
      ctx.drawImage(this.image, this.x, this.y, c.width, c.height);
    };
  }
}

class Fighter extends Sprite {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.start = { x: x, y: y };
    this.width = width;
    this.height = height;
    this.canvasWidth = 800;
    this.velocity = { x: 0, y: 0 };
    this.jumping = false;
    this.health = 100;
    this.dead = false;
    this.isAttacking = false;
    this.offset = {
      x: 10,
      y: 10,
    };
    this.attackBox = {
      x: this.x + this.width,
      y: this.y + this.height / 2,
      width: this.width,
      height: this.height,
    };
  }

  draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }

  runLeft() {
    if (this.x > 0) {
      this.velocity.x += 0.5;
      this.x -= this.velocity.x;
      this.draw();
    }
  }

  runRight() {
    if (this.x < this.canvasWidth) {
      this.velocity.x += 0.5;
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

  //   switchAnimation() {}
  //   collidesWith() {}
  //   attack1() {}
  //   attack2() {}
  //   takesHit() {}
  //   die() {}
}
