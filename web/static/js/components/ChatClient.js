var CourseStore = require('../stores/CourseStore');
var ChatFileList = require('./ChatFileList');
var ChatMessageList = require('./ChatMessageList');
var FileUpload = require('./FileUpload');
var React = require('react');
var RouteUtils = require('../utils/RouteUtils');

function fetchState() {
  return null;
}

var ChatClient = React.createClass({
  getInitialState: function() {
    return fetchState();
  },
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  componentDidUpdate: function() {
  },
  render: function() {
    var courseId = this.context.router.getCurrentParams().course_id;
    var course = CourseStore.lookup(courseId);
    var dept = course.dept;
    var courseNumber = course.course;
    return (
      <div>
        <div className="row">
          <ChatMessageList course={course}/>
          <ChatFileList />
        </div>
      </div>
    );
  } 
});

module.exports = ChatClient;
