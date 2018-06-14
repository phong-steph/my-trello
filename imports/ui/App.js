import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Planning from './Planning.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1>My Trello</h1>
        </header>
        <AccountsUIWrapper />
        {
          this.props.currentUser ?
          <Planning /> : ''
        }
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);
