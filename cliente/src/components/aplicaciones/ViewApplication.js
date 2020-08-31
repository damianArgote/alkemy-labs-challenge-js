import React, { Fragment, useState, useEffect, useContext } from "react";
import clientAxios from "../../config/axios";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../context/autenticacion/authContext";

const ViewApplication = (props) => {
  const authContext = useContext(AuthContext);
  const { autenticado, user } = authContext;

  //obtener id
  const { id } = props.match.params;

  //state
  const [app, setApp] = useState({
    category: "",
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    //consultar a la api
    const getAPI = async () => {
      const respApp = await clientAxios.get(`/api/apps/${id}`);
      console.log(respApp.data.app);
      setApp(respApp.data.app);
    };

    getAPI();
  }, []);

  //eliminar aplicacion
  const deleteApp = (id) => {
    console.log(id);
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una Aplicacion eliminada no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.value) {
        //eliminar con axios
        clientAxios.delete(`/api/apps/${id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire("Eliminado!", res.data.msg, "success");
          }
        });
      }
    });
    //redireccionar
    props.history.push("/me/apps");
  };

  const { category, name, price, image } = app;

  return (
    <Fragment>
      <main className="formulario-login contenedor">
        <div className="entrada">
          {app.image ? <img src={`http://localhost:5000/${image}`} /> : null}

          <div className="contenido">
            <h3>{category}</h3>
            <h3>{name}</h3>

            <p>
              Precio: <span>${price}</span>
            </p>

            {autenticado && user.role === 'Desarrollador' ? (
              <Link to={`/apps/edit/${id}`} className="boton">
                Editar
              </Link>
            ) : null}

            {autenticado && user.role === "Cliente" ? (
              <Link to="#" className="boton">
                Comprar
              </Link>
            ) : null}

            {autenticado ? (
              <Link to={`/me/apps`} className="boton">
                Volver
              </Link>
            ) : (
              <Link to={`/`} className="boton">
                Volver a inicio
              </Link>
            )}

            {autenticado && user.role === 'Desarrollador' ? (
              <button className="boton" onClick={() => deleteApp(id)}>
                Eliminar
              </button>
            ) : null}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default withRouter(ViewApplication);
