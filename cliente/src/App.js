import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Applications from './components/applications/Applications';

import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';

function App() {

  

  return (
  
    <AlertaState>
      <AuthState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/me/apps" component={Applications} />
          </Switch>
        </Router>
      </AuthState>
    </AlertaState>
  );
}

export default App;
