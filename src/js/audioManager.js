var reqwest = require('reqwest');
var $ = require('jquery');
var Promise = require('bluebird');
var visuals = require('./visuals');

module.exports = function(audioBuffer) {

  // reqwest({
  //   url: 'https://api.wit.ai/speech',
  //   method: 'post',
  //   contentType: 'audio/wav',
  //   headers: {
  //     'Authorization': 'Bearer DOOZE6JRCO6KG5HUOKSN4M5RDPHOX465',
  //     'Accept': 'application/vnd.wit.20140528+json'
  //   },
  //   data: audioBuffer
  // })
  // .then(console.log.bind(console, 'from wit'))
  // .fail(console.log.bind(console, 'wit fail: '));

  return (new Promise(function(resolve, reject){
    $.ajax({
      url: "https://api.wit.ai/speech",
      type: "POST",
      contentType: 'audio/wav',
      headers: {
        'Authorization': 'Bearer DOOZE6JRCO6KG5HUOKSN4M5RDPHOX465',
        'Accept': 'application/vnd.wit.20140528+json'
      },
      dataType: 'audio/wav',
      data: audioBuffer,
      processData: false,
      success: function(res){
        if(!!res.responseText){
          resolve(res.responseText);
        } else {
          reject(res);
        }
      },
      error: function(res){
        if(!!res.responseText){
          resolve(res.responseText);
        } else {
          reject(res);
        }
      }
    });
  }))
  .then(JSON.parse)
  .then(function(obj){
    console.log(obj);
    visuals.userCommand(obj.msg_body);

    // add function here...


    console.log(obj);
  })

  

  // var options = new FileUploadOptions();
  // options.fileKey = "file";
  // options.fileName = audioURI.substr(audioURI.lastIndexOf('/')+1);
  // options.mimeType = "audio/wav";

  // var params = {};
  // params.value1 = "test";
  // params.value2 = "param";

  // options.params = params;

  // console.log("URI:", options.fileName);

  // var ft = new FileTransfer();
  // var successCb = function(r) {
  //     console.log("Code = " + r.responseCode);
  //     console.log("Response = " + r.response);
  //     console.log("Sent = " + r.bytesSent);
  //     cb("Sample Text");
  // };
  // var failCb = function(error) {
  //     alert("An error has occurred: Code = " + error.code);
  //     console.log("upload error source " + error.source);
  //     console.log("upload error target " + error.target);
  // };

  // ft.upload(audioURI, encodeURI("http://some.server.com/upload.php"), successCb, failCb, options);


  //   curl \
  // -H 'Authorization: Bearer DOOZE6JRCO6KG5HUOKSN4M5RDPHOX465' \
  // 'https://api.wit.ai/message?v=20140621&q='

   
};



