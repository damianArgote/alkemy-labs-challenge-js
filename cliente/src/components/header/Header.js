import React from 'react';
import {Link} from 'react-router-dom';

const Header = () =>{

  return(
    <nav className="sencillo">
            <ul>
                <li><Link to="/login">Iniciar Sesion</Link></li>
                <li><Link to="/signup">Crear Cuenta</Link></li>
            </ul>
      </nav>
  )

}

export default Header;