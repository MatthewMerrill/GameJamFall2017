// Copypasta  Credits:
// https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js

var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
var array = new Float32Array(analyser.frequencyBinCount);

analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0;

let input = 0;

function readInput() {
  analyser.getFloatTimeDomainData(array);
  input = array.reduce((a,b)=>a+b, 0) / 5// - analyser.minDecibels /
      // (analyser.maxDecibels - analyser.minDecibels)
}

if (navigator.getUserMedia) {
  console.log('getUserMedia supported.');
  navigator.getUserMedia(
      // constraints - only audio needed for this app
      {
        audio: true
      },

      // Success callback
      function (stream) {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
      },

      // Error callback
      function (err) {
        console.log('The following gUM error occured: ' + err);
      }
  );
} else {
  console.log('getUserMedia not supported on your browser!');
}

