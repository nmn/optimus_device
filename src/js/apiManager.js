var speechManager = require("./speechManager");
var Trello = require("./api/Trello");

exports.executeCommand = function (speechStr){
  console.log("Command:", speechStr);
  speechManager.speakText("Successfully executed command");
  trelloMe();
};

var trelloMe = function(){
  var trello = new Trello("ca91d6e6ecb68c343dd04faf87a95f9d", "b821007d0d1125bc93b472e44408eb2314b3497b499a7d6c332d81f54203589e");

  trello.get("/1/members/me", function(err, data) {
    if (err) throw err;
    console.log("me:", data);
  });

  // URL arguments are passed in as an object.
  trello.get("/1/members/me", { cards: "open" }, function(err, data) {
    if (err) throw err;
    console.log("me2:", data);
  });

  trello.get("/1/boards/520d2958eba304990d0006ea", function(err, data) {
    if (err) throw err;
    console.log("boards:", data);
  });
};