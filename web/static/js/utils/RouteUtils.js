var CourseStore = require('../stores/CourseStore.js');
module.exports = {
  currentCourse: function() {
    var splitUrl = window.location.href.split('/');
    var courseId = splitUrl[splitUrl.length - 1];

    var foundCourse = CourseStore.lookup(courseId);
    return foundCourse;
  }
}
