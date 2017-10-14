console.log('Welcome to Easy Money!');

function runGame() {
  tick();
}

function tick() {
  draw();
  setTimeout(tick, 20);
}
