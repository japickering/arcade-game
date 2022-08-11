const c = document.querySelector('#canvas');
c.width = 1024;
c.height = 768;
const ctx = c.getContext('2d');
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, c.width, c.height);

const gravity = 0.5;
let lastKeyPressed;
let isKeyPressed = false;
// const bg = new Sprite(0, 0, canvas.width, canvas.height, './img/background-japan.jpg');
// bg.draw();

const player = new Fighter(100, 400, 200, 300);
player.draw();
console.log(player);

// controls
window.addEventListener('keydown', function (event) {
  lastKeyPressed = event.key;
  console.log(lastKeyPressed);
  isKeyPressed = true;
});

window.addEventListener('keyup', function (event) {
  player.velocity.x = 0;
  isKeyPressed = false;

  // jumping
  if (lastKeyPressed === ' ' && !player.jumping) {
    player.jumping = true;
    player.velocity.y = -16;
  }
});

function animate() {
  window.requestAnimationFrame(animate);
  if (!player.dead) {
    if (isKeyPressed) {
      switch (lastKeyPressed) {
        case 'ArrowLeft':
          player.runLeft();
          break;
        case 'ArrowRight':
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
