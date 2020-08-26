import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USER,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';


export default (state,action) =>{
    switch(action.type){
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                autenticado:true,
                mensaje:null
            }

        case OBTENER_USER:
            return{
                ...state,
                autenticado:true,
                user: action.payload
            }
        
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                toke:null,
                user:null,
                autenticado:null,
                mensaje:action.payload
            }


        default:
            return state;
    }
}