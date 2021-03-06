// Copied from https://github.com/notthetup/goertzel-node
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GoertzelNode = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var gf = require('goertzel-filter');

function GoertzelNode (context, chunkSize){
  if (!context){
    console.error("No AudioContext provided");
    return;
  }

  chunkSize = chunkSize || 256;

  var processor = context.createScriptProcessor(chunkSize,1,1);
  gf.init(440, context.sampleRate, chunkSize);

  processor.power = 0;
  processor.threshold = 0.21;

  Object.defineProperty(processor,'targetFrequency',{
    set: function(freq){
      gf.init(freq,context.sampleRate, chunkSize);
    },
    get: function(){
      return gf.targetFrequency;
    }
  });

  var _channel = 0;
  Object.defineProperty(processor,'channel',{
    set: function(channel){
      _channel = channel;
    },
    get: function(){
      return _channel;
    }
  });

  this.passthrough = true;

  processor.onaudioprocess = function(audioProcessingEvent){
    var inputBuffer = audioProcessingEvent.inputBuffer;
    var outputBuffer = audioProcessingEvent.outputBuffer;

    processor.power = gf.run(inputBuffer.getChannelData(_channel));
    processor.detected = processor.power > processor.threshold;

    if (this.passthrough){
      for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
        var inputData = inputBuffer.getChannelData(channel);
        outputBuffer.copyToChannel(inputData,channel,0);
      }
    }
  }

  return processor;
}

GoertzelNode.prototype.connect = function(){
  processor.connect.apply(processor,arguments);
}


GoertzelNode.prototype.disconnect = function(){
  processor.disconnect.apply(processor,arguments);
}


module.exports = GoertzelNode

},{"goertzel-filter":2}],2:[function(require,module,exports){
(function (global){
function GoertzelFilterASM(stdlib, foreign, heap){
  "use asm";

  var cos = stdlib.Math.cos;
  var PI = stdlib.Math.PI;
  var samplesArray = new stdlib.Float32Array(heap);

  var coefficient = 0.0;
  var length = 0;
  var targetFrequency = 0.0;

  function init(dFreq,sFreq,len){
    dFreq = +dFreq;
    sFreq = +sFreq;
    len = len | 0;

    length = len;

    coefficient= 2.0*cos(2.0*PI*dFreq/sFreq);
    targetFrequency = dFreq;
  }

  function run(){
    var index = 0;
    var prev0 = 0.0;
    var prev1 = 0.0;
    var s = 0.0;
    for(;(index|0) < (length|0); index=(index+1)|0){
      s = +samplesArray[index << 2 >> 2] + +(coefficient * prev0) - +prev1;
      prev1 = prev0;
      prev0 = s;
    }
    return ((prev1*prev1)+(prev0*prev0)-(coefficient*prev0*prev1))/+(length|0)/+(length|0);
  }

  return {
    init: init,
    run: run
  }
}

var targetFrequency = 0;
var heapBuffer;

module.exports = {
  init: function(dFreq,sFreq,length){
    var stdlib;
    var heap = new ArrayBuffer(0x10000);
    heapBuffer =new Float32Array(heap);

    if (typeof window !== 'undefined'){
      stdlib = window;
    }else{
      stdlib = global;
    }

    targetFrequency = dFreq;
    goertzelfilter = GoertzelFilterASM(stdlib, {}, heap);
    goertzelfilter.init(dFreq,sFreq,length);
  },
  run: function(samples){
    heapBuffer.set(samples);
    return goertzelfilter.run();
  },
  targetFrequency: targetFrequency
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});