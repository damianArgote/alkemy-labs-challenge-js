import React,{Fragment, useEffect, useState} from 'react';
import Application from './Application';
import Carrito from '../carrito/Carrito';
import clientAxios from '../../config/axios';

const ListApps = () => {

    const [apps,setApps] = useState([]);

    const [carrito,agregarCarrito] = useState([]);

 
    useEffect(() =>{
        const getAPI = async () =>{
            const resp = await clientAxios.get('/api/apps');
            setApps( resp.data);
        }

        getAPI();
    },[apps])

    if(apps.length === 0) return null;

    return ( 

        <Fragment>
                <Carrito
                carrito={carrito}
                agregarCarrito={agregarCarrito}
                />

                {apps.map(app =>(
                    <Application
                        key={app.id}
                        apps={apps}
                        app={app}
                        carrito={carrito}
                        agregarCarrito={agregarCarrito}
                        
                    />
                    
                ))}
        </Fragment>


     );
}
 
export default ListApps;