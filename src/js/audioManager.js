var Promise = require('bluebird');
var witParser = require('./witParser.js');

var reqwest = require('reqwest');
var $ = require('jquery');

var server = "http://localhost:3000";

var $ajax = function(obj){
  return new Promise(function(resolve, reject){
    obj.success = resolve;
    obj.error = reject;
    $.ajax(obj);
  });
}

module.exports = function(audioBuffer) {

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
    return witParser(obj.msg_body);
  })
  .then(function(resultObj){
    return routeToAPI(resultObj);
  })
  .then(function(res){
    console.log("res",res);
  })
  .catch(function(err){
    console.log("error sending to Wit", err);
  })

};

function routeToAPI(resultObj){
  switch(resultObj.action){
    case 'create':
      return $ajax({
          url: server+'/expenses',
          type: "POST",
          data: {category_id:resultObj.subject, amount:resultObj.number },
        });
    case 'fetch':
    return $ajax({
        url: server+'/expenses',
        type: "GET",
      });
    default : console.log("there was an error sending to APIs");
  }

}



