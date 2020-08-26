import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './components/home/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Applications from './components/applications/Applications';

import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';

//Revisar si existe token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
  
    <AlertaState>
      <AuthState>
        <Router>
          <Switch>
            <Route exact path="/apps" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/me/apps" component={Applications} />
          </Switch>
        </Router>
      </AuthState>
    </AlertaState>
  );
}

export default App;
