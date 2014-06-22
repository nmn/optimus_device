var Promise = require('bluebird');
var resultObj = {};

module.exports = function(witString){

    var words = witString.split(" ");

    getIntent(words);
    getAction(words);
    getSubject(words);
    getNum(words);

    return resultObj;

};

function getIntent(words){
  var expenseStrings = ['expense', 'expenditure', 'paid', 'debit'];
  var creditStrings = ['earned', 'received', 'got', 'credit'];

  for (var i = 0; i < words.length; i++) {
    if(expenseStrings.indexOf(words[i]) !== -1){
      resultObj.intent = "debit";
    }
  };

  resultObj.intent = resultObj.intent || "credit";

};

function getAction(words){
  var newStrings = ['create', 'new', 'add'];
  var fetchStrings = ['show', 'how', 'what', 'fetch'];

  for (var i = 0; i < words.length; i++) {
    if(newStrings.indexOf(words[i]) !== -1){
      resultObj.action = "create";
    }
  };

  resultObj.action = resultObj.action || "fetch";

};

function getNum(words){
  for (var i = 0; i < words.length; i++) {
    var cleanWord = words[i].replace("$"," ");

    if(!isNaN(parseInt(cleanWord,10))){
      resultObj.number = parseInt(cleanWord,10)
    }
  };

  if(resultObj.action === "fetch" && !resultObj.number){
    resultObj.number = 10;
  }

};

function getSubject(words){
  var subjectStrings = ['for', 'on', 'to'];
  var subject = "";

  for (var i = 0; i < words.length; i++) {
    if(subjectStrings.indexOf(words[i]) !== -1){
      for (var j = i+1; j < words.length; j++) {
        subject = subject.concat(words[j]+" ");
      };
    }
  };

  resultObj.subject = subject;
};