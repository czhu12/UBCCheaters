var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;

module.exports = {
  receiveAllDepts: function(depts) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DEPTS,
      depts: depts
    });
  },
  receiveAllCourses: function(courses) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_COURSES,
      courses: courses
    });
  },
  receiveAllMessages: function(messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGES,
      messages: messages
    });
  },
  receiveMessage: function(message) {
    AppDispatcher.handleServerAction({
      type:ActionTypes.RECEIVE_MESSAGE,
      message: message
    });
  },
  receiveAllFiles: function(files) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_FILES,
      files: files
    });
  },
  receiveFile: function(file) {
    AppDispatcher.handleServerAction({
      type:ActionTypes.RECEIVE_FILE,
      file: file
    });
  },
};
