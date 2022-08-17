const canvas = document.querySelector('#canvas');
canvas.width = 1024;
canvas.height = 768;
const ctx = canvas.getContext('2d');
const gravity = 0.5;

const utils = new Utils();
const bg = new Sprite({
  name: 'background',
  imageSrc: './img/background-japan.jpg',
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
});

const player = new GameObject({
  name: 'hero',
  imageSrc: './img/sprites/hero.png',
  x: 0,
  y: 0,
  width: 180,
  height: 200,
});

const enemy = new GameObject({
  name: 'enemy',
  imageSrc: './img/sprites/enemy.png',
  x: 0,
  y: 0,
  width: 180,
  height: 200,
});
const keys = {
  left: false,
  right: false,
  jump: false,
  attack: false,
};
let lastKeyPressed = null;
let isKeyPressed = false;

document.addEventListener('keydown', function (event) {
  lastKeyPressed = event.key;
  isKeyPressed = true;

  switch (event.key) {
    case 'arrowLeft':
      keys.left = true;
    case 'arrowRight':
      keys.right = true;
    case ' ':
      keys.jump = true;
    case 'Enter':
      keys.attack = true;
    default:
      break;
  }
});

document.addEventListener('keyup', function (event) {
  player.vel.x = 0;
  isKeyPressed = false;

  switch (event.key) {
    case 'arrowLeft':
      keys.left = false;
    case 'arrowRight':
      keys.right = false;
    case ' ':
      keys.jump = false;
    case 'Enter':
      keys.attack = false;
    default:
      break;
  }

  // spacebar
  if (lastKeyPressed === ' ' && !player.jumping) {
    player.jumping = true;
    player.vel.y = -15;
  }

  // fire button
  if (lastKeyPressed === 'Enter') {
    if (!player.dead) {
      player.attacking = true;
      player.attack(enemy);

      setTimeout(() => {
        player.attacking = false;
      }, 1000);
    }
  }
});

function animate() {
  utils.trace(lastKeyPressed, player, enemy);
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bg.update();

  if (!player.dead) {
    if (isKeyPressed && !player.jumping) {
      switch (lastKeyPressed) {
        case 'a':
          player.runLeft();
          break;
        case 'd':
          player.runRight();
          break;
        default:
          break;
      }
    }
    if (player.jumping) {
      player.jump(gravity);
      if (isKeyPressed) {
        switch (lastKeyPressed) {
          case 'a':
            player.runLeft();
            break;
          case 'd':
            player.runRight();
            break;
          default:
            break;
        }
      }
    }
    player.update();
    if (!enemy.dead) {
      enemy.update();
    } else {
      utils.gameAlert('YOU WIN!');
    }
  } else {
    utils.gameAlert('GAME OVER!');
  }
}

animate();
