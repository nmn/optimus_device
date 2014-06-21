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



