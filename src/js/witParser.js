var Promise = require('bluebird');

var containsAny = function(array, words){
  var rt = false;
  for(var i = 0; i < words.length; i++){
    if(array.indexOf(words[i]) !== -1){
      return true;
    }
  }
  return false;
};


module.exports = function(witString){
    var resultObj = {};

    var words = witString.toLowerCase().split(" ");
    console.log("words",words);

    isZen(words, resultObj);
    isTrello(words, resultObj);
    getIntent(words, resultObj);
    getAction(words, resultObj);
    getSubject(words, resultObj);
    getNum(words, resultObj);

    return resultObj;
};

function isZen(words, resultObj){
  var zenStrings = ['zen','ticket','tickets', 'question', 'customer','service','help','request'];
  resultObj.isZen = containsAny(words, zenStrings);
};

function isTrello(words, resultObj){
  var trelloStrings = ['tasks', 'task', 'list', 'lists', 'boards', 'card', 'cards', 'car', 'yellow', 'trello', 'hello'];
  resultObj.isTrello = containsAny(words, trelloStrings);
};

function getIntent(words, resultObj){
  var expenseStrings = ['expense','expenses', 'expenditure', 'paid', 'debit'];
  var creditStrings = ['earned', 'received', 'got', 'credit'];

  resultObj.intent = containsAny(words, expenseStrings) ? 'expense' :
                     containsAny(words, creditStrings) ? 'receipt' : null;
};

function getAction(words, resultObj){
  var newStrings = ['create', 'new', 'add'];
  var fetchStrings = ['show', 'how', 'what', 'get', 'fetch'];

  resultObj.action = containsAny(words, newStrings) ? 'create' :
                     containsAny(words, fetchStrings) ? 'fetch' : null;

}

function getNum(words, resultObj){
  for (var i = 0; i < words.length; i++) {
    var cleanWord = words[i].replace("$"," ");

    if(!isNaN(parseInt(cleanWord,10))){
      resultObj.number = parseInt(cleanWord, 10);
    }
  }

  // if(resultObj.action === "fetch" && !resultObj.number){
  //   resultObj.number = 10;
  // }

}

function getSubject(words, resultObj){
  var subjectStrings = ['for', 'on', 'to'];
  var subject = "";

  var i = 0;

  for(var i = 0; i < subjectStrings.length; i++){
    var x = words.lastIndexOf(subjectStrings[i]);
    if(x > i) i = x;
  }

  resultObj.subject = (i >= 1)? words.slice(i+1, words.length - i - 1).join(' ') : null;
}