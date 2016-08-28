var startButton, timer, audio, entity, frame;
var keyboard = [];
var entitySpeed = 8;
var boundary = 500;


function delay(length) {
  var i = 1;

  function internal() {
    setTimeout(function() {
      i++
      if(i <= length){
        internal();
      }
    }, 1000);
  }

  internal();

}

function collideDetect(el1, el2) {

    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
	};



function gameOver() {
  frame.removeChild(entity);
  timer.innerText = "Win";
  timer.style.display = "block";
}


function initialize(e) {
  startButton = document.getElementById('startButton');
  timer = document.getElementById('timer');
  audio = document.getElementById('audio');
  frame = document.getElementById('frame');

  document.addEventListener('keydown', function(event) {
    keyboard[event.keyCode] = true;

    if(keyboard[37]) {
      entity.style.left = (entity.offsetLeft - entitySpeed) + "px";
    }
    if(keyboard[39]) {
      entity.style.left = (entity.offsetLeft + entitySpeed) + "px";
    }

    if(keyboard[32]) {
      audio.src = 'sounds/laser.mp3';
      audio.load();
      fireProjectile();
    }
  });

  document.addEventListener('keyup', function(event) {
    keyboard[event.keyCode] = false;
  });

  startButton.addEventListener('click', function(e) {
    startButton.style.display = 'none';
    startTimer(e);
  }, false);
}

window.onload = initialize;

function startTimer(e) {
  setTimeout(function(){
    timer.innerText = '3';
    audio.play();
    setTimeout(function(){
      audio.currentTime = 0;
      timer.innerText = '2';
      audio.play();
      setTimeout(function(){
        audio.currentTime = 0;
        timer.innerText = '1';
        audio.play();
        setTimeout(function(){
          audio.currentTime = 0;
          timer.innerText = 'Start';
          audio.play();
          setTimeout(function(){
            timer.style.display = 'none';
            startGame();
          },750);
        },1000);
      },1000);
    },1000);
  },1000);

}

function fireProjectile(event) {
  audio.play();

  projectile = document.createElement('div');
  projectile.className = 'projectile';
  projectile.style.left = (entity.offsetLeft) + "px";
  frame.appendChild(projectile);
  enemies = document.getElementsByClassName('enemy');
  function moveProjectile () {
     setTimeout(function () {
        projectile.style.top = (projectile.offsetTop - 5) + "px";
        for(var i = 0; i < enemies.length; i++){
          if(collideDetect(projectile, enemies[i])) {
            destroy_enemy(enemies[i]);
            frame.removeChild(projectile);
          }
        }
        if (projectile.offsetTop >= 0) {
           moveProjectile();
        } else {
          frame.removeChild(projectile);
        }
     }, 40);
  }
  moveProjectile();



}

function destroy_enemy(target) {
  frame.removeChild(target);
}


function loadEnemies() {
  var left = 10;
  for(var i = 0; i < 10; i++) {
    var enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = left + "px";
    frame.appendChild(enemy);
    left += 50;
  }
}

function loadEntity() {
  entity = document.createElement('div');
  entity.className = 'entity';
  frame.appendChild(entity);

}
function startGame() {
  loadEntity();
  loadEnemies();
}
