var ChatFile = require('./ChatFile');
var FileUpload = require('./FileUpload');
var FileStore = require('../stores/FileStore');
var React = require('react');
var RouteUtils = require('../utils/RouteUtils');

function fetchState() {        
  var course = RouteUtils.currentCourse();
  return {                     
    files: FileStore.getAllForCourse(course) 
  }
} 

var ChatFileList = React.createClass({
  getInitialState: function() {
    return fetchState();       
  },
  componentDidMount: function() { 
    FileStore.addChangeListener(this._onChange);
    var headerHeight = $(".files-header").height();
    var paddingBottom = 30;
    $(".files-list").height(document.documentElement.clientHeight - headerHeight - paddingBottom);
  },
  componentWillUnmount: function() {
    FileStore.removeChangeListener(this._onChange); 
  },
  _onChange: function() {      
    this.setState(fetchState());
  },
  render: function() {         
    var files = this.state.files.map(function(file) {
      return (
        <li key={file.id}>
          <ChatFile file={file} />
        </li>
      );
    });

    return (
      <div className="col-xs-4 col-sm-4 col-md-4">
        <div className="files-box">
          <div className="files-header">
            <div className="files-title">
              <h4>
                Class files
              </h4>
            </div>
            <FileUpload />
          </div>
          <div className="files-container"> 
            <ul className="files-list">
              {files}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ChatFileList;
