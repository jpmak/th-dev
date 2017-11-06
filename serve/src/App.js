
var React = require('react'),
    DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li
 
module.exports = React.createClass({
  getInitialState: function() {
   return {
     isSayBye: false
   }
  },
  handleClick: function() {
   this.setState({
     isSayBye: !this.state.isSayBye
   })
  },
  render: function() {
    var content = this.state.isSayBye ? 'Bye' : 'Hello World';
    return div(null,
      div(null, content),
      button({onClick: this.handleClick}, 'switch')
    );
  }
})