import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/Header';
import ListApps from '../aplicaciones/ListApps';

const Home = () => {
    return ( 
        <Fragment>
            <main className="contenido-principal">
                <div className="contenedor">
                   <Header/>
                    <div className="contenido-principal">
                        <h1>Bienvenidos a PlayStore</h1>
                        {/*listar todas las aplicaciones*/}
                        <ListApps/>
                    </div>
                    

                </div>
            </main>
            
            
        </Fragment>
     );
}
 
export default Home;