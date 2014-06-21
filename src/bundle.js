(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var onDeviceReady = require('./ready.js');

document.addEventListener('deviceready', onDeviceReady, false);
},{"./ready.js":2}],2:[function(require,module,exports){

module.exports = function(){

  var parentElement = document.getElementById('deviceready');
  var listeningElement = parentElement.querySelector('.listening');
  var receivedElement = parentElement.querySelector('.received');

  listeningElement.setAttribute('style', 'display:none;');
  receivedElement.setAttribute('style', 'display:block;');
};


// var captureSuccess = function(mediaFiles) {
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




},{}]},{},[1])