module.exports = function(str){
  console.log("Speak:", str);
  var successCb = function(e){
    console.log("success:", e);
  };
  var failCb = function(e){
    console.log("fail:", e);
  };
  var mediaRec = new Media(encodeURI('http://tts-api.com/tts.mp3?q='+str), successCb, failCb);
  mediaRec.play();
};