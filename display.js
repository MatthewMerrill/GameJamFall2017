let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

var pos = 0;

function draw() {
  ctx.fillStyle = '#555';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillRect(pos, pos, 10, 10);
  pos = pos + 1;
}
draw();

function displayPaddle(x, s) {

}
