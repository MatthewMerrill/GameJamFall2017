console.log('Welcome to Easy Money!');

function runGame() {
  tick();
}

function tick() {
  draw();
  // if (Math.random() > 0.001)
    setTimeout(tick, 5);
}
