console.log('Welcome to Easy Money!');

let ball = {
  position: 800,
  velocity: 10,
  sway: 0,
  swayTrend: 3,
};

// const threshold = .4;

const greenLo = 1/8 * 1600;
const greenHi = 2/8 * 1600;


function runGame() {
  for (var i = 0; i < 100; i++) {
    for (let ezmoney of document.getElementsByClassName('ezmoney'))
      ezmoney.parentNode.removeChild(ezmoney);
  }
  ball = {
    position: 800,
    velocity: 10,
    sway: 0,
    swayTrend: 3,
  };
  tick();
}

function tick() {
  readInput();

  if (ball.sway > 400) {
    ball.swayTrend = - Math.abs(ball.swayTrend);
  }
  if (ball.sway < -400) {
    ball.swayTrend = + Math.abs(ball.swayTrend);
  }
  ball.sway += ball.swayTrend;

  if (hitting && ball.velocity < 0 &&
      ball.position > greenLo &&
      ball.position < greenHi) {
    ball.velocity = -ball.velocity + 3 * (Math.random()-.5);
    ball.velocity = Math.max(10, ball.velocity);
    ball.velocity = Math.min(14, ball.velocity);
    easyMoney();
  }
  else {
    ball.position += ball.velocity;
    ball.velocity -= .08;
    ball.velocity = Math.max(-100, ball.velocity);
  }

  if (ball.position < 0) {
    setTimeout(runGame, 1000);
  }
  else {
    draw();
    setTimeout(tick, 5);
  }
}

function easyMoney() {
  for (var i = 0; i < 150; i++) {
    let span = document.createElement('span');
    span.classList.add('ezmoney');
    span.textContent = '$$$';

    span.style.position = 'fixed';
    span.style.left = ((Math.random())*200-25) + 'vw';
    span.style.top = ((Math.random())*200-25) + 'vh';
    let rot = (Math.random()-.5) * 270;
    span.style['-ms-transform'] = `rotate(${rot}deg)`;
    span.style['-webkit-transform'] = `rotate(${rot}deg)`;
    span.style['transform'] = `rotate(${rot}deg)`;
    document.body.appendChild(span);
  }
}

function sayEasyMoney() {
  var audio_files = [];
  for(var i = 0; i < 20; i++){
	audio_files.push(("sound/ezmoney" + (i+1) + ".wav"));
  }
  var audio = new Audio(audio_files[Math.floor(Math.random() * audio_files.length)]);
  audio.play();
}