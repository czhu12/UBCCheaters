var ChatFile = require('./ChatFile');
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
    $(".files-list").height(document.documentElement.clientHeight);
  },
  componentWillUnmount: function() {
    FileStore.removeListener(this._onChange); 
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
      <div className="files-container"> 
        <ul className="files-list">
          {files}
        </ul>
      </div>
    );
  }
});

module.exports = ChatFileList;
