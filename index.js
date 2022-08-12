const canvas = document.querySelector('#canvas');
canvas.width = 1024;
canvas.height = 768;
const ctx = canvas.getContext('2d');

const gravity = 0.5;
let lastKeyPressed;
let isKeyPressed = false;

const player = new Fighter('1up', 50, 390, 150, 300);
console.log(player);

// const enemy = new Fighter('enemy', 50, 390, 150, 300);
// console.log(enemy);

// controls
window.addEventListener('keydown', function (event) {
  lastKeyPressed = event.key;
  console.log(lastKeyPressed);
  isKeyPressed = true;
});

window.addEventListener('keyup', function (event) {
  player.velocity.x = 0;
  isKeyPressed = false;

  // spacebar
  if (lastKeyPressed === ' ' && !player.jumping) {
    player.jumping = true;
    player.velocity.y = -15;
  }
});

function animate() {
  window.requestAnimationFrame(animate);
  if (!player.dead) {
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
    if (player.jumping) {
      player.jump(gravity);
    }
  }
  player.draw();
}

animate();
