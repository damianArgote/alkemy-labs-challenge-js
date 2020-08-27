import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

import ListApps from '../aplicaciones/ListApps';

const Home = () => {
    return ( 
        <Fragment>
            <div>
                <Link to="/signup">Registrarse</Link>
                <Link to="/login">Iniciar Sesion</Link>
            </div>

            <h1>Bienvenidos a PlayStore</h1>
            {/*listar todas las aplicaciones*/}
            <ListApps/>
        </Fragment>
     );
}
 
export default Home;