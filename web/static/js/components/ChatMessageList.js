var ChatMessage = require('./ChatMessage');
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
    $(".messages-list").height(document.documentElement.clientHeight - 240);
  },
  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange); 
  },
  _onChange: function() {      
    this.setState(fetchState());    
  },  
  render: function() {         
    var messages = this.state.messages.map(function(message, index) {
      if (index == 0) {        
        return <ChatMessage key={message.id} message={message} isFirst={true}/>
      } else {                 
        return <ChatMessage key={message.id} message={message} isFirst={false}/>
      }
    });

    return (
      <div className="messages-container"> 
        <ul ref="chatList" className="messages-list">
          {messages}
        </ul>
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


