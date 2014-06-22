var $ = require('jquery');
var audioManager = require('./audioManager');
var apiManager = require('./apiManager');
var speechManager = require('./speechManager');


var captureSuccess = function(mediaFiles) {
  console.log('success', arguments);
};

// capture error callback
var captureError = function(error) {
  console.log('fail', arguments);
};


module.exports = function(){
  console.log('TEST:',$('.voice')[0]);
  var mediaRec = new Media('recording.wav', captureSuccess, captureError);
  $('.voice').on('touchstart', function(){
    mediaRec.startRecord();
  });
  $('.voice').on('touchend', function(){
    mediaRec.stopRecord();
    // mediaRec.play();
    speechManager.speakText("I'm on it!");
    audioManager.uploadWav('recording.wav', function(speechCmd){
      apiManager.executeCommand(speechCmd);
    });
  });
};



