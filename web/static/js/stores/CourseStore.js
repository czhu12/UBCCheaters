var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
    
var CHANGE_EVENT = 'change';
var courses = [];
var depts = [];
          
var CourseStore = assign({}, EventEmitter.prototype, {
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
    return courses; 
  },
  getAllDepts: function() {
    return depts; 
  },
  lookupDept: function(dept) {
    return _.find(courses, function(course) {
      return course.dept == dept;
    });
  }
});       
          
CourseStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.RECEIVE_COURSES:
      for (var i = 0; i < action.courses.length; i++) {
        var newCourse = action.courses[i];

        if (!hasCourse(newCourse)) {
          courses.push(newCourse);
        }
      }
      break;
    case ActionTypes.RECEIVE_DEPTS:
      depts = action.depts;
      break;
  }
  CourseStore.emitChange();
});

function hasCourse(newCourse) {
  for (var i = 0; i < courses.length; i++) {
    var course = courses[i];
    if (course.dept == newCourse.dept) {
      return true;
    }
  }
  return false;
}

module.exports = CourseStore;

