const canvas = document.querySelector('#canvas');
canvas.width = 1024;
canvas.height = 768;
const ctx = canvas.getContext('2d');
const tracer = document.querySelector('#header');
const gravity = 0.5;
const keys = {
  left: false,
  right: false,
  jump: false,
  attack: false,
};
let lastKeyPressed = null;
let isKeyPressed = false;

const img = new Image();
img.src = './img/background-japan.jpg';
const bg = new Sprite(img, 0, 0, canvas.width, canvas.height);

const hero = new Image();
hero.src = './img/sprites/idle.png';
const player = new Fighter(hero, 0, 0, 180, 200);
console.log(player);

// const target = new Image();
// target.src = './img/sprites/idle.png';
// const enemy = new Fighter(target, 0, 0, 180, 200);
// console.log(enemy);

window.addEventListener('keydown', function (event) {
  lastKeyPressed = event.key;
  //   console.log(lastKeyPressed);
  isKeyPressed = true;

  switch (event.key) {
    case 'a':
      keys.left = true;
    case 'd':
      keys.right = true;
    case ' ':
      keys.jump = true;
    case 'Enter':
      keys.attack = true;
    default:
      break;
  }
});

window.addEventListener('keyup', function (event) {
  player.velocity.x = 0;
  isKeyPressed = false;

  switch (event.key) {
    case 'a':
      keys.left = false;
    case 'd':
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
    player.velocity.y = -15;
  }

  // fire button
  if (lastKeyPressed === 'Enter') {
    player.attacking = !player.attacking;
  }
});

function animate() {
  tracer.innerHTML = 'key pressed: ' + lastKeyPressed + ' | ';
  tracer.innerHTML += '1UP x: ' + Math.floor(player.x) + ' ';
  tracer.innerHTML += 'y: ' + Math.floor(player.y) + ' ';

  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    } else if (player.jumping) {
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
    } else {
    }
  }
  bg.draw();
  player.update();
  //   enemy.update();
}

animate();
