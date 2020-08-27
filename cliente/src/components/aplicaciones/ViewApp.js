import React,{Fragment,useState,useEffect} from 'react';
import clientAxios from 'axios';

const ViewApp = (props) => {

    //obtener id
    const {id} = props.match.params;

    //state
    const [app,setApp] = useState({
        category:'',
        name:'',
        price:'',
        image:''
    });

     //consultar API
     const getAPI = async () =>{
        const respApp = await clientAxios.get(`/api/apps/${id}`);
        console.log(respApp.data);
        setApp(respApp.data);
    }

    useEffect(() =>{
        getAPI();
    },[]);

    const {category,name,price,image} = app;


    return ( 
        <Fragment>
            <h1>Aplicacion</h1>
            
        </Fragment>
     );
}
 
export default ViewApp;