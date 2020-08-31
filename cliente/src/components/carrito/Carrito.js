import React,{Fragment} from 'react';
const Carrito = ({carrito,agregarCarrito}) => {


    const eliminarDelCarrito = (id) =>{
        const aplicaciones = carrito.filter(app => app.id !==id);
        agregarCarrito(aplicaciones);
    }


    return ( 
        <Fragment>
            <h1>Carrito</h1>
            <ul>
            {carrito.map(aplicacion =>(

                <li>
                    <p>{aplicacion.name}</p>
                    <button
                        onClick={() => eliminarDelCarrito(aplicacion.id)}
                    >Eliminar</button>
                </li>

            ))}
            </ul>
            
        </Fragment>
     );
}
 
export default Carrito;