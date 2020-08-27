import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

import clientAxios from '../../config/axios';

const Application = ({app}) => {

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


  const {id,category,name,price,image} = app;

  return (
    <Fragment>
      <li>
        <h3>{category}</h3>
        <p>{name}</p>
        
        {image ? (
          <img src={`http://localhost:5000/${image}`}/>
        ) : null }

        <p>{price}</p>
        <Link to={`/apps/edit/${id}`}>Editar</Link>
        <Link to="#">Comprar</Link>
        <button
          onClick={() => deleteApp(id)}
        >
          Eliminar
        </button>
      </li>

  
    </Fragment>
  );
};

export default Application;
