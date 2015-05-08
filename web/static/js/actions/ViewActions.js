var AppAPI = require('../api/AppAPI');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ServerActionCreators = require('./ServerActionCreators');
var ActionTypes = Constants.ActionTypes;

module.exports = {
  searchDepts: function(query) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SEARCH_DEPTS,
      query: query
    });
  },
  fetchCoursesForDept: function(dept) {
    AppAPI.getCourses(dept, function(courses) {
      ServerActionCreators.receiveAllCourses(courses);
    });
  }
};
