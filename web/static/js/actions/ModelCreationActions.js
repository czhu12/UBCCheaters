var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;

module.exports = {
  receiveAllDepts: function(depts) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DEPTS,
      depts: depts
    });
  }
};
