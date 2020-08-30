import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";
import AplicacionContext from '../../context/aplicaciones/aplicacionContext';

const Header = () => {
  //info autenticacion
  const authContext = useContext(AuthContext);
  const { autenticado, logout } = authContext;

  const aplicacionContext = useContext(AplicacionContext);
  
  useEffect(() => {}, []);

  return (
    <Fragment>
      {autenticado ? (
        <div className="navegacion">
          <nav className="sencillo">
            <ul>
              <li>
              <Link to="/apps/new">Publicar</Link>
              </li>
            </ul>
          </nav>

          <nav className="cerrar">
            <ul>
              <li>
                <button className="boton" onClick={() => logout()}>
                  Cerrar Sesion
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="navegacion">
          <nav className="sencillo">
            <ul>
              <li>
                <Link to="/login">Iniciar Sesion</Link>
              </li>
              <li>
                <Link to="/signup">Crear Cuenta</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
