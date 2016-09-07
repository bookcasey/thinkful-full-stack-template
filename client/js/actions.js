var HELLO = 'HELLO';
var Hello = {
    type: HELLO,
    message: 'Hello from Redux'
};

var FETCH_HELLO_SUCCESS = 'FETCH_HELLO_SUCCESS';
var fetchHelloSuccess = function(message) {
    return {
        type: FETCH_HELLO_SUCCESS,
        message: message,
    };
};

var FETCH_HELLO_ERROR= 'FETCH_HELLO_ERROR';
var fetchHelloError = function(error) {
    return {
        type: FETCH_HELLO_ERROR,
        error: error
    };
};

var fetchHello = function() {
    console.log('my fetch hello');
    return function(dispatch) {
        var url = 'http://localhost:8080/api/hello';
        return fetch(url).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
          console.log('fetch hello success');
            return dispatch(
                fetchHelloSuccess(data.message)
            );
        })
        .catch(function(error) {
          console.log('fetch hello error');
            return dispatch(
                fetchHelloError(error)
            );
        });
    }
};

exports.fetchHello = fetchHello;

exports.FETCH_HELLO_SUCCESS = FETCH_HELLO_SUCCESS;
exports.fetchHelloSuccess = fetchHelloSuccess;
exports.FETCH_HELLO_ERROR = FETCH_HELLO_ERROR;
exports.fetchHelloError = fetchHelloError;
exports.HELLO = HELLO;
exports.Hello = Hello;
