// Copypasta  Credits:
// https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js

const audioCtx = new AudioContext();
let meter;

let input = 0;
let clippingLevel = .3;
let hitting = false;

function readInput() {
  if (meter) {
    input = meter.volume;
    hitting = meter.checkClipping();
  }
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
        source = audioCtx.createMediaStreamSource(stream, clippingLevel);
        meter = createAudioMeter(audioCtx);
        source.connect(meter);
      },

      // Error callback
      function (err) {
        console.log('The following gUM error occured: ' + err);
      }
  );
} else {
  console.log('getUserMedia not supported on your browser!');
}

