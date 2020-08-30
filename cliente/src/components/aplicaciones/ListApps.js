import React,{Fragment, useContext, useEffect, useState} from 'react';
import Application from './Application';
import AplicacionContext from '../../context/aplicaciones/aplicacionContext';

const ListApps = () => {

    const aplicacionContext = useContext(AplicacionContext);
    const {aplicaciones,obtenerAplicaciones} = aplicacionContext;

    useEffect(() =>{
        obtenerAplicaciones();
    },[aplicaciones])

    if(aplicaciones.length === 0) return null;

    return ( 

        <Fragment>
                {aplicaciones.map(aplicacion =>(
                    <Application
                        key={aplicacion.id}
                        aplicacion={aplicacion}
                    />
                    
                ))}
        </Fragment>


     );
}
 
export default ListApps;