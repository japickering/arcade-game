class GameObject extends Sprite {
  constructor(config) {
    super();
    this.name = config.name;
    this.x = config.name === 'hero' ? x : x + 400;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.image = new Image();
    this.image.src = config.imageSrc;
    this.loaded = false;
    this.start = { x: x, y: y };
    this.vel = { x: 0, y: 0 };
    this.velMax = 5;
    this.speed = 0.5;
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

  init() {
    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw() {
    if (this.loaded) {
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
  }

  update() {
    this.draw();
    this.drawHitBox();
  }

  // TODO:
  //   switchAnimation() {}
  drawHitBox() {
    this.hitBox = {
      x: this.x,
      y: this.y + this.limit.y,
      width: this.width,
      height: this.height,
    };

    if (this.health > 50) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    } else if (this.health > 25 && this.health <= 50) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    }
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

  hitTarget(target) {
    if (
      this.attackBox.x + this.attackBox.width >= target.hitBox.x &&
      this.attackBox.y + this.attackBox.height >= target.hitBox.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  attack(target) {
    this.drawAttackBox();
    if (!target.dead && this.hitTarget(target)) {
      target.takesHit(10);
    }
  }

  takesHit(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    console.log(this.name + ' is dead');
    this.dead = true;
  }

  runLeft() {
    if (this.x > 0) {
      if (this.vel.x <= this.velMax) {
        this.vel.x += this.speed;
      }
      this.x -= this.vel.x;
    }
  }

  runRight() {
    if (this.x < this.limit.x) {
      if (this.vel.x <= this.velMax) {
        this.vel.x += this.speed;
      }
      this.x += this.vel.x;
    }
  }

  jump(gravity) {
    if (this.vel.y < 0) {
      this.vel.y += gravity;
      this.y += this.vel.y;
    } else {
      this.vel.y += gravity;
      this.fall();
    }
  }

  fall() {
    if (this.y < this.start.y) {
      this.y += this.vel.y;
    } else {
      this.vel.y = 0;
      this.y === this.start.y;
      this.jumping = false;
    }
  }
}
