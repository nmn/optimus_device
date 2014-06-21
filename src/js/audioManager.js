exports.uploadWav = function(audioURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = audioURI.substr(audioURI.lastIndexOf('/')+1);
    options.mimeType = "audio/wav";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    console.log("URI:", options.fileName);

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
