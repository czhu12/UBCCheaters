var CourseStore = require('../stores/CourseStore');
var React = require('react');
var ViewActions = require('../actions/ViewActions');

function fetchState(dept) {
  var deptCourses = CourseStore.getCoursesForDept(dept);
  return {
    courses: deptCourses
  }
} 

// Props contains dept
var DeptLink = React.createClass({
  getInitialState: function() {
    return fetchState(this.props.dept);       
  },
  componentDidMount: function() { 
    CourseStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CourseStore.removeChangeListener(this._onChange); 
  },
  _onChange: function() {      
    this.setState(fetchState(this.props.dept));
  },  
  handleClick: function() {
    // Here, we want to expand this tab.
    ViewActions.fetchCoursesForDept(this.props.dept.toUpperCase());
  },
  render: function() {
    var courses = this.state.courses.map(function(course) {
      return (
        <li>
          {course.course}
        </li>
      );
    }); 

    return (
      <li key={this.props.dept} onClick={this.handleClick}>
        {this.props.dept}
        {courses}
      </li>
    );
  }
});

module.exports = DeptLink;
