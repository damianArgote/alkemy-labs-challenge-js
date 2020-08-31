import React, {Fragment,useState} from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import {Link,withRouter} from 'react-router-dom';

const FormApp = (props) => {

    const [app, setApp] = useState({
        name:'',
        price:''
    });

    const {category,name,price} = app;

    const [file,setFile] = useState('');

    //guardar la aplicacion en la BD
    const publishApp = async e =>{
        e.preventDefault();
        //validar campos
       
        //crear un formdata
        const formData = new FormData();

        formData.append('category', app.category);
        formData.append('name', app.name);
        formData.append('price',app.price);
        formData.append('image',file);

        try {
            
            const resp = await clientAxios.post('/api/apps',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            //alerta
            if(resp.status === 200){
                Swal.fire(
                    'Publicado correctamente',
                    resp.data.mensaje,
                    'success'
                )
            }

            //redireccionar
            props.history.push('/me/apps');

        } catch (error) {
            console.log(error);
            //alerta
            Swal.fire({
                type:'error',
                title:'Hubo un error',
                text:'Vuelve a intentarlo'
            })
        }

    }
    
    //leer datos
    const infoApp = e =>{

        if(e.target.value !== ''){
            e.target.nextElementSibling.classList.add('valido');
          }else{
            e.target.nextElementSibling.classList.remove('valido');
          }

        setApp({
            ...app,
            [e.target.name] : e.target.value
        })

    }

    //colocar imagen en state
    const readFile = e =>{
        setFile(e.target.files[0]);
    }


    return ( 

        <Fragment>
            <main className="formulario-login contenedor">
            <h2>Publicar una Aplicacion</h2>

            

                <form
                    onSubmit={publishApp}
                >   
                <div className="campo">
                    <select
                        name="category"
                        onChange={infoApp}
                        value={category}
                    >
                        <option value="" selected>-Categoria-</option>
                        <option value="Red Social">Red Social</option>
                        <option value="Juegos">Juegos</option>
                    </select>
                    <label htmlFor="category"></label>
                </div>

                <div className="campo">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={infoApp}
                    />
                    <label htmlFor="name">Titulo</label>
                </div>

                <div className="campo">
                    <input
                        type="number"
                        name="price"
                        min="0.00"
                        step="0.10"
                        value={price}
                        onChange={infoApp}
                    />
                    <label htmlFor="price">Precio</label>
                </div>

                <div className="campo">
                    <input
                        type="file"
                        name="image"
                        onChange={readFile}
                    />
                </div>

                <div className="submit">
                    <input
                        type="submit"
                        value="Publicar"
                    />
                </div>
                </form>

            <div className="contenido-inferior">
          <p className="nuevo-usuario">
            <Link to="/me/apps">Volver</Link> 
          </p>
        </div>
            </main>
        </Fragment>

     );
}
 
export default withRouter(FormApp);