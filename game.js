console.log('Welcome to Easy Money!');

const gameState = {

};
const ball = {
  position: 800,
  velocity: 10,
  sway: 0,
  swayTrend: 3,
};
const threshold = .4;

const greenLo = 1/8 * 1600;
const greenHi = 2/8 * 1600;


function runGame() {
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

  draw();
  setTimeout(tick, 5);
}

function easyMoney() {
  for (var i = 0; i < 200; i++) {
    let span = document.createElement('span');
    span.classList.add('ezmoney');
    span.textContent = '$$$';

    span.style.position = 'fixed';
    span.style.left = Math.random() * 100 + 'vw';
    span.style.top = Math.random() * 100 + 'vh';
    span.style.rotation = 0 + (Math.random()-.5) * 360 + 'deg';
    document.body.appendChild(span);
  }
}
