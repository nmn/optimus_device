var $ = require('jquery');
var React = require('react');
var reactmodules = require('./reactmodules');

module.exports.userCommand = function(text){

  $convoContent = $('.convo .content');

  $convoContent.append('<div class="user">' + text + '</div>');
  document.querySelector('.content').scrollTop = 9999;
};

module.exports.listExpenses = function(text, data){
  var div = document.createElement('div');

  React.renderComponent(reactmodules.expenses({text:text, data:data}), div);
  
  $convoContent = $('.convo .content');
  $convoContent.append(div);
  document.querySelector('.content').scrollTop = 9999;
};

module.exports.showTickets = function(text, data){
  var div = document.createElement('div');

  React.renderComponent(reactmodules.Tickets({text:text, data:data}), div);
  
  $convoContent = $('.convo .content');
  $convoContent.append(div);
  document.querySelector('.content').scrollTop = 9999;
};