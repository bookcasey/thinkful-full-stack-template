var actions = require('./actions');

var initialState = {message: 'initialState is so fun!'};

var helloReducer = function(state, action) {
    state = state || initialState;
    if (action.type === actions.HELLO) {
        console.log("im in the reducer!");
        return {message: action.message};
    }
    else if (action.type === actions.FETCH_HELLO_SUCCESS) {
      console.log(action.message, 'it worked!');
        return {message: action.message};
    }
    else if (action.type === actions.FETCH_HELLO_SUCCESS) {
      console.log(action.error, 'it tanked');
    }

    return state;
};

exports.helloReducer = helloReducer;
