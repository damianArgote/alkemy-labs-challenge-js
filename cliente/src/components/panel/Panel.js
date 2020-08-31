import React,{Fragment,useContext,useEffect,useState} from 'react';
import UserList from './UserList';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const Panel = () => {

    //extraer info de usuario
    const authContext = useContext(AuthContext);
    const {user,autenticado} = authContext;


    return ( 
        <Fragment>
            <main className="contenido-principal">
                <div className="contenedor">
                
                  
                    <div className="contenido-principal">
                   
                        {user ? (
                            <h1>Bienvenido {user.username}</h1>
                            
                        ) : null}
                            
                        <UserList
                           
                        />
                    </div>
                    

                </div>
            </main>
            
            
        </Fragment>
     );
}
 
export default Panel;