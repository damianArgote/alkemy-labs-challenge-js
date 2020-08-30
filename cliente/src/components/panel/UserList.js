import React,{Fragment, useEffect, useState,useContext} from 'react';
import Application from '../aplicaciones/Application';

import clientAxios from '../../config/axios';


const UserList = () =>{

     const [aplicaciones, setApps] = useState([]);

     const getAPI = async () =>{
          //console.log('consultando...');
          const respApps = await clientAxios.get('/api/me/apps');
          //console.log(respApps);
          setApps(respApps.data);
  
      }
 
      useEffect(() =>{
          getAPI();
      },[aplicaciones]);
 
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
 
export default UserList;