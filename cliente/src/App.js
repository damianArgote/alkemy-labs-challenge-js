import React,{Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Componentes
import Home from './components/home/Home';
import FormSignUp from './components/auth/FormSignUp';
import FormLogin from './components/auth/FormLogin';

import FormApp from './components/aplicaciones/FormApp';
import EditApp from './components/aplicaciones/EditApp';


function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (

      <Router>
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/signup' component={FormSignUp}/>
              <Route exact path='/login' component={FormLogin}/>
              <Route exact path='/apps/new' component={FormApp}/>
              <Route exact path='/apps/edit/:id' component={EditApp}/>
          </Switch>
      </Router>
  
   
  );
}

export default App;
