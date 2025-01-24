const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// Player
const player = {
  x: 370,
  y: 480,
  width: 50,
  height: 50,
  speed: 5,
  image: new Image(),
};
player.image.src = 'player.png';

// Bullet
const bullet = {
  x: 0,
  y: player.y,
  width: 5,
  height: 15,
  speed: 30,
  active: false,
  image: new Image(),
};
bullet.image.src = 'bullet.png';
// Enemies
const enemies = [];
const numEnemies = 6;

for (let i = 0; i < numEnemies; i++) {
  enemies.push({
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * 150,
    width: 50,
    height: 50,
    speed: 2 + Math.random() * 2,
    image: new Image(),
  });
  enemies[i].image.src = 'enemy.png';
}

// Game Variables
let score = 0;
let keys = {};

// Event Listeners
document.addEventListener('keydown', (e) => (keys[e.key] = true));
document.addEventListener('keyup', (e) => (keys[e.key] = false));

// Game Loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player Movement
  if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
  if (keys['ArrowRight'] && player.x < canvas.width - player.width)
    player.x += player.speed;

  // Bullet Movement
   for (let i = 1; i < bullets.length; i++) {
    if (bullets[i].active) {
      bullets[i].y -= bullets[i].speed;
      if (bullets[i].y < 0) {
        bullets[i].active = false;
      }
    }
  }
  if (keys[' '] && !bullet.active) {
    bullet.x = player.x + player.width / 2 - bullet.width / 2;
    bullet.y = player.y;
    bullet.active = true;
  }
  if (bullet.active) {
    bullet.y -= bullet.speed;
    if (bullet.y < 0) bullet.active = false;
  }

  // Draw Player
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);

  // Draw Bullet
  if (bullet.active)
    ctx.drawImage(bullet.image, bullet.x, bullet.y, bullet.width, bullet.height);

  // Enemy Movement
  enemies.forEach((enemy, index) => {
    enemy.y += enemy.speed;
    if (enemy.y > canvas.height) {
      enemy.y = -50;
      enemy.x = Math.random() * (canvas.width - enemy.width);
    }

    // Check Collision
    if (
      bullet.active &&
      bullet.x < enemy.x + enemy.width &&
      bullet.x + bullet.width > enemy.x &&
      bullet.y < enemy.y + enemy.height &&
      bullet.y + bullet.height > enemy.y
    ) {
      bullet.active = false;
      enemy.y = -50;
      enemy.x = Math.random() * (canvas.width - enemy.width);
      score++;
    }

    // Draw Enemy
    ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
  });

  // Draw Score
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 10, 30);

  requestAnimationFrame(gameLoop);
}

// Start Game
gameLoop();



