import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import AuthPage from './pages/AuthPage';
import ResponsiveDrawer from './pages/ResponsiveDrawer';

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <AuthPage />
        </Route>
        <Route path="/home">
        <ResponsiveDrawer />
        </Route>
        <Route path="">
          <h1>Eror 404! Component not found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
