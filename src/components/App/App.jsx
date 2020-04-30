import React from 'react';
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

function App() {
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <FooterBar />
      </div>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
