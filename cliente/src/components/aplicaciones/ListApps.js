import React,{Fragment, useEffect, useState} from 'react';
import Application from './Application';

import clientAxios from '../../config/axios';

const ListApps = () => {

    const [apps, setApps] = useState([])

    const getAPI = async () =>{
        //console.log('consultando...');
        const respApps = await clientAxios.get('/api/apps');
        //console.log(respApps);
        setApps(respApps.data);

    }

    useEffect(() =>{
        getAPI();
    },[apps]);

    return ( 

        <Fragment>
            <ul>
                {apps.map(app =>(
                    <Application
                        key={app.id}
                        app={app}
                    />
                    
                ))}
            </ul>
        </Fragment>


     );
}
 
export default ListApps;