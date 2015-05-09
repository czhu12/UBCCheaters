var ChatFileList = require('./ChatFileList');
var ChatMessageList = require('./ChatMessageList');
var FileUpload = require('./FileUpload');
var React = require('react');
var RouteUtils = require('../utils/RouteUtils');

var ChatClient = React.createClass({
  getInitialState: function() {
    var course = RouteUtils.currentCourse();

    return {
      course: course
    };
  },
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    var dept = this.state.course.dept;
    return (
      <div>
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8">
            <div className="comment-box">
              <h3>{dept}</h3>
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
