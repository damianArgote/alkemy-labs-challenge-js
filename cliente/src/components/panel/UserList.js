import React,{Fragment, useEffect, useState} from 'react';
import Application from '../aplicaciones/Application';
import clientAxios from '../../config/axios';


const UserList = () =>{

    const [apps,setApps] = useState([]);


 
    useEffect(() =>{
        const getAPI = async () =>{
            const resp = await clientAxios.get('/api/me/apps');
            setApps( resp.data);
        }

        getAPI();
    },[apps])

    if(apps.length === 0) return null;

    return ( 

        <Fragment>
                {apps.map(app =>(
                    <Application
                        key={app.id}
                        app={app}
                    />
                    
                ))}
        </Fragment>


     );
}
export default UserList;