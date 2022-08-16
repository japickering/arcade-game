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
  constructor(name, image, x, y, w, h) {
    this.name = name;
    this.image = image;
    this.x = this.name === 'hero' ? x : x + canvas.width - canvas.width / 3;
    this.y = y;
    this.width = w;
    this.height = h;
    this.start = { x: x, y: y };
    this.velocity = { x: 0, y: 0 };
    this.velocityMax = 5;
    this.speed = 0.25;
    this.framesCurrent = 0;
    this.framesMax = 10;
    this.limit = {
      x: 800,
      y: canvas.height - this.height - 80,
    };
    this.health = 100;
    this.hitBox = {};
    this.attackBox = {};
    this.attacking = false;
    this.jumping = false;
    this.dead = false;
  }

  // TODO:
  draw() {
    // ctx.drawImage(image, x, y, w, h, x2, y2, w2, h2)
    if (this.attacking) {
      ctx.drawImage(
        this.image,
        this.start.x + 180,
        this.start.y,
        this.width + 10,
        this.height,
        this.x + 20,
        this.y + this.limit.y,
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
        this.y + this.limit.y,
        this.width,
        this.height
      );
    }
  }

  update() {
    this.draw();
    this.drawHitBox();
    if (this.attacking) {
      this.drawAttackBox();
    }
  }

  // TODO:
  //   switchAnimation() {}
  //   hitTest() {}

  drawHitBox() {
    this.hitBox = {
      x: this.x,
      y: this.y + this.limit.y,
      width: this.width,
      height: this.height,
    };
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(this.hitBox.x, this.hitBox.y, this.hitBox.width, this.hitBox.height);
  }

  drawAttackBox() {
    this.attackBox = {
      x: this.x + this.width - 60,
      y: this.y + this.limit.y + 40,
      width: Math.floor(this.width / 1.5),
      height: Math.floor(this.height / 1.5),
    };
    ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.fillRect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height);
  }

  takesHit(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.dead = true;
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
    if (this.x < this.limit.x) {
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
}
