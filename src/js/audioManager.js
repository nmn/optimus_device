var Promise = require('bluebird');
var witParser = require('./witParser.js');

var reqwest = require('reqwest');
var $ = require('jquery');

var server = "http://localhost:3000";

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
  .then(function(obj){
    // add function here...
    console.log("wtf",obj);
    console.log("objj", obj.msg_body);

    return witParser(obj.msg_body);

  })
  .then(function(resultObj){
    console.log("obj",resultObj);
    return new Promise(function(resolve,reject){
      resolve(routeToAPI(resultObj));
    });
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
      return (new Promise(function(resolve, reject){
        $.ajax({
          url: server+'/expenses',
          type: "POST",
          data: {category_id:33 },
          success: function(res){
            if(!!res){
              resolve(res);
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
    case 'fetch':
    return (new Promise(function(resolve, reject){
      $.ajax({
        url: server+'/expenses',
        type: "GET",
        success: function(res){
          if(!!res){
            resolve(res);
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
    default : console.log("there was an error sending to APIs");
  }

}



