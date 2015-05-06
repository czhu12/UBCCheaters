var keymirror = require('keymirror');                                                                                                                                              
module.exports = {             
  ActionTypes: keymirror({     
    RECEIVE_COURSES: null,      
    CREATE_MESSAGE: null,      
    RECEIVE_MESSAGES: null,
    RECEIVE_MESSAGE: null,
    RECEIVE_FILE: null,
    RECEIVE_FILES: null
  }),

  PayloadSources: keymirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
}
