let canvas = document.getElementById('gameCanvas');
let msg = document.getElementById('msg');
let ctx = canvas.getContext('2d');

// Origin lower left
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

function draw(state) {
  // ctx.restore();
  ctx.fillStyle = '#555';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();

  ctx.fillStyle = '#797';
  ctx.fillRect(0, greenLo, canvas.width, greenHi - greenLo);
  ctx.fill();

  ctx.fillStyle = '#55b';
  ctx.fillRect(0, 0, 20, threshold * canvas.height);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 10, input * canvas.height);
  ctx.fill();

  ctx.fillStyle = '#55b';
  ctx.fillRect(canvas.width - 20, 0, 20, threshold * canvas.height);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillRect(canvas.width - 10, 0, 10, input * canvas.height);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(ball.sway + canvas.width / 2, ball.position, 30, 0, 7);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

