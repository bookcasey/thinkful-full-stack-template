import 'babel-polyfill';

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var store = require('./store');
var actions = require('./actions');

var connect = require('react-redux').connect;

var Hello = React.createClass({
  componentWillMount: function() {
    this.props.dispatch(actions.fetchHello());
  },
  render: function() {
    return (
      <div>{this.props.message}
      </div>
    )
  }
});

var mapStateToProps = function(state, props) {
    return {
        message: state.message
    };
};

var Container = connect(mapStateToProps)(Hello);


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <Container />
        </Provider>,
      document.getElementById('app'));
});

console.log(`Client running in ${process.env.NODE_ENV} mode`);
