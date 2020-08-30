import React,{Fragment} from 'react';
import ListApps from '../aplicaciones/ListApps';

const Home = () => {
    return ( 
        <Fragment>
            <main className="contenido-principal">
                <div className="contenedor">
                    <div className="contenido-principal">
                        <h1>Bienvenidos a PlayStore</h1>
                        <ListApps/>
                    </div>
                    

                </div>
            </main>
            
            
        </Fragment>
     );
}
 
export default Home;