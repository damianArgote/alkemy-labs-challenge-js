import React, { Fragment } from 'react';

import {Link} from 'react-router-dom';

const FormLogin = () => {
  return (

    <Fragment>
      <main className="formulario-login contenedor">
        <h1>Inicia Sesion en PlayStore</h1>

        <form

        >
          <div className="campo">
            <input
              type="email"
              name="email"
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="campo">
            <input
              type="password"
              name="password"
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

export default FormLogin;