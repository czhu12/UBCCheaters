var CourseUtils = require('../utils/CourseUtils');
var ChatMessage = require('./ChatMessage');
var Footer = require('./Footer');
var MessageStore = require('../stores/MessageStore');
var React = require('react');
var RouteUtils = require('../utils/RouteUtils');

function fetchState() {
  var course = RouteUtils.currentCourse();
  return {
    messages: MessageStore.getAllForCourse(course)
  }
} 

var ChatMessageList = React.createClass({
  getInitialState: function() {
    return fetchState();       
  },
  componentDidMount: function() { 
    MessageStore.addChangeListener(this._onChange);
    $(".messages-list").height(
      document.documentElement.clientHeight - 2.5 * $("#footer").height()
    );
    // Do this whenever the window resizes.
    $(window).resize(function() {
      $(".messages-list").height(
        document.documentElement.clientHeight - 2.5 * $("#footer").height()
      );
    });
  },
  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange); 
  },
  _onChange: function() {      
    this.setState(fetchState());    
  },  
  render: function() {         
    var courseName = CourseUtils.courseName(this.props.course);
    var messages = this.state.messages.map(function(message, index) {
      if (index == 0) {        
        return <ChatMessage key={message.id} message={message} isFirst={true}/>
      } else {                 
        return <ChatMessage key={message.id} message={message} isFirst={false}/>
      }
    });

    return (
      <div className="col-xs-8 col-sm-8 col-md-8">
        <div className="comment-box">

          <div className="course-name">
            {courseName}
          </div>

          <div className="messages-container"> 
            <ul ref="chatList" className="messages-list">
              {messages}
            </ul>
            <Footer/>
          </div>
        </div>
      </div>
    );
  },
  componentDidUpdate: function() {
    this._scrollToBottom();
  },
  _scrollToBottom: function() {
    var ul = this.refs.chatList.getDOMNode();
    ul.scrollTop = ul.scrollHeight; 
  },
});

module.exports = ChatMessageList;


