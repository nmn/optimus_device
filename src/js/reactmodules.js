var React = require('react');

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

var currencyFormatter = function(number){
  number = Math.round(number);
  number = number + '';
  return '$ ' + number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var barChart = React.createClass({
  render: function(){
    var maxNum = Math.max.apply(Math, this.props.buckets);
    return React.DOM.div({style:{
      height: '250px',
      width: '290px',
      paddingTop: '50px',
      margin: '0 auto'
    }},this.props.buckets.map(function(bucket){
      return React.DOM.div({className: 'bar color' + Math.floor(Math.random()*5), style:{display:'inline-block', width:'9%', height: (150*bucket/maxNum) + 'px'}}, //opacity: (0.5 + ((bucket/maxNum)*0.5))
        React.DOM.span({}, currencyFormatter(bucket))
      );
    }));
  }
});

module.exports.expenses = React.createClass({
  getInitialState: function(){
    
    var text = this.props.text;
    var minDate, maxDate, minAmount, maxAmount;
    var data = this.props.data.map(function(expense){
      var tokens = expense.updated.split(' ');
      var date = tokens[0].split('-');
      date[1] = months[parseInt(date[1])];
      var time = tokens[1];

      
      var amount = parseFloat(expense.amount);
      var dateMS = (new Date(date[1] + ' ' + date[2] + ', ' + date[0] + ' ' + time)).valueOf();

      if(minDate === undefined || dateMS < minDate){
        minDate = dateMS;
      }
      if(maxDate === undefined || dateMS > maxDate){
        maxDate = dateMS;
      }
      if(minAmount === undefined || amount < minAmount){
        minAmount = amount;
      }
      if(maxAmount === undefined || amount > maxAmount){
        maxAmount = amount;
      }

      return {
        amount: amount,
        date: dateMS
      };
      
    });

    var bucketSize = (maxDate - minDate)/10;

    var buckets = [];

    for(var i = 0; i < 10; i++){
      var num = 0;
      for(var j = 0; j < data.length; j++){
        if(data[j].date > (minDate + bucketSize * i) && data[j].date < (minDate + bucketSize * (i+1))){
          num += data[j].amount;
        }
      }
      buckets[i] = num;
    }


    return {
      text: text,
      data: data,
      buckets: buckets
    };
    
  },
  render: function(){
    return React.DOM.div({className:'expensesChart'},
      barChart({buckets:this.state.buckets})
    );
  }
});































module.exports.Tickets = React.createClass({
  render: function(){
    return React.DOM.div({}, this.props.data.map(function(ticket){
      return React.DOM.div({className:'ticket'}, [
        React.DOM.h3({}, ticket.subject),
        React.DOM.p({}, ticket.description),
        React.DOM.span({}, new Date(ticket.updated_at))
      ]);
    }));
  }
});