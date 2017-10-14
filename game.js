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

  if (ball.velocity < 0 && ball.position > greenLo && ball.position < greenHi) {
    ball.velocity = Math.max(5, -ball.velocity);
  }
  else {
    ball.position += ball.velocity;
    ball.velocity -= .08;
    ball.velocity = Math.max(-100, ball.velocity);
  }

  draw();
  setTimeout(tick, 5);
}
