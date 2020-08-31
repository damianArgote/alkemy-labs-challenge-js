import React, { Fragment,useState,useContext,useEffect } from 'react';
import {Link} from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const FormSignUp = (props) => {

  const alertaContext = useContext(AlertaContext);
  const {alerta,mostrarAlerta} = alertaContext;

  const authContext = useContext(AuthContext);

  const {mensaje,autenticado,register} = authContext;

  //si el usuario ya existe
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
    role:'',
    username:'',
    email:'',
    password:'',
    confirm:''
  })

  const {role,username,email,password,confirm} = user;


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
    if(username.trim() === '' || 
      email.trim() === '' || 
      password.trim() === '' || 
      confirm.trim() === '' || role.trim() === ''){
        mostrarAlerta('Todos los campos son obligatorios','alerta-error');
        return;
    }

    //password iguales
    if(password !== confirm){
      mostrarAlerta('Los Passwords no son iguales','alerta-error');
      return;
    }
    //pasarlo al action
    register({
      role,
      username,
      email,
      password
    });

  }
  

  return (
    <Fragment>
      <main className="formulario-login contenedor">

        <h1>Crea tu cuenta en PlayStore</h1>
        {alerta ? (<div className={`alerta ${alerta.categoria}`}>
          {alerta.msg}
        </div>) : null}
        <form
          onSubmit={onSubmit}
        >
          <div className="campo">
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
            />
            <label htmlFor="username">Username</label>
          </div>

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

          <div className="campo">
            <input
              type="password"
              name="confirm"
              value={confirm}
              onChange={onChange}
            />
            <label htmlFor="confirm">Repetir Password</label>
          </div>

          <div className="campo">
            <select
              name="role"
              onChange={onChange}
            >
              <option value="" selected>-Seleccionar Rol-</option>
              <option value="Cliente">Cliente</option>
              <option value="Desarrollador">Desarrollador</option>
            </select>
            <label htmlFor="role"></label>
          </div>

          <div className="submit">
            <input
              type="submit"
              value="Registrarse"
            />
          </div>
        </form>

        <div className="contenido-inferior">
          <p className="nuevo-usuario">
            <Link to="/">Volver</Link> 
          </p>
        </div>

      </main>

    </Fragment>
  );
}

export default FormSignUp;