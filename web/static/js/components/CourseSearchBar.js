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
      <div id="course-search-bar">
        <div className="course-search inner-addon left-addon">
          <span className="fa fa-search glyphicon"></span>
          <input 
            type="text"
            placeholder="Search"
            value={this.state.username} 
            className="course-search-input"
            onChange={this.handleChange}
            />
        </div>
      </div>
    );
  },
  componentDidUpdate: function() {
  },
});

module.exports = CourseSearchBar;


