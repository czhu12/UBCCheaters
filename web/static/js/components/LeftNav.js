var CourseList = require('./CourseList');
var ExpandButton = require('./ExpandButton');
var React = require('react');

var LeftNav = React.createClass({
  render: function() {         
    return (
      <div>
        <div id="left-nav" className="navmenu navmenu-default navmenu-fixed-left offcanvas-sm">
          <CourseList depts={this.props.depts}/>
        </div>

        <ExpandButton />
      </div>
    );
  },
});

module.exports = LeftNav;
