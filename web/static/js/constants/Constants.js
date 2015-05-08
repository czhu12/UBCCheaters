var keymirror = require('keymirror');                                                                                                                                              
module.exports = {             
  ActionTypes: keymirror({     
    CREATE_MESSAGE: null,      
    RECEIVE_COURSES: null,      
    RECEIVE_DEPTS: null,      
    RECEIVE_FILE: null,
    RECEIVE_FILES: null,
    RECEIVE_MESSAGES: null,
    RECEIVE_MESSAGE: null,
    SEARCH_DEPTS: null
  }),

  PayloadSources: keymirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
}
