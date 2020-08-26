import React,{useContext,useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Applications = () => {

    const authContext = useContext(AuthContext);
    const {user,userAuth} = authContext;


    useEffect(() => {
        userAuth();
    }, [])

    return ( 
        <div>
            <h1>Desde Aplicaciones</h1>
            {user ? <p>Hola, {user.username}</p>  : null}
        </div>
        
     );
}
 
export default Applications;