import {
    OBTENER_APLICACIONES

} from '../../types';

export default (state,action) =>{
    switch(action.type){


        case OBTENER_APLICACIONES:
            return{
                ...state,
                aplicaciones:action.payload
            }
        default:
            return state;
    }
}