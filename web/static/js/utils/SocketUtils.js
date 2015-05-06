var _ = require('underscore');

module.exports = {
  clearChannels: function() {
    if (!this.socket) {
      return;
    }
    
    _.each(this.joinedChannels, function(channel) {
      this.socket.leave(channel);
    });
  },
  init: function() {
    this.socket = new Phoenix.Socket("ws://" + location.host +  "/ws");
    this.socket.connect();
  },
  join: function(channel, callback, params) {
    if (!this.socket) {
      return;
    }

    this.joinedChannels = this.joinedChannels ? this.joinedChannels : [];
    this.joinedChannels.push(channel);
    socket.join(channel, params).receive('ok', callback);
  }
}
