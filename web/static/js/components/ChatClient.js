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
          <div className="col-xs-8 col-sm-8 col-md-8">
            <div className="comment-box">
              <ChatMessageList />
            </div>
          </div>

          <div className="col-xs-4 col-sm-4 col-md-4">
            <div className="files-box">
              <div className="files-title">
                <h4>
                  Class files
                </h4>
              </div>
              <FileUpload />
              <ChatFileList />
            </div>
          </div>
        </div>
      </div>
    );
  } 
});

module.exports = ChatClient;
