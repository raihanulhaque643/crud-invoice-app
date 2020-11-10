import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import AuthPage from './pages/AuthPage';
import ResponsiveDrawer from './pages/ResponsiveDrawer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <ToastContainer
      newestOnTop
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    
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
