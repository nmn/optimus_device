var Promise = require('bluebird');

exports.uploadWav = function(audioURI, cb) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = audioURI.substr(audioURI.lastIndexOf('/')+1);
    options.mimeType = "audio/wav";
    options.Authorization = 'Bearer TE4IZYGQG7ZR2CBQE4RYZGKDNYYSIVDA';
    options.Accept = 'application/vnd.wit.20140528+json';

    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;

    console.log("URI:", options.fileName);

    var ft = new FileTransfer();

    var upload = function(audioURI, remoteURL){
        return new Promise(function(resolve, reject){
            ft.upload(audioURI, remoteURL, resolve, reject, options);
        });
    }

    upload(audioURI, encodeURI("https://api.wit.ai/speech"))
    .then(function(res){
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        //cb("Sample Text");
    })
    .catch(error){
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

};



