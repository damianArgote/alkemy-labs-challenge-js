import React from 'react'
import {Link} from 'react-router-dom';

const Home = () => {
  return ( 
      <div>
        <div>
          <Link to={'/signup'}>
                  Registrarse
          </Link>

          <Link to={'/login'}>
                Iniciar sesion
          </Link>

        </div>

        <h1>Desde Home</h1>

      </div>
   );
}

export default Home;