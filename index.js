const canvas = document.querySelector('#canvas');
canvas.width = 1024;
canvas.height = 768;
const ctx = canvas.getContext('2d');
const gravity = 0.5;

// key controls
const keys = {
  leftPressed: false,
  rightPressed: false,
  jumpPressed: false,
};
let lastKeyPressed = null;
let isKeyPressed = false;

const player = new Fighter('1up', 50, 390, 150, 300);
console.log(player);

const enemy = new Fighter('enemy', 800, 390, 150, 300);
console.log(enemy);

window.addEventListener('keydown', function (event) {
  lastKeyPressed = event.key;
  console.log(lastKeyPressed);
  isKeyPressed = true;

  switch (event.key) {
    case 'a':
      keys.leftPressed = true;
    case 'd':
      keys.rightPressed = true;
    case ' ':
      keys.jumpPressed = true;
    default:
      break;
  }
});

window.addEventListener('keyup', function (event) {
  player.velocity.x = 0;
  isKeyPressed = false;

  switch (event.key) {
    case 'a':
      keys.leftPressed = false;
    case 'd':
      keys.rightPressed = false;
    case ' ':
      keys.jumpPressed = false;
    default:
      break;
  }

  // spacebar
  if (lastKeyPressed === ' ' && !player.jumping) {
    player.jumping = true;
    player.velocity.y = -15;
  }
});

function animate() {
  window.requestAnimationFrame(animate);

  // refresh canvas
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
            player.flyLeft();
            break;
          case 'd':
            player.flyRight();
            break;
          default:
            break;
        }
      }
    } else {
      // TODO: idle
    }
  }
  player.update();
  enemy.update();
}

animate();
