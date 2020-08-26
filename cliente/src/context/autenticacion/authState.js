import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USER,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';


const AuthState = props =>{

    const initialState = {
        token:localStorage.getItem('token'),
        autenticado:null,
        user:null,
        mensaje:null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signUpUser = async data =>{
        try {
            const resp = await clienteAxios.post('/api/users',data);
            console.log(resp.data);

            dispatch({
                type:REGISTRO_EXITOSO,
                payload: resp.data
            })

            //obtener usuario
            userAuth();

        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg:error.response.data.msg
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }


    //retornar usuario autenticado
    const userAuth = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

        try {
            const resp = await clienteAxios.get('/api/auth');
            //console.log(resp);
            dispatch({
                type:OBTENER_USER,
                payload:resp.data.user
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //cuando se inicia sesion
    const login = async data =>{
        try {
            const resp = await clienteAxios.post('/api/auth',data);
            dispatch({
                type:LOGIN_EXITOSO,
                payload:resp.data
            });
            //obtener usuario
            userAuth();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg:error.response.data.msg
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
           
        }
    }

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
                signUpUser,
                login,
                userAuth,
                logout
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}

export default AuthState;