var speechManager = require("./speechManager");

exports.executeCommand = function (speechStr){
  console.log("Command:", speechStr);
  speechManager.speakText("Successfully executed command");
};
