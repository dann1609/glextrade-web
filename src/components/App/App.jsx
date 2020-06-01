import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.scss';
import HeaderBar from '../HeaderBar/HeaderBar';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import FooterBar from '../FooterBar/FooterBar';
import SignUp from '../../pages/SignUp/SignUp';
import Profile from '../../pages/Profile/Profile';
import SignIn from '../../pages/SignIn/SignIn';
import Companies from '../../pages/Companies/Companies';

import { persistSession, restoreSession } from '../../actions/persist';

class App extends Component {
  constructor(props) {
    super(props);
    restoreSession();
  }

  UNSAFE_componentWillMount() {
    window.addEventListener('beforeunload', this.saveState);
  }

  UNSAFE_componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveState);
  }

  saveState=() => {
    persistSession();
  }

  render() {
    return (
      <Router>
        <div>
          <HeaderBar />

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
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/companies">
              <Companies />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <FooterBar />
        </div>
      </Router>
    );
  }
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
