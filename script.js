var bg = document.querySelector('#bg');
var startButton = document.querySelector('#startButton');
var door = document.querySelector('#door');
var handle = document.querySelector('#handle');
var rabbit = document.querySelector('#rabbit');
var alice = document.querySelector('#alice');
var mirror = document.querySelector('#mirror');
var painting = document.querySelector('#painting');
var crown = document.querySelector('.cls-17');
var suitAndMouth = document.querySelectorAll('.cls-13');
var bulbOn = document.querySelector('#bulbOn');
var bottleFull = document.querySelector('#bottleFull');
var drinkMeSign = document.querySelector('#drinkMeSign');
var clickMeSign = document.querySelector('#clickMeSign');

var doorCloseSound = document.querySelector('#doorCloseSound');
var rabbitRunningSound = document.querySelector('#rabbitRunningSound');
var aliceRunningSound = document.querySelector('#aliceRunningSound');
var creakSound = document.querySelector('#creakSound');
var laughSound = document.querySelector('#laughSound');
var flickerSound = document.querySelector('#flickerSound');
var pingSound = document.querySelector('#pingSound');

var line1 = document.querySelector('#line1');
var line2 = document.querySelector('#line2');
var line3 = document.querySelector('#line3');
var line4 = document.querySelector('#line4');
var line5 = document.querySelector('#line5');
var line6 = document.querySelector('#line6');
var line7 = document.querySelector('#line7');
var line8 = document.querySelector('#line8');
var line9 = document.querySelector('#line9');

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
  rabbit.addEventListener('animationend', function() {
    rabbit.classList.add('gone');
  });
  closeDoor(doorHasClosed);
}

function doorHasClosed() {
  alice.classList.add('arrived');
  alice.classList.add('move');
  aliceRunningSound.playbackRate = 2.5;
  aliceRunningSound.play();
  alice.addEventListener('transitionend', stopWalk);
}

function stopWalk() {
    alice.removeEventListener('transitionend', stopWalk);
    alice.classList.remove('move');
    aliceRunningSound.pause();
    aliceHasArrived();
}

function aliceHasArrived() {
  bg.classList.add('zoom');
  bg.addEventListener('transitionend', function(e) {
    if (e.propertyName == 'transform') {
      clickMeSign.classList.add('visible');
      pingSound.play();
    }
  });
  handle.addEventListener('click', runFirstDialogue);
}

function runFirstDialogue(e) {
  clickMeSign.classList.remove('visible');
  handleSpeaking(0, true);
  line1.play();
  firstDialogue();
  bg.removeEventListener('transitionend', runFirstDialogue);
}

function firstDialogue() {
  line1.addEventListener('ended', function() {
    setTimeout(function() {
      line2.play();
    }, 200);
  });
  line2.addEventListener('ended', function() {
    setTimeout(function() {
      handleSpeaking(10);
      line3.play();
    }, 300);
  });
  line3.addEventListener('ended', function() {
    setTimeout(function() {
      line4.play();
    }, 300);
  });
  line4.addEventListener('ended', function() {
    setTimeout(function() {
      handleSpeaking(2);
      line5.play();
    }, 300);
  });
  line5.addEventListener('ended', function() {
    setTimeout(function() {
      line6.play();
    }, 300);
  });
  line6.addEventListener('ended', function() {
    setTimeout(function() {
      handleSpeaking(5);
      line7.play();
    }, 300);
  });
  line7.addEventListener('ended', function() {
    setTimeout(function() {
      line8.play();
    }, 300);
  });
  line8.addEventListener('ended', function() {
    setTimeout(function() {
      handleSpeaking(9);
      line9.play();
    }, 300);
  });
  line9.addEventListener('ended', function() {
    firstDialogueHasEnded();
  });
}

function firstDialogueHasEnded() {
  bg.classList.remove('zoom');
  bg.addEventListener('transitionend', makeBottleClickable);
}

function makeBottleClickable() {
  bg.removeEventListener('transitionend', makeBottleClickable);
  bottleFull.classList.add('activeHover');
  drinkMeSign.classList.add('visible');
  pingSound.play();
  bottleFull.addEventListener('click', aliceMoveToDrink);
}

function aliceMoveToDrink() {
  bottleFull.removeEventListener('click', aliceMoveToDrink);
  bottleFull.classList.remove('activeHover');
  drinkMeSign.classList.remove('visible');
  alice.classList.remove('arrived');
  alice.classList.add('atBottle');
  alice.classList.add('move');
  alice.setAttribute('src', 'assets/images/alice_flipped.svg');
  aliceRunningSound.currentTime = 0;
  aliceRunningSound.playbackRate = 2;
  aliceRunningSound.play();
  alice.addEventListener('transitionend', stopWalkAgain);
}

function stopWalkAgain() {
  alice.removeEventListener('transitionend', stopWalk);
  alice.classList.remove('move');
  aliceRunningSound.pause();
  aliceDrink();
}

function aliceDrink() {

}

// Helper Functions





function closeDoor(callback) {
  var count = 0;
  var bgPosition = -10;
  var interval = setInterval(function() {
    if (count < 5) {
      bgPosition -= 200;
      door.style.backgroundPosition = bgPosition + 'px 0';
      count++;
    } else {
      handle.classList.add('visible');
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

function handleSpeaking(length, short) {
  var runCount = 0;
  var count = 0;
  var bgPosition = 0;
  var loopLength;
  if (short) {
    loopLength = 2;
  } else {
    loopLength = 3;
  }
  var interval = setInterval(function() {
    if (count < loopLength) {
      bgPosition -= 40;
      handle.style.backgroundPosition = bgPosition + 'px 0';
      count ++;
    } else {
      if (runCount < length) {
        count = 0;
        bgPosition = 0;
        runCount++;
      } else {
        handle.style.backgroundPosition = '0px 0';
        clearInterval(interval);
      }
    }
  }, 100);
}
