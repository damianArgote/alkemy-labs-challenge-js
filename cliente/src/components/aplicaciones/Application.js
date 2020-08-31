import React, { Fragment,useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import AuthContext from "../../context/autenticacion/authContext";


const Application = ({app}) => {

  const authContext = useContext(AuthContext);
  const { autenticado,user } = authContext;

  const {id,category,name,price,image} = app;

  

  //eliminar aplicacion
  const deleteApp = id =>{
    console.log(id);
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
                res.data.msg,
                'success'
              )
            }
          })
      }
    })
  }

  //Agregar aplicacion al carrito
  /*
  const selecionarApp = id =>{

    const app = apps.filter(app => app.id === id);
    localStorage.setItem('aplicacion', JSON.stringify(app))
    agregarCarrito([
      ...carrito,
      ...app
    ]);
  }
  */

  return (

    
    <Fragment>
      <div className="entrada">
        
        {app.image ? (
          <img src={`http://localhost:5000/${image}`}/>
        ) : null }

        <div className="contenido">
          <h3>{category}</h3>
          <h3>{name}</h3>

          <p>Precio: <span>${price}</span></p>

          {autenticado && user.role === 'Desarrollador' ? (
            
            <Link to={`/apps/edit/${id}`} className="boton">Editar</Link>
              
          ) : null}

          { autenticado && user.role === 'Cliente' ?

          ( 
          
          <button
            className="boton"
            onClick={() => selecionarApp(id)}
          >Comprar</button>
          
          ) 
          
          : null}

          <Link to={`/apps/detail/${id}`} className="boton">Detalles</Link>

          {autenticado && user.role === 'Desarrollador' && user.id === app.userId ? (
            <button
            className="boton"
            onClick={() => deleteApp(id)}
          >
            Eliminar
          </button>
          ) : null}
          

        </div>
        
      </div>

  
    </Fragment>
  );
};

export default Application;
