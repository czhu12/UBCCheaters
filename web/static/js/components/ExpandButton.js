var CourseList = require('./CourseList.js');
var React = require('react');

var ExpandButton = React.createClass({
  render: function() {         
    return (
      <div className="navbar navbar-default navbar-fixed-top hidden-md hidden-lg">
        <button type="button" className="navbar-toggle" data-toggle="offcanvas" data-target=".navmenu">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">UBC Cheaters</a>
      </div>
    );
  },
});

module.exports = ExpandButton;
