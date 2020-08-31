import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";
import clientAxios from "../../config/axios";
import { withRouter } from "react-router-dom";

const EditApp = (props) => {
  //obtener id
  const { id } = props.match.params;

  //state
  const [app, setApp] = useState({
    price: "",
    image: "",
  });

  const [file, setFile] = useState("");

  useEffect(() => {
    //consultar a la api
    const getAPI = async () => {
      const respApp = await clientAxios.get(`/api/apps/${id}`);
      console.log(respApp.data.app);
      setApp(respApp.data.app);
    };

    getAPI();
  }, []);

  //editar una aplicacion
  const editApp = async (e) => {
    e.preventDefault();

    //crear un formdata
    const formData = new FormData();
    formData.append("price", app.price);
    formData.append("image", file);

    try {
      const resp = await clientAxios.put(`/api/apps/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //alerta
      if (resp.status === 200) {
        Swal.fire("Editado correctamente", resp.data.mensaje, "success");
      }

      //redireccionar
      props.history.push("/me/apps");
    } catch (error) {
      console.log(error);
      //alerta
      Swal.fire({
        type: "error",
        title: "Hubo un error",
        text: "Vuelve a intentarlo",
      });
    }

    //redireccionar
    props.history.push("/me/apps");
  };

  //leer datos
  const infoApp = (e) => {
    if (e.target.value !== "") {
      e.target.nextElementSibling.classList.add("valido");
    } else {
      e.target.nextElementSibling.classList.remove("valido");
    }
    setApp({
      ...app,
      [e.target.name]: e.target.value,
    });
  };

  //colocar imagen en state
  const readFile = (e) => {
    setFile(e.target.files[0]);
  };

  //extraer valores del state
  const { price, image } = app;

  return (
    <Fragment>
      <main className="formulario-login contenedor">
        <h2>Editar Aplicacion</h2>

        <form onSubmit={editApp}>
          <div className="campo">
            <input
              type="number"
              name="price"
              min="0.00"
              step="0.10"
              onChange={infoApp}
              defaultValue={price}
            />
            <label className="valido" htmlFor="price">
              Precio
            </label>
          </div>

          <div className="campo">
            {image ? (
              <img
                src={`http://localhost:5000/${image}`}
                alt="image"
                width="300"
              />
            ) : null}
            <input type="file" name="image" onChange={readFile} />
          </div>

          <div className="submit">
            <input type="submit" value="Editar" />
          </div>
        </form>
      </main>
    </Fragment>
  );
};

export default withRouter(EditApp);
