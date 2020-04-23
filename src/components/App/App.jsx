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
            <Users />
          </Route>
          <Route path="/sign_up">
            <Users />
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
