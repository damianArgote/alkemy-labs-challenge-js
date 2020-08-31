import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Componentes
import Home from "./components/home/Home";
import FormSignUp from "./components/auth/FormSignUp";
import FormLogin from "./components/auth/FormLogin";
import Header from "./components/header/Header";
import FormApp from "./components/aplicaciones/FormApp";
import EditApp from "./components/aplicaciones/EditApp";
import Panel from "./components/panel/Panel";
import ViewApplication from './components/aplicaciones/ViewApplication';

import AplicacionState from './context/aplicaciones/aplicacionState';
import AlertaState from './context/alertas/alertaState';
import AuthState from "./context/autenticacion/authState";
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';


//revisar token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  return (
    <AlertaState>
    <AuthState>
      <AplicacionState>
      <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={FormSignUp} />
            <Route exact path="/login" component={FormLogin} />
            <Route exact path="/apps/detail/:id" component={ViewApplication} />
            <RutaPrivada exact path="/apps/new" component={FormApp} />
            <RutaPrivada exact path="/apps/edit/:id" component={EditApp} />
            <RutaPrivada exact path="/me/apps" component={Panel} />
          </Switch>
      </Router>
      </AplicacionState>
      
    </AuthState>
    </AlertaState>
  );
}

export default App;
