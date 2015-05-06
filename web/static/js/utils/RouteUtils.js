var CourseStore = require('../stores/CourseStore.js');
module.exports = {
  currentCourse: function() {
    var splitUrl = window.location.href.split('/');
    var dept = splitUrl[splitUrl.length - 1];

    return CourseStore.lookupDept(dept);
  }
}
