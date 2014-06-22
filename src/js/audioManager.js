var Promise = require('bluebird');
var witParser = require('./witParser.js');
var $ = require('jquery');
var visuals = require('./visuals');


var server = "http://optimusserve.cloudapp.net";

var $ajax = function(obj){
  return new Promise(function(resolve, reject){
    obj.success = resolve;
    obj.error = reject;
    $.ajax(obj);
  });
};

module.exports = function(audioBuffer) {

  var parsedQuery;

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
    visuals.userCommand(obj.msg_body);
    return witParser(obj.msg_body);
  })
  .then(function(resultObj){
    parsedQuery = resultObj;
    return routeToAPI(resultObj);
  })
  .then(function(res){
    if((parsedQuery.intent === 'debit' || parsedQuery.intent === 'credit') && parsedQuery.action === 'fetch'){
      visuals.listExpenses(res.text, res.data);
    }
    console.log("res",res);
    return res.text;
  })
  .catch(function(err){
    console.log("error sending to Wit", err);
  });

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



