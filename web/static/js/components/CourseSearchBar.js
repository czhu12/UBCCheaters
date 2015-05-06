var React = require('react');

function fetchState() {
  return {
  }
} 

var CourseSearchBar = React.createClass({
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
  render: function() {         
    return (
      <input className="course-search-input"/>
    );
  },
  componentDidUpdate: function() {
  },
});

module.exports = CourseSearchBar;


