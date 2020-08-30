import React,{useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION

} from '../../types';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = props =>{

    const initialState = {
        token:localStorage.getItem('token'),
        autenticado:null,
        user:null,
        mensaje:null,
        cargando:true
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState);

    const register = async datos =>{
        try {

            const resp = await clientAxios.post('/api/users/register',datos);
            //console.log(resp.data);

            dispatch({
                type:REGISTRO_EXITOSO,
                payload:resp.data
            });

            //obtener usuario
            userAutenticado();
            
        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg:error.response.data.msg,
                categoria:'alerta-error'
            }
            dispatch({
                type:REGISTRO_ERROR,
                payload:alerta
            })
        }
    }

    
    //cuando el usuario inicia sesion
    const login = async datos =>{
        try {

            const resp = await clientAxios.post('/api/users/login',datos);
            dispatch({
                type:LOGIN_EXITOSO,
                payload:resp.data
            });

            userAutenticado();

            
        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg:error.response.data.msg,
                categoria:'alerta-error'
            }

            dispatch({
                type:LOGIN_ERROR,
                payload:alerta
            })
        }
    }

    //retorna el usuario autenticado
    const userAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);

        }

        try {
            const resp = await clientAxios.get('/api/users');
            //console.log(resp.data);
            dispatch({
                type:OBTENER_USUARIO,
                payload:resp.data.user
            })
        } catch (error) {
            
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    //cerrar sision
    const logout = () =>{
        dispatch({
            type:CERRAR_SESION
        })
    }


    return(
        <AuthContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                user:state.user,
                mensaje:state.mensaje,
                cargando:state.cargando,
                register,
                login,
                userAutenticado,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;