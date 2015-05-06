var React = require('react');

function fetchState() {
  return {
  }
} 

// Props contains dept
var DeptLink = React.createClass({
  getInitialState: function() {
    return fetchState();       
  },
  componentDidMount: function() { 
  },
  componentWillUnmount: function() {
  },
  _onChange: function() {      
    this.setState(fetchState());    
  },  
  handleClick: function() {
    // Here, we want to expand this tab.
    console.log('hello');
  },
  render: function() {
    return (
      <li onClick={this.handleClick}>
        {this.props.dept}
      </li>
    );
  }
});

module.exports = DeptLink;
