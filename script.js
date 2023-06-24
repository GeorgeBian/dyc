//Create Initial References & declare variables
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let clicked = false;
let mouseX = 0,
  mouseY = 0;
let particles = [];
let particleSettings = {
  gravity: 0.05,
};

//Events Object
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//For using request animationFrame on all browsers
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

//Function on window load
window.onload = () => {
  canvas.width = width;
  canvas.height = height;
  window.requestAnimationFrame(startFireWork);
};

//Detect Touch Device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (it fails for desktops and throws error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

//Function on mousedown
canvas.addEventListener(events[deviceType].down, function (e) {
  e.preventDefault();
  clicked = true;
  mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
  mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
});

//Function on mouseup
canvas.addEventListener(events[deviceType].up, function (e) {
  e.preventDefault();
  clicked = false;
});

//Function to generate random number between a given range
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

function Particle() {
  this.width = randomNumberGenerator(0.1, 0.9) * 5;
  this.height = randomNumberGenerator(0.1, 0.9) * 5;
  this.x = mouseX - this.width / 2;
  this.y = mouseY - this.height / 2;

  //Velocity of the particle
  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;
}

Particle.prototype = {
  move: function () {
    if (this.x >= canvas.width || this.y >= canvas.height) {
      return false;
    }
    return true;
  },
  draw: function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += particleSettings.gravity;
    context.save();
    context.beginPath();
    context.translate(this.x, this.y);
    context.arc(0, 0, this.width, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.closePath();
    context.fill();
    context.restore();
  },
};

function createFirework() {
  //Increase range for bigger fireworks
  var numberOfParticles = randomNumberGenerator(10, 50);
  let color = `rgb(${randomNumberGenerator(0, 255)},${randomNumberGenerator(
    0,
    255
  )},${randomNumberGenerator(0, 255)})`;

  for (var i = 0; i < numberOfParticles; i++) {
    var particle = new Particle();
    particle.color = color;
    var vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

//Function that begins the firework
function startFireWork() {
  let current = [];
  //Control trail left by particles throught the value of alpha
  context.fillStyle = "rgba(0,0,0,0.1)";
  context.fillRect(0, 0, width, height);
  if (clicked) {
    createFirework();
  }
  for (let i in particles) {
    particles[i].draw();
    if (particles[i].move()) {
      current.push(particles[i]);
    }
  }
  particles = current;
  window.requestAnimationFrame(startFireWork);
}

// function([string1, string2],target id,[color1,color2])
consoleText(['Hello DYC.', 'Console Text hei sup woah so every space is different line?', 'Made with Love.'], 'text', ['tomato', 'rebeccapurple', 'lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function () {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function () {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}
