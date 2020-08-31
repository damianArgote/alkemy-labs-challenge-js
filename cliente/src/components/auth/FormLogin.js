import React, { Fragment, useState,useContext,useEffect } from 'react';
import {Link} from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const FormLogin = (props) => {

  const alertaContext = useContext(AlertaContext);
  const {alerta,mostrarAlerta} = alertaContext;

  const authContext = useContext(AuthContext);

  const {mensaje,autenticado,login} = authContext;

    useEffect(() =>{
      
      if(autenticado){
        //mandar a /me/apps
        props.history.push('/me/apps');
      }
  
      if(mensaje){
        mostrarAlerta(mensaje.msg,'alerta-error');
      }
  
    },[mensaje,autenticado,props.history])

  const [user,setUser] = useState({
    email:'',
    password:''
  });

  const {email,password} = user;

  const onChange = e =>{

    if(e.target.value !== ''){
      e.target.nextElementSibling.classList.add('valido');
    }else{
      e.target.nextElementSibling.classList.remove('valido');
    }

    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  
  const onSubmit = e =>{
    e.preventDefault();

    //validar campos
    if(email.trim() === '' || password.trim() === ''){
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
    }

    //pasar al action
    login({email,password});
  }
 


  return (

    <Fragment>
      <main className="formulario-login contenedor">
        <h1>Inicia Sesion en PlayStore</h1>
        {alerta ? (<div className={`alerta ${alerta.categoria}`}>
          {alerta.msg}
        </div>) : null}
        <form

          onSubmit={onSubmit}

        >
          <div className="campo">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="campo">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="submit">
            <input
              type="submit"
              value="Iniciar Sesion"
            />
          </div>


        </form>

        <div className="contenido-inferior">
          <p className="nuevo-usuario">
                ¿Primera vez? <Link to="/signup">Crear Cuenta</Link> 
          </p>
          <Link to="/">Inicio</Link>
        </div>

      </main>

    </Fragment>

  );
}

export default FormLogin;