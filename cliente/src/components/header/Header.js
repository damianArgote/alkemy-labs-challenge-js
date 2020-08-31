import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const Header = () => {
  //info autenticacion
  const authContext = useContext(AuthContext);
  const { autenticado, user, logout } = authContext;

  return (
    <Fragment>
      <div className="navegacion">
        <nav className="sencillo">
          <ul>
            {autenticado ? <li><Link to="/">Inicio</Link></li> : null}
            
            {autenticado && user && user.role === 'Desarrollador' ? <li><Link to="/apps/new">Publicar Nueva App</Link></li> : null }

            {!autenticado ? 
              <Fragment>
                <li><Link to="/login">Iniciar Sesion</Link></li>
                <li><Link to="/signup">Crear Cuenta</Link></li>
              </Fragment> 
            : null}
          </ul>
        </nav>

        <nav className="cerrar">
          <ul>
            {autenticado ? <li><button className="boton" onClick={() => logout()}>Cerrar Sesion</button></li> : null} 
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default Header;
