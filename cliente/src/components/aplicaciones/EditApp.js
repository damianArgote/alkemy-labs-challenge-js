import React, {Fragment,useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';

const EditApp = (props) => {

    //obtener id
    const {id} = props.match.params;

    //state
    const [app, setApp] = useState({
        category:'',
        name:'',
        price:'',
        image:''    
    })

    const [file,setFile] = useState('');

    //consultar a la api
    const getAPI = async () =>{
        const respApp = await clientAxios.get(`/api/apps/${id}`);
        setApp(respApp.data);
    }

    useEffect(() =>{
        getAPI();
    },[])


    //editar una aplicacion
    const editApp = async e =>{
        e.preventDefault();

        //crear un formdata
        const formData = new FormData();

        formData.append('category', app.category);
        formData.append('name', app.name);
        formData.append('price',app.price);
        formData.append('image',file);

        try {
            
            const resp = await clientAxios.put(`/api/apps/${id}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            //alerta
            if(resp.status === 200){
                Swal.fire(
                    'Editado correctamente',
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

    //extraer valores del state
    const {category,name,price,image} = app;




    return ( 
        <Fragment>
            <h2>Editar Aplicacion</h2>

            <form
                onSubmit={editApp}
            >   
                <div>
                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        name="price"
                        min="0.00"
                        step="0.10"
                        placeholder="Precio en USD"
                        onChange={infoApp}
                        defaultValue={price}
                    />
                </div>

                <div>
                    <label htmlFor="image">Subir Imagen:</label>
                    {image ? (
                        <img src={`http://localhost:5000/${image}`} alt="image" width="300"/>
                    ) : null }
                    <input
                        type="file"
                        name="image"
                        onChange={readFile}
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value="Editar"
                    />
                </div>


            </form>
        </Fragment>
     );
}
 
export default EditApp;