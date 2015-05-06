var React = require('react');

var ChatFile = React.createClass({
  getLink: function(file) {
    var filename = file.name;
    var link = file.link;
    var path = 'http://' + [location.host, link, filename].join('/');
    return path;
  },
  downloadFile: function() {
    var link = this.getLink(this.props.file);
    window.location.href = link;
  },
  render: function() {
    var file = (
      <div className="file-container">
        <div>
          <div className="file-content">
            <span className="file-link">
              <a onClick={this.downloadFile}>
                {this.props.file.name}
              </a>
            </span>
          </div>
        </div>
        <hr className="file-divider"/>
      </div>
    );

    return file;
  }

}); 

module.exports = ChatFile;
