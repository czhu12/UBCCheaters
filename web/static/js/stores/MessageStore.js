var _ = require('underscore');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
    
var CHANGE_EVENT = 'change';
var messages = [];
          
var MessageStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },      
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },    
  getAll: function() {
    return messages; 
  },
  getAllForCourse: function(course) {
    return messages.filter(function(message) {
      return message.course_id == course.id;
    });
  }         
});       
          
MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.RECEIVE_MESSAGE:
      console.log(action.message);
      messages.push(action.message);
      break;
    case ActionTypes.RECEIVE_MESSAGES:
      var newMessages = action.messages.filter(function(newMessage) {
        var contains = _.find(messages, function(message) {
          return message.id == newMessage.id;
        });

        return !(!!contains);
      });
      
      messages = messages.concat(newMessages);
      break;
  }

  MessageStore.emitChange();
});

module.exports = MessageStore;

