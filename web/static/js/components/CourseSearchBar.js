var React = require('react');
var ViewActions = require('../actions/ViewActions.js');

function fetchState() {
  return {
    query: ''
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
  handleChange: function(e) {
    this.setState({query: e.target.value});
    ViewActions.searchDepts(e.target.value);
  },
  render: function() {         
    return (
      <input 
        type="text"
        value={this.state.username} 
        className="course-search-input style-5"
        onChange={this.handleChange}
        />
    );
  },
  componentDidUpdate: function() {
  },
});

module.exports = CourseSearchBar;


