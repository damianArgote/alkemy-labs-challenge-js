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
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                autenticado:true,
                mensaje:null
            }

        case OBTENER_USER:
            return{
                ...state,
                user: action.payload
            }

        case LOGIN_ERROR:
        
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                toke:null,
                mensaje:action.payload
            }


        default:
            return state;
    }
}