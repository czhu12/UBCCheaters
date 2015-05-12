var CourseSearchBar = require('../components/CourseSearchBar');
var CourseStore = require('../stores/CourseStore');
var DeptLink = require('../components/DeptLink');
var React = require('react');
var ViewActions = require('../actions/ViewActions.js');

var CourseList = React.createClass({
  componentDidMount: function() { 
    var paddingTop = parseInt($(".course-list-container").css('padding-top').replace('px', ''));
    var searchBarHeight = 2 * $("#course-search-bar").height();
    var paddingBottom = 30;
    $(".course-list").height(document.documentElement.clientHeight - paddingTop - searchBarHeight - paddingBottom);
    $(window).resize(function() {
      $(".course-list").height(document.documentElement.clientHeight - paddingTop - searchBarHeight - paddingBottom);
    });
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
    var depts = this.props.depts.map(function(dept) {
      var deptCourses = CourseStore.getCoursesForDept(dept);
      return (
        <DeptLink 
          key={dept} 
          courses={deptCourses} 
          dept={dept}/>
      );
    });

    return (
      <div className="course-list-container">
        <CourseSearchBar />
        <ul className="course-list">
          {depts}
        </ul>
      </div>
    );
  },
  componentDidUpdate: function() {
  },
});

module.exports = CourseList;
