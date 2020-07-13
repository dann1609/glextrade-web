import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import io from 'socket.io-client';

import './App.scss';
import HeaderBar from '../HeaderBar/HeaderBar';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import FooterBar from '../FooterBar/FooterBar';
import SignUp from '../../pages/SignUp/SignUp';
import Profile from '../../pages/Profile/Profile';
import SignIn from '../../pages/SignIn/SignIn';
import Companies from '../../pages/Companies/Companies';
import Notifications from '../../pages/Notifications/Notifications';

import { persistSession, restoreSession } from '../../actions/persist';
import { getNotifications } from '../../actions/notification';
import Chat from '../Chat/Chat';

class App extends Component {
  constructor(props) {
    super(props);
    restoreSession();
    this.state = {};
    this.checkNotifications();

    this.socket = io.connect(`${process.env.REACT_APP_API_DOMAIN}/api`);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    window.addEventListener('beforeunload', this.saveState);
  }

  saveState=() => {
    persistSession();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveState);
  }

  setNotifications=(notifications) => {
    this.setState({
      notifications,
    });
  }

  checkNotifications=() => {
    getNotifications().then((response) => {
      if (!response.error) {
        this.setNotifications(response.notifications);
      }
    });
  }

  render() {
    const { notifications } = this.state;

    return (
      <Router>
        <div className="app-style">
          <HeaderBar notifications={notifications} />

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/sign_in">
              <SignIn />
            </Route>
            <Route path="/sign_up">
              <SignUp />
            </Route>
            <Route path="/profile" component={Profile} />
            <Route path="/companies/:id" component={Profile} />
            <Route path="/companies" component={Companies} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/" component={Home} />
          </Switch>
          <Chat socket={this.socket} />
          <FooterBar />
        </div>
      </Router>
    );
  }
}

export default App;
