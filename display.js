let canvas = document.getElementById('gameCanvas');
let msg = document.getElementById('msg');
let ctx = canvas.getContext('2d');

// Origin lower left
ctx.translate(0, canvas.height);
ctx.scale(1, -1)
ctx.save();

var pos = 0;
var posArr = [];

function draw(state) {
  // ctx.restore();
  ctx.fillStyle = '#555';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();

  readMic();
  ctx.fillStyle = '#fff';

  const len = array.length;
  let peaks = [];
  var curPeak = [-1, 0];

  var max = Math.max.apply(null, array);

  var threshold = .1;

  for (let idx = 0; idx < len; idx++) {
    if (array[idx] < 0) {
      if (curPeak[0] > .95 * max && curPeak[0] > threshold) {
        peaks.push(curPeak);
      }
      curPeak = [-1, 0];
    }
    else {
      if (array[idx] > curPeak[0]) {
        curPeak = [array[idx], idx];
      }
    }
  }
  if (curPeak[0] > threshold) {
    peaks.push(curPeak);
  }

  ctx.fillStyle = '#fff';
  var aveAmp = 0;
  var aveFreq = 0;
  for (var i = 1; i < peaks.length; i++) {
    aveAmp += peaks[i][0] - peaks[i - 1][0];
    aveFreq += peaks[i][1] - peaks[i - 1][1];
  }
  aveAmp /= peaks.length - 1;
  aveFreq /= peaks.length - 1;
  aveFreq *= 1000;
  // console.log(aveFreq);

  var lo = 60000;
  var hi = 200000;
  if (aveFreq > lo && aveFreq < hi) {
    aveFreq -= lo;
    aveFreq /= hi - lo;

    if (posArr.length + 1 > 20) {
      pos -= posArr[0];
      posArr = posArr.slice(1);
    }
    posArr.push(aveFreq);
    1
    pos += aveFreq;
    //console.log(pos / posArr.length);
  }
  console.log(aveFreq);
  ctx.fillRect(0, canvas.height - canvas.height * pos/posArr.length, canvas.width /* * aveAmp*/, 10);
  msg.textContent = JSON.stringify(peaks);
  ctx.stroke();
}
draw();

