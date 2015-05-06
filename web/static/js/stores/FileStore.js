var _ = require('underscore');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
    
var CHANGE_EVENT = 'change';
var files = [];
          
var FileStore = assign({}, EventEmitter.prototype, {
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
    return files; 
  },
  getAllForCourse: function(course) {
    return files.filter(function(file) {
      return file.course_id == course.id;
    });
  }
});       
          
FileStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.RECEIVE_FILE:
      files.push(action.file);
      break;
    case ActionTypes.RECEIVE_FILES:
      var newFiles = action.files.filter(function(newFile) {
        var contains = _.find(files, function(file) {
          return file.id == newFile.id;
        });

        return !(!!contains);
      });

      files = files.concat(newFiles);
      break;
  }

  FileStore.emitChange();
});

module.exports = FileStore;

