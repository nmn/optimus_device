var Promise = require('bluebird');
var resultObj = {};

module.exports = function(witString){
    var words = witString.split(" ");
    console.log("words",words);

    isZen(words);
    isTrello(words);
    getIntent(words);
    getAction(words);
    getSubject(words);
    getNum(words);

    return resultObj;
};

function isZen(words){
  var zenStrings = ['ticket', 'question', 'customer','service','help','request'];

  for (var i = 0; i < words.length; i++) {
    if(zenStrings.indexOf(words[i]) !== -1){
      resultObj.isZen = 'true';
    }
  };

  resultObj.isZen = resultObj.isZen || 'false';

};

function isTrello(words){
  var trelloStrings = ['tasks', 'task', 'lists', 'boards', 'cards'];

  for (var i = 0; i < words.length; i++) {
    if(trelloStrings.indexOf(words[i]) !== -1){
      resultObj.isTrello = 'true';
    }
  };

  resultObj.isTrello = resultObj.isTrello || 'false';

};

function getIntent(words){
  var expenseStrings = ['expense','expenses', 'expenditure', 'paid', 'debit'];
  var creditStrings = ['earned', 'received', 'got', 'credit'];

  for (var i = 0; i < words.length; i++) {
    if(expenseStrings.indexOf(words[i]) !== -1){
      resultObj.intent = "expense";
    }
  };

  resultObj.intent = resultObj.intent || "receipt";

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