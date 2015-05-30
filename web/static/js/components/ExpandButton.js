var Constants = require('../constants/Constants');
var CourseList = require('./CourseList.js');
var React = require('react');

var ExpandButton = React.createClass({
  render: function() {         
    return (
      <div id="top-nav" className="navbar navbar-default navbar-fixed-top hidden-md hidden-lg">
        <button id="expand-button" type="button" className="navbar-toggle" data-toggle="offcanvas" data-target=".navmenu">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" id="top-nav-title" href="#"><span className="app-name">{Constants.Terms.APP_NAME}</span></a>
      </div>
    );
  },
});

module.exports = ExpandButton;
