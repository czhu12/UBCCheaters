var AppAPI = require('./api/AppAPI');
var React = require('react');
var ChatMessageList = require('./components/ChatMessageList');
var ChatFileList = require('./components/ChatFileList');
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
    var depts = this.state.depts.map(function(dept) {
      return (
        <DeptLink dept={dept}/>
      );
    });

    return (
      <div className="App">
        <div className="row">
          <div className="container">
            <ul className="Master classes-list col-md-1">
              <CourseSearchBar />
              {depts}
            </ul>
            <div className="Detail col-md-11">
              <RouteHandler/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
});

var Index = React.createClass({
  render: function () {
    return <p>Select a course from the left</p>;
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="course" path="course/:dept" handler={ChatClient}/>
  </Route>
);

function routeChanged() {
  
}

Router.run(routes, function (Handler) {
  routeChanged();
  AppAPI.getDepts(function(depts) {
    
    ServerActionCreators.receiveAllDepts(depts);
    //ServerActionCreators.receiveAllCourses(courses);
    //var course = RouteUtils.currentCourse();

    //if (course) {
    //  AppAPI.getMessages(course.id, function(messages) {
    //    ServerActionCreators.receiveAllMessages(messages);
    //  });

    //  AppAPI.getFiles(course.id, function(files) {
    //    ServerActionCreators.receiveAllFiles(files);
    //  });
    //}

    React.render(<Handler/>, document.getElementById('content'));
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
