import React,{useReducer} from 'react';
import clientAxios from '../../config/axios';
import aplicacionContext from './aplicacionContext';
import aplicacionReducer from './aplicacionReducer';
import {
    FORMULARIO_APLICACION, 
    OBTENER_APLICACIONES,
    AGREGAR_APLICACION,
    VALIDAR_FORMULARIO,
    APLICACION_ACTUAL,
    ELIMINAR_APLICACION,
    USUARIO_APLICACIONES
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
    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_APLICACION
        })
    }
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

    //obtener aplicaciones del user
    const getuserApps = async () =>{
        try {
            const resp = await clientAxios.get('/api/me/apps');
            console.log(resp.data);
            dispatch({
                type:USUARIO_APLICACIONES,
                payload:resp.data
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    //AGREGAR APLICACION
    const agregarAplicacion = async aplicacion =>{

        try {
            const resp = await clientAxios.post('/api/apps',aplicacion);
            console.log(resp)
            dispatch({
                type:AGREGAR_APLICACION,
                payload: resp.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const mostrarError= () =>{
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }

    //Selecionar aplicacion
    const aplicacionActual = aplicacionId =>{
        dispatch({
            type:APLICACION_ACTUAL,
            payload:aplicacionId
        })
    }

    //eliminar aplicacion
    const eliminarAplicacion = async aplicacionId =>{

        try {
            await clientAxios.delete(`/api/apps/${aplicacionId}`);
            dispatch({
                type:ELIMINAR_APLICACION,
                payload: aplicacionId
            })
            
        } catch (error) {
            console.log(error);
        }
        
    }

    return(
        <aplicacionContext.Provider
            value={{
                aplicaciones: state.aplicaciones,
                formulario : state.formulario,
                errorformulario:state.errorformulario,
                aplicacion:state.aplicacion,
                mostrarFormulario,
                obtenerAplicaciones,
                agregarAplicacion,
                mostrarError,
                aplicacionActual,
                eliminarAplicacion,
                getuserApps
            }}
        >
            {props.children}
        </aplicacionContext.Provider>
    )

}

export default AplicacionState;