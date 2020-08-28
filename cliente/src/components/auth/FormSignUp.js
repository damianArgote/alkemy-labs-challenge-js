import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const FormSignUp = () => {
  return (
    <Fragment>
      <main className="formulario-login contenedor">

        <h1>Crea tu cuenta en PlayStore</h1>

        <form
          method="POST"
        >
          <div className="campo">
            <input
              type="text"
              name="username"
            />
            <label htmlFor="username">Username</label>
          </div>

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

          <div className="campo">
            <input
              type="password"
              name="confirm"
            />
            <label htmlFor="confirm">Repetir Password</label>
          </div>

          <div className="campo">
            <select
              name="role"
            >
              <option value="">-Seleccionar Rol-</option>
              <option value="Cliente">Cliente</option>
              <option value="Desarrollador">Desarrollador</option>
            </select>
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