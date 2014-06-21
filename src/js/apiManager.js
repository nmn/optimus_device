var speechManager = require("./speechManager");

exports.executeCommand = function (speechStr){
  console.log("Command:", speechStr);
  speechManager.speakText("I'm alive!!!! Motherfucker");
};