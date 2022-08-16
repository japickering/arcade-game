const canvas = document.querySelector('#canvas');
canvas.width = 1024;
canvas.height = 768;
const ctx = canvas.getContext('2d');
const trackPlayer = document.querySelector('#player');
const trackEnemy = document.querySelector('#enemy');

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

const heroImage = new Image();
heroImage.src = './img/sprites/hero.png';
const player = new Fighter('hero', heroImage, 0, 0, 180, 200);
console.log(player);

const targetImage = new Image();
targetImage.src = './img/sprites/enemy.png';
const enemy = new Fighter('enemy', targetImage, 0, 0, 180, 200);
console.log(enemy);

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

function trackSprites() {
  trackPlayer.innerHTML = '1UP key pressed: ' + lastKeyPressed + ' | ';
  trackPlayer.innerHTML += 'x: ' + Math.floor(player.x) + ' ';
  trackPlayer.innerHTML += 'y: ' + Math.floor(player.y) + ' | ';

  if (player.attacking) {
    trackPlayer.innerHTML += 'attackBox x: ' + Math.floor(player.attackBox.x) + ' ';
    trackPlayer.innerHTML += 'y: ' + Math.floor(player.attackBox.y) + ' ';
  }

  trackEnemy.innerHTML = 'Enemy x: ' + Math.floor(enemy.x) + ' ';
  trackEnemy.innerHTML += 'y: ' + Math.floor(enemy.y) + ' | ';
  trackEnemy.innerHTML += 'hitBox x: ' + Math.floor(enemy.hitBox.x) + ' ';
  trackEnemy.innerHTML += 'y: ' + Math.floor(enemy.hitBox.y) + ' ';
}

function animate() {
  trackSprites();
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
  enemy.update();
}

animate();
