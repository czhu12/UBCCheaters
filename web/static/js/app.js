var AppAPI = require('./api/AppAPI');
var React = require('react');
var ChatMessageList = require('./components/ChatMessageList');
var ChatFileList = require('./components/ChatFileList');
var CourseList = require('./components/CourseList');
var CourseSearchBar = require('./components/CourseSearchBar');
var DeptLink = require('./components/DeptLink');
var ServerActionCreators = require('./actions/ServerActionCreators');
var ChatClient = require('./components/ChatClient');
var FileUpload = require('./components/FileUpload');
var CourseStore = require('./stores/CourseStore');
var Router = require('react-router');
var Route = Router.Route;
var RouteUtils = require('./utils/RouteUtils');
var SocketUtils = require('./utils/SocketUtils');
var Footer = require('./components/Footer');

var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
  
var App = React.createClass({
  getInitialState: function () {
    var state = this.fetchState();
    return state;
  },
  fetchState: function() {
    var depts = CourseStore.getFilteredDepts();
    return {
      depts: depts,
    }
  },
  componentDidMount: function() { 
    CourseStore.addChangeListener(this._onChange);
    $(".classes-list").height(document.documentElement.clientHeight);
  },
  componentWillUnmount: function() {
    CourseStore.removeListener(this._onChange); 
  },
  _onChange: function() {      
    this.setState(this.fetchState());    
  },  
  render: function () {
    return (
      <div className="App">
        <div className="row">
          <ul className="Master classes-list hidden-xs col-md-2 col-sm-2 col-lg-2">
            <CourseList depts={this.state.depts}/>
          </ul>
          <div className="Detail col-md-10 col-sm-10 col-lg-10">
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }
});

var Index = React.createClass({
  render: function () {
    return (
      <p className="index-prompt">
        <h2 className="index-title">
          Select a course from the left
        </h2>
      </p>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="course" path="course/:course_id" handler={ChatClient}/>
  </Route>
);

Router.run(routes, function (Handler) {
  AppAPI.getDepts(function(depts) {
    ServerActionCreators.receiveAllDepts(depts);
    if (RouteUtils.isCourseRoute()) {
      var courseId = RouteUtils.getCourseId();

      AppAPI.getCourse(courseId, function(course) {
        AppAPI.getCourses(course.dept, function(courses) {
          ServerActionCreators.receiveAllCourses(courses);
        });
        ServerActionCreators.receiveAllCourses([course]);

        AppAPI.getMessages(course.id, function(messages) {
          ServerActionCreators.receiveAllMessages(messages);
        });

        AppAPI.getFiles(course.id, function(files) {
          ServerActionCreators.receiveAllFiles(files);
        });

        React.render(<Handler/>, document.getElementById('content'));
      });
    } else {
      React.render(<Handler/>, document.getElementById('content'));
    }
  });
});

var socket     = new Phoenix.Socket("ws://" + location.host +  "/ws");
socket.connect();

// this code needs to be run after the route is switched.
socket.join('rooms:lobby', {}).receive('ok', function(channel) {
  channel.on('new:uploadedfile', function(file) {
    ServerActionCreators.receiveFile(file);
  });

  channel.on('new:msg', function(message) {
    ServerActionCreators.receiveMessage(message);
  });
});
