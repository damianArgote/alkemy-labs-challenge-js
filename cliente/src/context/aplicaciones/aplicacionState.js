import React,{useReducer} from 'react';
import clientAxios from '../../config/axios';
import aplicacionContext from './aplicacionContext';
import aplicacionReducer from './aplicacionReducer';
import {
    OBTENER_APLICACIONES
} from '../../types';



const AplicacionState = props =>{

    const initialState = {
        aplicaciones:[],
        formulario: true,
        errorformulario:false,
        aplicacion:null

    }

    const [state,dispatch] = useReducer(aplicacionReducer,initialState);

    //CRUD aplicaciones
    
    //obtener las aplicaciones
    const obtenerAplicaciones = async () =>{
        try {
            const resp = await clientAxios.get('/api/apps');
            dispatch({
                type:OBTENER_APLICACIONES,
                payload:resp.data
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    return(
        <aplicacionContext.Provider
            value={{
                aplicaciones: state.aplicaciones,
                aplicacion:state.aplicacion,
                obtenerAplicaciones,
            }}
        >
            {props.children}
        </aplicacionContext.Provider>
    )

}

export default AplicacionState;