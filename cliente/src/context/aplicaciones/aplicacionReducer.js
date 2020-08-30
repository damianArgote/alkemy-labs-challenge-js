import {
    FORMULARIO_APLICACION,
    OBTENER_APLICACIONES,
    AGREGAR_APLICACION,
    VALIDAR_FORMULARIO,
    APLICACION_ACTUAL,
    ELIMINAR_APLICACION,
    USUARIO_APLICACIONES
} from '../../types';

export default (state,action) =>{
    switch(action.type){

        case FORMULARIO_APLICACION:
            return{
                ...state,
                formulario:true
            }
        
        case USUARIO_APLICACIONES:
        case OBTENER_APLICACIONES:
            return{
                ...state,
                aplicaciones:action.payload
            }

        case AGREGAR_APLICACION:
            return{
                ...state,
                aplicaciones: [...state.aplicaciones, action.payload]
            }

        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario:true

            }

        case APLICACION_ACTUAL:
            return{
                ...state,
                aplicacion: state.aplicaciones.filter(aplicacion => aplicacion.id === action.payload)
            }

        case ELIMINAR_APLICACION:
            return{
                ...state,
                aplicaciones: state.aplicaciones.filter(aplicacion => aplicacion.id !== action.payload),
                aplicacion:null
            }

        default:
            return state;
    }
}