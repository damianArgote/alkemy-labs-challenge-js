import React, {Fragment,useState} from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';

const FormApp = (props) => {


    const [app, setApp] = useState({
        name:'',
        price:''
    });

    const [file,setFile] = useState('');

    //guardar la aplicacion en la BD
    const publishApp = async e =>{
        e.preventDefault();

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
            props.history.push('/');

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
            <h2>Publicar una Aplicacion</h2>

            <form
                onSubmit={publishApp}
            >   
                <div>
                    <select
                        name="category"
                        onChange={infoApp}
                    >
                        <option value="">-Categoria-</option>
                        <option value="Red Social">Red Social</option>
                        <option value="Juegos">Juegos</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="name">Titulo</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre de la aplicacion"
                        onChange={infoApp}
                    />
                </div>

                <div>
                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        name="price"
                        min="0.00"
                        step="0.10"
                        placeholder="Precio en USD"
                        onChange={infoApp}
                    />
                </div>

                <div>
                    <label htmlFor="image">Subir Imagen:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={readFile}
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value="Publicar"
                    />
                </div>


            </form>
        </Fragment>

     );
}
 
export default withRouter(FormApp);