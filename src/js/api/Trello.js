var $ = require("jquery");
var Promise = require("bluebird");

var Trello = function(key, token){
  var apiUrl = "https://api.trello.com";
  var ajax = function(route, options, cb, ajaxType){
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
      type:ajaxType,
      success: function(data, textStatus, jqXHR){
        cb(null, data);
      },
      error: function (jqXHR, textStatus, errorThrown){
        cb(errorThrown);
      }
    });
  };
  this.get = function(route, options, cb){
    return new Promise(function (resolve, reject) {
      ajax(route, options, function(err, data){
        if(err){
          reject(err);
        }
        resolve(data);
      }, "GET");
    });
  };
  this.post = function(route, options, cb){
    return new Promise(function (resolve, reject) {
      ajax(route, options, function(err, data){
        if(err){
          reject(err);
        }
        resolve(data);
      }, "POST");
    });
  };

};
module.exports = Trello;