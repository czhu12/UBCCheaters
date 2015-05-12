var React = require('react');
var AppAPI = require('../api/AppAPI');
var CourseStore = require('../stores/CourseStore');
var RouteUtils = require('../utils/RouteUtils');

function fetchState() {
  return {
    userInput: '',
    username: ''
  }
} 

var Footer = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return fetchState();       
  },
  componentDidMount: function() { 
  },
  componentWillUnmount: function() {
  },
  _onChange: function() {      
    this.setState(fetchState());    
  },  
  handleChange: function(e) {
    this.setState({userInput: e.target.value});
  },
  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  keyPressed: function(e) {
    if (e.key == "Enter" && e.target.value.trim() != '') {
      var message = {
        message: {
          user: this.state.username, 
          body: this.state.userInput
        }
      };

      var course = RouteUtils.currentCourse();
      var thiz = this;
      AppAPI.createMessage(course.id, message, function(result) {
        thiz.setState({userInput: ''}); 
      });
    }
  },
  render: function() {         
    return (
      <div id="footer"> 
        <div className="no-padding col-xs-2 col-sm-2 col-md-2">
          <div className="input-group">
            <span className="input-group-addon">@</span>
            <input 
              id="username" 
              value={this.state.username} 
              onChange={this.handleUsernameChange} 
              type="text" 
              className="form-control" 
              placeholder="anonymous" />
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6">
          <input 
            id="message-input" 
            value={this.state.userInput} 
            onChange={this.handleChange} 
            onKeyDown={this.keyPressed} 
            className="form-control" />
        </div>
      </div>
    );
  }
});

module.exports = Footer;
