(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var onDeviceReady = require('./ready.js');

document.addEventListener('deviceready', onDeviceReady, false);
},{"./ready.js":3}],2:[function(require,module,exports){
exports.uploadWav = function(audioURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = audioURI.substr(audioURI.lastIndexOf('/')+1);
    options.mimeType = "audio/wav";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(audioURI, encodeURI("http://some.server.com/upload.php"), win, fail, options);
};

var win = function(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
};

var fail = function(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
};

},{}],3:[function(require,module,exports){
var audioManager = require("./audioManager");

var captureSuccess = function(mediaFiles) {
  // var i, path, len;
  // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
  //   path = mediaFiles[i].fullPath;
    
  //   //navigator.notification.alert("Got "+ len +" Files:" + path);
  // }
  console.log('success', arguments);
};

// capture error callback
var captureError = function(error) {
  console.log('fail', arguments);
  //navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};


module.exports = function(){

  var parentElement = document.getElementById('deviceready');
  var listeningElement = parentElement.querySelector('.listening');
  var receivedElement = parentElement.querySelector('.received');

  listeningElement.setAttribute('style', 'display:none;');
  receivedElement.setAttribute('style', 'display:block;');


  var mediaRec = new Media('recording.wav', captureSuccess, captureError);
  
  parentElement.addEventListener('touchstart', function(){
    //console.log(mediaRec.stopRecord);
    mediaRec.startRecord();
    //mediaRec.play();
  });
  parentElement.addEventListener('touchend', function(){
    //navigator.notification.alert("Something");
    mediaRec.stopRecord();
    var file = new Media('recording.wav', captureSuccess, captureError);
    file.play();
    //mediaRec.pause();
  });
};


//          var captureSuccess = function(mediaFiles) {
//         var i, path, len;
//         for (i = 0, len = mediaFiles.length; i < len; i += 1) {
//             path = mediaFiles[i].fullPath;
//             // do something interesting with the file
//             navigator.notification.alert("Got Files:" + len);
//         }
//         };

//         // capture error callback
//         var captureError = function(error) {
//         navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
//         };

//         // start audio capture
//         //var mediaRec = new Media('myrecording.mp3', captureSuccess, captureError);
//         parentElement.addEventListener('touchstart', function(e){
//             //navigator.notification.alert("Something");
//             // console.log('starting');
//             // mediaRec.startRecord();
//             // listeningElement.setAttribute('style', 'display:block;');
//             // receivedElement.setAttribute('style', 'display:none;');
//         });

//         parentElement.addEventListener('touchend', function(e){
//             navigator.notification.alert("Something");
//             // console.log('ending');
//             // mediaRec.startRecord();
//             // listeningElement.setAttribute('style', 'display:none;');
//             // receivedElement.setAttribute('style', 'display:block;');
//         });




},{"./audioManager":2}]},{},[1])