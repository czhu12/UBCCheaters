var React = require('react');

var ChatMessage = React.createClass({
  render: function() {
    var message; 
    var username = this.props.message.user ? this.props.message.user : 'anonymous';
    if (this.props.isFirst) {  
      message = (
        <li className="message">
          <div>
            <div className="message-content">
              <span className="message-user">[{username}]</span> 
              <span className="message-body">{this.props.message.body}</span>
            </div>
          </div>
        </li>
      );
    } else {
      message = (
        <li className="message">
          <div>
            <div className="message-content">
              <span className="message-user">[{username}]</span> 
              <span className="message-body">{this.props.message.body}</span>
            </div>
          </div>
        </li>
      );
    } 
    return message;
  }   
}); 

module.exports = ChatMessage;
