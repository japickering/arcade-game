class Utils {
  constructor() {}

  trace(lastKeyPressed, player, enemy) {
    const statusBar = document.querySelector('#status-bar');
    const statusEnemy = document.querySelector('#status-enemy');

    statusBar.innerHTML = '1UP key: ' + lastKeyPressed + ' | ';
    statusBar.innerHTML += ' HP: ' + player.hp;
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
    statusEnemy.innerHTML += ' HP: ' + enemy.hp;
    statusEnemy.innerHTML += ' x: ' + Math.floor(enemy.x);
    statusEnemy.innerHTML += ' y: ' + Math.floor(enemy.y) + ' | ';
    statusEnemy.innerHTML += ' hitBox x: ' + Math.floor(enemy.hitBox.x);
    statusEnemy.innerHTML += ' y: ' + Math.floor(enemy.hitBox.y) + ' ';
    if (enemy.dead) {
      statusEnemy.innerHTML += enemy.name + ' is dead!';
    }
  }

  gameAlert(message) {
    const alert = document.querySelector('#alert');
    alert.innerHTML = message;
  }
}
