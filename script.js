var bg = document.querySelector('#bg');
var startButton = document.querySelector('#startButton');
var door = document.querySelector('#door');
var handle1 = document.querySelector('#handle1');
var rabbit = document.querySelector('#rabbit');
var alice = document.querySelector('#alice');
var mirror = document.querySelector('#mirror');
var painting = document.querySelector('#painting');
var crown = document.querySelector('.cls-17');
var suitAndMouth = document.querySelectorAll('.cls-13');
var bulbOn = document.querySelector('#bulbOn');

var doorCloseSound = document.querySelector('#doorCloseSound');
var rabbitRunningSound = document.querySelector('#rabbitRunningSound');
var aliceRunningSound = document.querySelector('#aliceRunningSound');
var creakSound = document.querySelector('#creakSound');
var laughSound = document.querySelector('#laughSound');
var flickerSound = document.querySelector('#flickerSound');

// Easter Eggs
mirror.addEventListener('click', function() {
  mirror.classList.toggle('crooked');
  creakSound.currentTime = 7;
  creakSound.play();
  mirror.addEventListener('transitionend', function() {
    creakSound.pause();
  });
});

painting.addEventListener('click', function() {
  crown.classList.toggle('evilCrown');
  for (var i = 0; i < suitAndMouth.length; i++) {
    suitAndMouth[i].classList.toggle('evilSuit');
  }
  laughSound.currentTime = 3;
  laughSound.play();
  crown.addEventListener('transitionend', function() {
    laughSound.pause();
  });
});

bulbOn.addEventListener('click', function() {
  bulbOn.classList.add('flicker');
  flickerSound.currentTime = 2;
  flickerSound.play();
  bulbOn.addEventListener('animationend', function() {
    flickerSound.pause();
    bulbOn.classList.remove('flicker');
  });
});

// Control Flow
startAnimation();

function startAnimation() {
  startButton.addEventListener('click', function() {
    rabbit.classList.add('move');
    rabbitRunningSound.currentTime = 5;
    rabbitRunningSound.playbackRate = 2.5;
    rabbitRunningSound.play();
    startButton.classList.add('hidden');
  });
  rabbit.addEventListener('transitionend', rabbitDisappear);
}

function rabbitDisappear() {
  rabbit.classList.add('faded');
  closeDoor(doorHasClosed);
}

function doorHasClosed() {
  alice.classList.add('arrived');
  alice.classList.add('move');
  aliceRunningSound.playbackRate = 2.5;
  aliceRunningSound.play();
  alice.addEventListener('transitionend', stopWalk);
}

function aliceHasArrived() {
  bg.classList.add('zoom');
}


// Helper Function

function stopWalk() {
    alice.classList.remove('move');
    aliceRunningSound.pause();
    aliceHasArrived();
}



function closeDoor(callback) {
  var count = 0;
  var bgPosition = -10;
  var interval = setInterval(function() {
    if (count < 5) {
      bgPosition -= 200;
      door.style.backgroundPosition = bgPosition + 'px 0';
      count++;
    } else {
      handle1.classList.add('visible');
      doorCloseSound.play();
      clearInterval(interval);
      if (callback) {
        setTimeout(function() {
          callback();
        }, 2000);
      }
    }
  }, 100);

}
