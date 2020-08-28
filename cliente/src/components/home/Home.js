import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

import ListApps from '../aplicaciones/ListApps';

const Home = () => {
    return ( 
        <Fragment>
            <div className="contenedor">
                <div>
                    <Link to="/signup">Registrarse</Link>
                    <Link to="/login">Iniciar Sesion</Link>
                </div>
                <div className="contenido-principal">
                    <h1>Bienvenidos a PlayStore</h1>
                    {/*listar todas las aplicaciones*/}
                    <ListApps/>
                </div>
                

            </div>
            
        </Fragment>
     );
}
 
export default Home;