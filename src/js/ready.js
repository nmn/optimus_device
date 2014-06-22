var $ = require('jquery');
var audioManager = require('./audioManager');
//var apiManager = require('./apiManager');
//var speechManager = require//('./speechManager');


var captureSuccess = function(mediaFiles) {
  console.log('success', arguments);
};

// capture error callback
var captureError = function(error) {
  console.log('fail', arguments);
};

var log = function(){
  var args = Array.prototype.slice.call(arguments);
  return function(){
    console.log.apply(console, args.concat(Array.prototype.slice.call(arguments)));
  };
};

module.exports = function(){

  var fileSystem;

  var $voice = $('.voice');
  var $text = $('.text');
  var $wave = $('.wave');

  var mediaRec;

  window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fs){fileSystem = fs;}, log('fileSystem'));
  
  $voice.on('touchstart', function(){
    // cordova.plugins.barcodeScanner.scan(
    //   function (result) {
    //     console.log("success:", result);
    //     // if(!result.cancelled){
    //     //   console.log("We got a barcode\n" +
    //     //         "Result: " + result.text + "\n" +
    //     //         "Format: " + result.format);
    //     //   } 
    //   },
    //   function (error) {
    //     // alert("Scanning failed: " + error);
    //   }
    // );
    $text.addClass('disabled');
    $wave.addClass('active');
    mediaRec = new Media('recording1.wav', captureSuccess, captureError);
    mediaRec.startRecord();
  });
  $voice.on('touchend', function(){
    $text.removeClass('disabled');
    $wave.removeClass('active');
    //apiManager.executeCommand("test");
    //console.log("test");
    mediaRec.stopRecord();
    mediaRec.play();

    // audioManager.uploadWav('recording1.wav', function(speechCmd){
    //   apiManager.executeCommand(speechCmd);
    // 

    fileSystem.root.getFile("recording1.wav", null, function(entry){
      //console.log(entry);
      entry.file(function(file){

        var reader = new FileReader();
        reader.onloadend = function(evt) {
          //console.log(evt.target.result);
          //base = evt.target.result;
          audioManager(evt.target.result);
        };
        reader.readAsArrayBuffer(file);

      }, log('getting file from Entry'));
    }, log('getting fileEntry: '));

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

  $text.on('keyup', function(e){
    console.log(e);
  });

  $text.on('input', function(e){
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



