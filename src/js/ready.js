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
  // var mediaRec = new Media('recording.wav', captureSuccess, captureError);
  
  $('.voice').on('touchstart', function(){
    // mediaRec.startRecord();
  });
  $('.voice').on('touchend', function(){
    // mediaRec.stopRecord();
    // mediaRec.play();
    speechManager.speakText("I don't know who you are. I don't know what you want. If you are looking for ransom, I can tell you I don't have money. But what I do have are a very particular set of skills, skills I have acquired over a very long career. Skills that make me a nightmare for people like you. If you let my daughter go now, that'll be the end of it. I will not look for you, I will not pursue you. But if you don't, I will look for you, I will find you, and I will kill you.");
    // audioManager.uploadWav('recording.wav', function(speechCmd){
    //   apiManager.executeCommand(speechCmd);
    // });
  });
};



