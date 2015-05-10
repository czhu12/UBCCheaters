var CourseStore = require('../stores/CourseStore.js');
module.exports = {
  currentCourse: function() {
    var splitUrl = window.location.href.split('/');
    var courseId = splitUrl[splitUrl.length - 1];

    var foundCourse = CourseStore.lookup(courseId);
    return foundCourse;
  },
  isCourseRoute: function() {
    var splitUrl = window.location.href.split('/');
    return splitUrl[splitUrl.length - 2].indexOf('course') > -1;
  },
  getCourseId: function() {
    var splitUrl = window.location.href.split('/');
    var courseId = splitUrl[splitUrl.length - 1];

    return courseId;
  }
}
