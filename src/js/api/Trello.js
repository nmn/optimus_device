var $ = require("jquery");

var Trello = function(key, token){
  var apiUrl = "https://api.trello.com";
  this.get = function(route, options, cb){
    options = options || {};
    cb = cb || function(){};
    if(typeof(options) === "function"){
      cb = options;
      options = {};
    }
    options.key = key;
    options.token = token;
    var str = "";
    for (var k in options) {
        if (str !== "") {
            str += "&";
        }
        str += k + "=" + options[k];
    }
    console.log("GET:", apiUrl+route+"?"+str);
    $.ajax({
      url:apiUrl+route+"?"+str,
      type:"GET",
      success: function(data, textStatus, jqXHR){
        cb(null, data);
      },
      error: function (jqXHR, textStatus, errorThrown){
        cb(errorThrown);
      }
    });
  };
};
module.exports = Trello;