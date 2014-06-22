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

module.exports = function(audioBuffer, text) {

  var parsedQuery;
  var a;

  if(!!audioBuffer) {
    a = (new Promise(function(resolve, reject){
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
    })).then(JSON.parse);
  } else if(!!text) {
    a = new Promise(function(resolve, reject){
      resolve({msg_body : text});
    });
  }

  

  return a
  .then(function(obj){
    visuals.userCommand(obj.msg_body);
    return witParser(obj.msg_body);
  })
  .then(function(resultObj){
    parsedQuery = resultObj;
    return routeToAPI(resultObj);
  })
  .then(function(res){
    $('.content').append('<p>' + res.text + '</p>');
    if((parsedQuery.intent === 'expense' || parsedQuery.intent === 'receipt') && parsedQuery.action === 'fetch'){
      visuals.listExpenses(res.text, res.data);
    } else if(!!parsedQuery.isZen){
      visuals.showTickets(res.text, res.data);
    } else if(parsedQuery.isTrello && parsedQuery.action === 'fetch'){
      visuals.showCards(res.text, res.data);
    }
    console.log("res",res);
    return res.text;
  })
  .catch(function(err){
    console.log("error sending to Wit", err);
  });

};




function routeToAPI(resultObj){
  console.log("resultObj",resultObj);
  //Zendesk only gets
  if(!!resultObj.isZen){
    console.log("hitting zen");
    var url = server+'/zendesk';
    console.log(url);

    return $ajax({
      url: url,
      type: "GET",
    });
  }

  //Trello must create tasks and get tasks
  else if(resultObj.isTrello && resultObj.action === 'create'){
    console.log("hitting trello:create");
    return $ajax({
      url: server+'/tasks',
      type: "POST",
      data: {listName:'basic', taskName:resultObj.subject},
    });
  } else if(!!resultObj.isTrello && resultObj.action === 'fetch'){
    console.log("hitting trello:fetch");
    return $ajax({
      url: server+'/tasks',
      type: "GET",
    });
  }

  //Freshbook must post and get expenses and receipt
  else if(resultObj.intent ==='expense' && resultObj.action === 'create' && !!resultObj.number && !!resultObj.subject){
    console.log("hitting freshbooks:create");
    return $ajax({
      url: server+'/expenses',
      type: "POST",
      data: {amount:resultObj.number, notes:resultObj.subject},
    });
  }else if(resultObj.intent ==='expense' && resultObj.action === 'fetch'){
    console.log("hitting freshbooks:fetch");
    return $ajax({
      url: server+'/expenses',
      type: "GET",
    });
  }
  else {
    return {
      text: "Sorry, I couldn't quite get that.",
      data: {}
    };
  }

  

  //routes need to be added:
  // if(resultObj.intent ==='receipt' && resultObj.action === 'create'){
  //   return $ajax({
  //     url: server+'/receipt',
  //     type: "POST",
  //     data: {amount:resultObj.number, notes:resultObj.subject},
  //   });
  // }else if(resultObj.intent ==='receipt' && resultObj.action === 'fetch'){
  //   return $ajax({
  //     url: server+'/receipt',
  //     type: "GET",
  //   });
  // }



}



