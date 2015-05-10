module.exports = {
  getDepts: function(callback) {
    $.getJSON('/api/courses/meta', function(result) {
      // Here, we return the result
      callback(result);
    });
  },
  getCourses: function(dept, callback) {
    $.getJSON('/api/courses', {dept: dept}, function(result) {
      // Here, we return the result
      callback(result);
    });
  },
  getMessages: function(courseId, callback) {
    var route = '/api/courses/' + courseId + '/messages';
    $.getJSON(route, function(result) {
      // Here, we return the result
      callback(result);
    });
  },
  getFiles: function(courseId, callback) {
    $.getJSON('/api/courses/' + courseId + '/files', function(result) {
      // Here, we return the result
      callback(result);
    });
  },
  createMessage: function(courseId, message, callback) {
    $.post('/api/courses/' + courseId + '/messages', message, function(result) {
      callback(result);
    });
  },
  getCourse: function(courseId, callback) {
    var route = '/api/courses/' + courseId;
    $.getJSON(route, function(result) {
      callback(result);
    });
  }
};
