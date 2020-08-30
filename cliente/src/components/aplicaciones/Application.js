import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

const Application = ({aplicacion}) => {

  //eliminar aplicacion
  const deleteApp = id =>{
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Una Aplicacion eliminada no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        //eliminar con axios
        clientAxios.delete(`/api/apps/${id}`)
          .then(res =>{
            if(res.status === 200){
              Swal.fire(
                'Eliminado!',
                res.data.mensaje,
                'success'
              )
            }
          })
      }
    })
  }
  const {id,category,name,price,image} = aplicacion;


  return (
    <Fragment>
      <div className="entrada">
        
        {aplicacion.image ? (
          <img src={`http://localhost:5000/${image}`}/>
        ) : null }

        <div className="contenido">
          <h3>{category}</h3>
          <h3>{name}</h3>

          <p>Precio: <span>${price}</span></p>
          <Link to={`/apps/edit/${id}`} className="boton">Editar</Link>
          <Link to="#" className="boton">Comprar</Link>
          <Link to={`/apps/${id}`} className="boton">Detalles</Link>
          <button
            className="boton"
            onClick={() => deleteApp(id)}
          >
            Eliminar
          </button>

        </div>
        
      </div>

  
    </Fragment>
  );
};

export default Application;
