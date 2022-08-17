const canvas = document.querySelector('#canvas');
canvas.width = 1024;
canvas.height = 768;
const ctx = canvas.getContext('2d');
const statusBar = document.querySelector('#status-bar');
const statusEnemy = document.querySelector('#status-enemy');
const gravity = 0.5;

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

const controls = {
  left: false,
  right: false,
  jump: false,
  attack: false,
};
let lastKeyPressed = null;
let isKeyPressed = false;

document.addEventListener('keydown', function (event) {
  lastKeyPressed = event.key;
  //   console.log(lastKeyPressed);
  isKeyPressed = true;

  switch (event.key) {
    case 'a':
      controls.left = true;
    case 'd':
      controls.right = true;
    case ' ':
      controls.jump = true;
    case 'Enter':
      controls.attack = true;
    default:
      break;
  }
});

document.addEventListener('keyup', function (event) {
  player.vel.x = 0;
  isKeyPressed = false;

  switch (event.key) {
    case 'a':
      controls.left = false;
    case 'd':
      controls.right = false;
    case ' ':
      controls.jump = false;
    case 'Enter':
      controls.attack = false;
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

function log() {
  statusBar.innerHTML = '1UP key: ' + lastKeyPressed + ' | ';
  statusBar.innerHTML += ' HP: ' + player.health;
  statusBar.innerHTML += ' x: ' + Math.floor(player.x);
  statusBar.innerHTML += ' y: ' + Math.floor(player.y) + ' | ';
  if (player.attacking) {
    statusBar.innerHTML += 'attackBox x: ' + Math.floor(player.attackBox.x) + ' ';
    statusBar.innerHTML += 'y: ' + Math.floor(player.attackBox.y);
  }
  if (player.dead) {
    statusBar.innerHTML += player.name + ' is dead!';
  }

  statusEnemy.innerHTML = 'Enemy';
  statusEnemy.innerHTML += ' HP: ' + enemy.health;
  statusEnemy.innerHTML += ' x: ' + Math.floor(enemy.x);
  statusEnemy.innerHTML += ' y: ' + Math.floor(enemy.y) + ' | ';
  statusEnemy.innerHTML += ' hitBox x: ' + Math.floor(enemy.hitBox.x);
  statusEnemy.innerHTML += ' y: ' + Math.floor(enemy.hitBox.y) + ' ';
  if (enemy.dead) {
    statusEnemy.innerHTML += enemy.name + ' is dead!';
  }
}

function animate() {
  log();
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bg.draw();

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
    }
  } else {
    console.log('GAME OVER!');
  }
}

animate();
