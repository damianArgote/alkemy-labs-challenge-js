import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import {Link, withRouter} from 'react-router-dom';

const FormLogin = (props) => {

  const [credentials, setCredentials] = useState({});
   //iniciar sesion en el server
   const onSubmit = async e =>{
    e.preventDefault()

    try {

      const resp =  await clientAxios.post('/api/users/login',credentials);
      
      const {token} = resp.data;
      localStorage.setItem('token',token);

      //alerta
      Swal.fire(
        'Login Correcto',
        'Has iniciado sesion',
        'success'
      )

      //redireccionar
      props.history.push('/');
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        type:'error',
        title:'Hubo un error',
        text: error.response.data.mensaje
      })
    }
  }
  
  //guardar ne el state
  const onChange = e =>{
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value
    })
  }
 


  return (

    <Fragment>
      <main className="formulario-login contenedor">
        <h1>Inicia Sesion en PlayStore</h1>

        <form

          onSubmit={onSubmit}

        >
          <div className="campo">
            <input
              type="email"
              name="email"
              onChange={onChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="campo">
            <input
              type="password"
              name="password"
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
        </div>

      </main>

    </Fragment>

  );
}

export default withRouter(FormLogin);