var $ = require('jquery');
var audioManager = require('./audioManager');
var apiManager = require('./apiManager');

var captureSuccess = function(mediaFiles) {
  console.log('success', arguments);
};

// capture error callback
var captureError = function(error) {
  console.log('fail', arguments);
};


module.exports = function(){

  var $voice = $('.voice');
  var $text = $('.text');
  var $wave = $('.wave');

  var mediaRec;
  
  $voice.on('touchstart', function(){
    $text.addClass('disabled');
    $wave.addClass('active');
    mediaRec = new Media('recording.wav', captureSuccess, captureError);
    mediaRec.startRecord();
  });
  $voice.on('touchend', function(){
    $text.removeClass('disabled');
    $wave.removeClass('active');
    mediaRec.stopRecord();
    mediaRec.play();
    // audioManager.uploadWav('recording.wav', function(speechCmd){
    //   apiManager.executeCommand(speechCmd);
    // });
  });

  $text.on('touchend', function(e){
    if($text.hasClass('moveup')){
      return;
    }
    e.preventDefault();
    $text.addClass('moveup');
    $voice.addClass('moveup');
    $wave.addClass('moveup');
    var callback = function(e){
      $text.focus();
      $text.off('webkitTransitionEnd', callback);
      $text.focus();
    };
    $text.on('webkitTransitionEnd', callback);
  });

  $text.on('blur', function(e){
    $text.css('-webkit-transition', 'none');
    $text.css('height', 60 + 'px');
    $text.css('-webkit-transition', '0.5s ease');
    $text.removeClass('moveup');
    $voice.removeClass('moveup');
    $wave.removeClass('moveup');

  });

  var textLength = 0;

  $text.on('input', function(){
    var str = "", val = $text.val();
    for(var i = 0; i < val.length; i++){
      if(val[i] !== '\n'){
        str += val[i];
      } else {
        str += ' ';
      }
    }
    $text.val(str);
    if($text.val().length < textLength){
      $text.css('height', 60 + 'px');
      $text.css('-webkit-transition', 'none');
      setTimeout(function(){
        $text.css('height', Math.min($text[0].scrollHeight, 180) + 'px');
        $text.css('-webkit-transition', '0.5s ease');
      }, 50);
    } else {
      $text.css('height', Math.min($text[0].scrollHeight, 180) + 'px');
    }
    textLength = $text.val().length;
    
  });

  $text.on('focus', function(e){
    console.log('focus...');
    window.scrollTo(0,0);
    setTimeout(function(){
      window.scrollTo(0,0);
    }, 200);
    setTimeout(function(){
      window.scrollTo(0,0);
    }, 250);
    setTimeout(function(){
      window.scrollTo(0,0);
    }, 275);
    setTimeout(function(){
      window.scrollTo(0,0);
    }, 300);
    setTimeout(function(){
      window.scrollTo(0,0);
    }, 325);
    setTimeout(function(){
      window.scrollTo(0,0);
    }, 350);
  });

};



