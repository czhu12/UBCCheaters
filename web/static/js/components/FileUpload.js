var RouteUtils = require('../utils/RouteUtils');
var React = require('react');
var MessageStore = require('../stores/MessageStore');
var CourseStore = require('../stores/CourseStore');

function fetchState() {        
  return {                     
  }
} 

var FileUpload = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return fetchState();       
  },
  componentDidMount: function() { 
    $('#upload').fileupload({
        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {
            // Automatically upload the file once it is added to the queue
            var jqXHR = data.submit();
        },

        fail:function(e, data){
            // Something has gone wrong!
            data.context.addClass('error');
        }
    });
  },
  componentWillUnmount: function() {
  },
  _onChange: function() {      
    this.setState(fetchState());    
  },  
  handleUpload: function() {
  },
  getCourseId: function() {
    var course = RouteUtils.currentCourse();
    return course.id;
  },
  getCourseEndpoint: function() {
    var courseId = this.getCourseId();
    var endpoint = 'api/courses/' + courseId + '/files';
    return endpoint;
  },
  render: function() {         
    return (
      <div onClick={this.handleUpload} className="file-upload"> 
        <form id='upload' method='post' action={this.getCourseEndpoint()} encType="multipart/form-data">
          <input type="file" name="file" multiple />
        </form>
      </div>
    );
  }
});

module.exports = FileUpload;
