(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("web/static/js/actions/ServerActionCreators", function(exports, require, module) {
"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var Constants = require("../constants/Constants");
var ActionTypes = Constants.ActionTypes;

module.exports = {
  receiveAllDepts: function receiveAllDepts(depts) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DEPTS,
      depts: depts
    });
  },
  receiveAllCourses: function receiveAllCourses(courses) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_COURSES,
      courses: courses
    });
  },
  receiveAllMessages: function receiveAllMessages(messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGES,
      messages: messages
    });
  },
  receiveMessage: function receiveMessage(message) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGE,
      message: message
    });
  },
  receiveAllFiles: function receiveAllFiles(files) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_FILES,
      files: files
    });
  },
  receiveFile: function receiveFile(file) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_FILE,
      file: file
    });
  } };});

require.register("web/static/js/api/AppAPI", function(exports, require, module) {
"use strict";

module.exports = {
  getDepts: function getDepts(callback) {
    $.getJSON("/api/courses/meta", function (result) {
      // Here, we return the result
      callback(result);
    });
  },
  getCourses: function getCourses(callback) {
    $.getJSON("/api/courses", function (result) {
      // Here, we return the result
      callback(result);
    });
  },
  getMessages: function getMessages(courseId, callback) {
    var route = "/api/courses/" + courseId + "/messages";
    $.getJSON(route, function (result) {
      // Here, we return the result
      callback(result);
    });
  },
  getFiles: function getFiles(courseId, callback) {
    $.getJSON("/api/courses/" + courseId + "/files", function (result) {
      // Here, we return the result
      callback(result);
    });
  },
  createMessage: function createMessage(courseId, message, callback) {
    $.post("/api/courses/" + courseId + "/messages", message, function (result) {
      callback(result);
    });
  } };});

require.register("web/static/js/app", function(exports, require, module) {
"use strict";

var AppAPI = require("./api/AppAPI");
var React = require("react");
var ChatMessageList = require("./components/ChatMessageList");
var ChatFileList = require("./components/ChatFileList");
var CourseSearchBar = require("./components/CourseSearchBar");
var DeptLink = require("./components/DeptLink");
var ServerActionCreators = require("./actions/ServerActionCreators");
var ChatClient = require("./components/ChatClient");
var FileUpload = require("./components/FileUpload");
var CourseStore = require("./stores/CourseStore");
var Router = require("react-router");
var Route = Router.Route;
var RouteUtils = require("./utils/RouteUtils");
var SocketUtils = require("./utils/SocketUtils");
var Footer = require("./components/Footer");

var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    var state = this.fetchState();
    return state;
  },
  fetchState: function fetchState() {
    var courses = CourseStore.getAll();
    var depts = CourseStore.getAllDepts();
    return {
      depts: depts,
      courses: courses
    };
  },
  componentDidMount: function componentDidMount() {
    CourseStore.addChangeListener(this._onChange);
    $(".classes-list").height(document.documentElement.clientHeight);
  },
  componentWillUnmount: function componentWillUnmount() {
    CourseStore.removeListener(this._onChange);
  },
  _onChange: function _onChange() {
    this.setState(this.fetchState());
  },
  render: function render() {
    var depts = this.state.depts.map(function (dept) {
      return React.createElement(DeptLink, { dept: dept });
    });

    //var links = this.state.courses.map(function (course) {
    //  return (
    //    <div>
    //      <li key={course.id}>
    //        <Link
    //          to="course"
    //          params={{ dept: course.dept }}
    //        >{course.dept}</Link>
    //      </li>
    //    </div>
    //  );
    //});
    return React.createElement(
      "div",
      { className: "App" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "ul",
            { className: "Master classes-list col-md-1" },
            React.createElement(CourseSearchBar, null),
            depts
          ),
          React.createElement(
            "div",
            { className: "Detail col-md-11" },
            React.createElement(RouteHandler, null)
          )
        ),
        React.createElement(Footer, null)
      )
    );
  }
});

var Index = React.createClass({
  displayName: "Index",

  render: function render() {
    return React.createElement(
      "p",
      null,
      "Select a course from the left"
    );
  }
});

var routes = React.createElement(
  Route,
  { handler: App },
  React.createElement(DefaultRoute, { handler: Index }),
  React.createElement(Route, { name: "course", path: "course/:dept", handler: ChatClient })
);

function routeChanged() {}

Router.run(routes, function (Handler) {
  routeChanged();
  AppAPI.getDepts(function (depts) {

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

    React.render(React.createElement(Handler, null), document.getElementById("content"));
  });
});

var socket = new Phoenix.Socket("ws://" + location.host + "/ws");
socket.connect();

// this code needs to be run after the route is switched.
socket.join("rooms:lobby", {}).receive("ok", function (channel) {
  channel.on("new:uploadedfile", function (file) {
    ServerActionCreators.receiveFile(file);
  });

  channel.on("new:msg", function (message) {
    ServerActionCreators.receiveMessage(message);
  });
});});

require.register("web/static/js/components/ChatClient", function(exports, require, module) {
"use strict";

var React = require("react");
var ChatMessageList = require("./ChatMessageList");
var FileUpload = require("./FileUpload");
var ChatFileList = require("./ChatFileList");

var ChatClient = React.createClass({
  displayName: "ChatClient",

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function render() {
    var dept = this.context.router.getCurrentParams().dept;
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-xs-8 col-sm-8 col-md-8" },
          React.createElement(
            "div",
            { className: "comment-box" },
            React.createElement(
              "h3",
              null,
              dept
            ),
            React.createElement(ChatMessageList, null)
          )
        ),
        React.createElement(
          "div",
          { className: "col-xs-4 col-sm-4 col-md-4" },
          React.createElement(
            "div",
            { className: "files-box" },
            React.createElement(
              "div",
              { className: "files-title" },
              React.createElement(
                "h4",
                null,
                "Class files"
              )
            ),
            React.createElement(FileUpload, null),
            React.createElement(ChatFileList, null)
          )
        )
      )
    );
  }
});

module.exports = ChatClient;});

require.register("web/static/js/components/ChatFile", function(exports, require, module) {
"use strict";

var React = require("react");

var ChatFile = React.createClass({
  displayName: "ChatFile",

  getLink: function getLink(file) {
    var filename = file.name;
    var link = file.link;
    var path = "http://" + [location.host, link, filename].join("/");
    return path;
  },
  downloadFile: function downloadFile() {
    var link = this.getLink(this.props.file);
    window.location.href = link;
  },
  render: function render() {
    var file = React.createElement(
      "div",
      { className: "file-container" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "file-content" },
          React.createElement(
            "span",
            { className: "file-link" },
            React.createElement(
              "a",
              { onClick: this.downloadFile },
              this.props.file.name
            )
          )
        )
      ),
      React.createElement("hr", { className: "file-divider" })
    );

    return file;
  }

});

module.exports = ChatFile;});

require.register("web/static/js/components/ChatFileList", function(exports, require, module) {
"use strict";

var ChatFile = require("./ChatFile");
var FileStore = require("../stores/FileStore");
var React = require("react");
var RouteUtils = require("../utils/RouteUtils");

function fetchState() {
  var course = RouteUtils.currentCourse();
  return {
    files: FileStore.getAllForCourse(course)
  };
}

var ChatFileList = React.createClass({
  displayName: "ChatFileList",

  getInitialState: function getInitialState() {
    return fetchState();
  },
  componentDidMount: function componentDidMount() {
    FileStore.addChangeListener(this._onChange);
    $(".files-list").height(document.documentElement.clientHeight);
  },
  componentWillUnmount: function componentWillUnmount() {
    FileStore.removeListener(this._onChange);
  },
  _onChange: function _onChange() {
    this.setState(fetchState());
  },
  render: function render() {
    var files = this.state.files.map(function (file) {
      return React.createElement(
        "li",
        { key: file.id },
        React.createElement(ChatFile, { file: file })
      );
    });

    return React.createElement(
      "div",
      { className: "files-container" },
      React.createElement(
        "ul",
        { className: "files-list" },
        files
      )
    );
  }
});

module.exports = ChatFileList;});

require.register("web/static/js/components/ChatMessage", function(exports, require, module) {
"use strict";

var React = require("react");

var ChatMessage = React.createClass({
  displayName: "ChatMessage",

  render: function render() {
    var message;
    var username = this.props.message.user ? this.props.message.user : "anonymous";
    if (this.props.isFirst) {
      message = React.createElement(
        "li",
        { className: "message" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "message-content" },
            React.createElement(
              "span",
              { className: "message-user" },
              "[",
              username,
              "]"
            ),
            React.createElement(
              "span",
              { className: "message-body" },
              this.props.message.body
            )
          )
        )
      );
    } else {
      message = React.createElement(
        "li",
        { className: "message" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "message-content" },
            React.createElement(
              "span",
              { className: "message-user" },
              "[",
              username,
              "]"
            ),
            React.createElement(
              "span",
              { className: "message-body" },
              this.props.message.body
            )
          )
        )
      );
    }
    return message;
  }
});

module.exports = ChatMessage;});

require.register("web/static/js/components/ChatMessageList", function(exports, require, module) {
"use strict";

var ChatMessage = require("./ChatMessage");
var MessageStore = require("../stores/MessageStore");
var React = require("react");
var RouteUtils = require("../utils/RouteUtils");

function fetchState() {
  var course = RouteUtils.currentCourse();
  return {
    messages: MessageStore.getAllForCourse(course)
  };
}

var ChatMessageList = React.createClass({
  displayName: "ChatMessageList",

  getInitialState: function getInitialState() {
    return fetchState();
  },
  componentDidMount: function componentDidMount() {
    MessageStore.addChangeListener(this._onChange);
    $(".messages-list").height(document.documentElement.clientHeight - 140);
  },
  componentWillUnmount: function componentWillUnmount() {
    MessageStore.removeListener(this._onChange);
  },
  _onChange: function _onChange() {
    this.setState(fetchState());
  },
  render: function render() {
    var messages = this.state.messages.map(function (message, index) {
      if (index == 0) {
        return React.createElement(ChatMessage, { key: message.id, message: message, isFirst: true });
      } else {
        return React.createElement(ChatMessage, { key: message.id, message: message, isFirst: false });
      }
    });

    return React.createElement(
      "div",
      { className: "messages-container" },
      React.createElement(
        "ul",
        { ref: "chatList", className: "messages-list" },
        messages
      )
    );
  },
  componentDidUpdate: function componentDidUpdate() {
    this._scrollToBottom();
  },
  _scrollToBottom: function _scrollToBottom() {
    var ul = this.refs.chatList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  } });

module.exports = ChatMessageList;});

require.register("web/static/js/components/CourseSearchBar", function(exports, require, module) {
"use strict";

var React = require("react");

function fetchState() {
  return {};
}

var CourseSearchBar = React.createClass({
  displayName: "CourseSearchBar",

  getInitialState: function getInitialState() {
    return fetchState();
  },
  componentDidMount: function componentDidMount() {},
  componentWillUnmount: function componentWillUnmount() {},
  _onChange: function _onChange() {
    this.setState(fetchState());
  },
  render: function render() {
    return React.createElement("input", { className: "course-search-input" });
  },
  componentDidUpdate: function componentDidUpdate() {} });

module.exports = CourseSearchBar;});

require.register("web/static/js/components/DeptLink", function(exports, require, module) {
"use strict";

var React = require("react");

function fetchState() {
  return {};
}

// Props contains dept
var DeptLink = React.createClass({
  displayName: "DeptLink",

  getInitialState: function getInitialState() {
    return fetchState();
  },
  componentDidMount: function componentDidMount() {},
  componentWillUnmount: function componentWillUnmount() {},
  _onChange: function _onChange() {
    this.setState(fetchState());
  },
  handleClick: function handleClick() {
    // Here, we want to expand this tab.
    console.log("hello");
  },
  render: function render() {
    return React.createElement(
      "li",
      { onClick: this.handleClick },
      this.props.dept
    );
  }
});

module.exports = DeptLink;});

require.register("web/static/js/components/FileUpload", function(exports, require, module) {
"use strict";

var React = require("react");
var MessageStore = require("../stores/MessageStore");
var CourseStore = require("../stores/CourseStore");

function fetchState() {
  return {};
}

var FileUpload = React.createClass({
  displayName: "FileUpload",

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function getInitialState() {
    return fetchState();
  },
  componentDidMount: function componentDidMount() {
    $("#upload").fileupload({
      // This function is called when a file is added to the queue;
      // either via the browse button, or via drag/drop:
      add: function add(e, data) {
        // Automatically upload the file once it is added to the queue
        var jqXHR = data.submit();
      },

      fail: function fail(e, data) {
        // Something has gone wrong!
        data.context.addClass("error");
      }
    });
  },
  componentWillUnmount: function componentWillUnmount() {},
  _onChange: function _onChange() {
    this.setState(fetchState());
  },
  handleUpload: function handleUpload() {},
  getCourseId: function getCourseId() {
    var dept = this.context.router.getCurrentParams().dept;
    var course = CourseStore.lookupDept(dept);

    return course.id;
  },
  getCourseEndpoint: function getCourseEndpoint() {
    var courseId = this.getCourseId();
    var endpoint = "api/courses/" + courseId + "/files";
    return endpoint;
  },
  render: function render() {
    return React.createElement(
      "div",
      { onClick: this.handleUpload, className: "file-upload" },
      React.createElement(
        "form",
        { id: "upload", method: "post", action: this.getCourseEndpoint(), encType: "multipart/form-data" },
        React.createElement("input", { type: "file", name: "file", multiple: true })
      )
    );
  }
});

module.exports = FileUpload;});

require.register("web/static/js/components/Footer", function(exports, require, module) {
"use strict";

var React = require("react");
var AppAPI = require("../api/AppAPI");
var CourseStore = require("../stores/CourseStore");
var RouteUtils = require("../utils/RouteUtils");

function fetchState() {
  return {
    userInput: "",
    username: ""
  };
}

var Footer = React.createClass({
  displayName: "Footer",

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function getInitialState() {
    return fetchState();
  },
  componentDidMount: function componentDidMount() {},
  componentWillUnmount: function componentWillUnmount() {},
  _onChange: function _onChange() {
    this.setState(fetchState());
  },
  handleChange: function handleChange(e) {
    this.setState({ userInput: e.target.value });
  },
  handleUsernameChange: function handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  },
  keyPressed: function keyPressed(e) {
    if (e.key == "Enter" && e.target.value.trim() != "") {
      var message = {
        message: {
          user: this.state.username,
          body: this.state.userInput
        }
      };

      var course = RouteUtils.currentCourse();
      var thiz = this;
      AppAPI.createMessage(course.id, message, function (result) {
        console.log("clearning userInput");
        thiz.setState({ userInput: "" });
      });
    }
  },
  render: function render() {
    return React.createElement(
      "div",
      { id: "footer" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-sm-2" },
            React.createElement(
              "div",
              { className: "input-group" },
              React.createElement(
                "span",
                { className: "input-group-addon" },
                "@"
              ),
              React.createElement("input", {
                id: "username",
                value: this.state.username,
                onChange: this.handleUsernameChange,
                type: "text",
                className: "form-control",
                placeholder: "anonymous" })
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-10" },
            React.createElement("input", {
              id: "message-input",
              value: this.state.userInput,
              onChange: this.handleChange,
              onKeyDown: this.keyPressed,
              className: "form-control" })
          )
        )
      )
    );
  }
});

module.exports = Footer;});

require.register("web/static/js/constants/Constants", function(exports, require, module) {
"use strict";

var keymirror = require("keymirror");
module.exports = {
  ActionTypes: keymirror({
    CREATE_MESSAGE: null,
    RECEIVE_COURSES: null,
    RECEIVE_DEPTS: null,
    RECEIVE_FILE: null,
    RECEIVE_FILES: null,
    RECEIVE_MESSAGES: null,
    RECEIVE_MESSAGE: null
  }),

  PayloadSources: keymirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};});

;require.register("web/static/js/dispatcher/AppDispatcher", function(exports, require, module) {
"use strict";

var Dispatcher = require("flux").Dispatcher;

var assign = require("object-assign");
var PayloadSources = require("../constants/Constants.js");

var AppDispatcher = assign(new Dispatcher(), {
  handleServerAction: function handleServerAction(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };

    this.dispatch(payload);
  },
  handleViewAction: function handleViewAction(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };

    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;});

require.register("web/static/js/stores/CourseStore", function(exports, require, module) {
"use strict";

var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var AppDispatcher = require("../dispatcher/AppDispatcher");
var Constants = require("../constants/Constants");
var ActionTypes = Constants.ActionTypes;

var CHANGE_EVENT = "change";
var courses = [];
var depts = [];

var CourseStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },
  getAll: function getAll() {
    return courses;
  },
  getAllDepts: function getAllDepts() {
    return depts;
  },
  lookupDept: function lookupDept(dept) {
    return _.find(courses, function (course) {
      return course.dept == dept;
    });
  }
});

CourseStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;
  switch (action.type) {
    case ActionTypes.RECEIVE_COURSES:
      for (var i = 0; i < action.courses.length; i++) {
        var newCourse = action.courses[i];

        if (!hasCourse(newCourse)) {
          courses.push(newCourse);
        }
      }
      break;
    case ActionTypes.RECEIVE_DEPTS:
      depts = action.depts;
      break;
  }
  CourseStore.emitChange();
});

function hasCourse(newCourse) {
  for (var i = 0; i < courses.length; i++) {
    var course = courses[i];
    if (course.dept == newCourse.dept) {
      return true;
    }
  }
  return false;
}

module.exports = CourseStore;});

require.register("web/static/js/stores/FileStore", function(exports, require, module) {
"use strict";

var _ = require("underscore");
var assign = require("object-assign");
var AppDispatcher = require("../dispatcher/AppDispatcher");
var Constants = require("../constants/Constants");
var ActionTypes = Constants.ActionTypes;
var EventEmitter = require("events").EventEmitter;

var CHANGE_EVENT = "change";
var files = [];

var FileStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },
  getAll: function getAll() {
    return files;
  },
  getAllForCourse: function getAllForCourse(course) {
    return files.filter(function (file) {
      return file.course_id == course.id;
    });
  }
});

FileStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;
  switch (action.type) {
    case ActionTypes.RECEIVE_FILE:
      files.push(action.file);
      break;
    case ActionTypes.RECEIVE_FILES:
      var newFiles = action.files.filter(function (newFile) {
        var contains = _.find(files, function (file) {
          return file.id == newFile.id;
        });

        return !!!contains;
      });

      files = files.concat(newFiles);
      break;
  }

  FileStore.emitChange();
});

module.exports = FileStore;});

require.register("web/static/js/stores/MessageStore", function(exports, require, module) {
"use strict";

var _ = require("underscore");
var assign = require("object-assign");
var AppDispatcher = require("../dispatcher/AppDispatcher");
var Constants = require("../constants/Constants");
var ActionTypes = Constants.ActionTypes;
var EventEmitter = require("events").EventEmitter;

var CHANGE_EVENT = "change";
var messages = [];

var MessageStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },
  getAll: function getAll() {
    return messages;
  },
  getAllForCourse: function getAllForCourse(course) {
    return messages.filter(function (message) {
      return message.course_id == course.id;
    });
  }
});

MessageStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;
  switch (action.type) {
    case ActionTypes.RECEIVE_MESSAGE:
      console.log(action.message);
      messages.push(action.message);
      break;
    case ActionTypes.RECEIVE_MESSAGES:
      var newMessages = action.messages.filter(function (newMessage) {
        var contains = _.find(messages, function (message) {
          return message.id == newMessage.id;
        });

        return !!!contains;
      });

      messages = messages.concat(newMessages);
      break;
  }

  MessageStore.emitChange();
});

module.exports = MessageStore;});

require.register("web/static/js/utils/RouteUtils", function(exports, require, module) {
"use strict";

var CourseStore = require("../stores/CourseStore.js");
module.exports = {
  currentCourse: function currentCourse() {
    var splitUrl = window.location.href.split("/");
    var dept = splitUrl[splitUrl.length - 1];

    return CourseStore.lookupDept(dept);
  }
};});

;require.register("web/static/js/utils/SocketUtils", function(exports, require, module) {
"use strict";

var _ = require("underscore");

module.exports = {
  clearChannels: function clearChannels() {
    if (!this.socket) {
      return;
    }

    _.each(this.joinedChannels, function (channel) {
      this.socket.leave(channel);
    });
  },
  init: function init() {
    this.socket = new Phoenix.Socket("ws://" + location.host + "/ws");
    this.socket.connect();
  },
  join: function join(channel, callback, params) {
    if (!this.socket) {
      return;
    }

    this.joinedChannels = this.joinedChannels ? this.joinedChannels : [];
    this.joinedChannels.push(channel);
    socket.join(channel, params).receive("ok", callback);
  }
};});

;
//# sourceMappingURL=app.js.map