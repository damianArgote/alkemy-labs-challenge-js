import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Signup = (props) => {

        //extraer los valores del context
        const alertaContext = useContext(AlertaContext);
        const { alerta, mostrarAlerta} = alertaContext;

        const authContext = useContext(AuthContext);
        const {mensaje, autenticado, signUpUser} = authContext;


        useEffect(() =>{

            if(autenticado){
                props.history.push('/me/apps');
            }

            if(mensaje){
                mostrarAlerta(mensaje.msg);
            }

        },[mensaje, autenticado, props.history])


        //State para iniciar session
        const [user, setUser] = useState({
            role:'',
            username:'',
            email: '',
            password:'',
            confirm:''
        });
    
        //extraer
        const {role,username,email, password,confirm} = user;
    
        const onChange = e =>{
    
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
    
        }
    
        //iniciar session
        const onSubmit = e =>{
            e.preventDefault();
    
            //validar que no haya campos vacios
            if(role === '' || username.trim() ==='' || 
                email.trim()==='' || password.trim()==='' || confirm.trim() ===''){
                    mostrarAlerta('Todos los campos son obligatorios');
                    return;
                }

            //Password minimo 6 caracteres
            if(password.length < 6 ){
                mostrarAlerta('El password debe tener minimo 6 caracteres');
                return;
            }

            //Los 2 password iguales
            if(password !== confirm){
                mostrarAlerta('Los password no son iguales');
                return;
            }
    
    
            //pasarlo al action
            signUpUser({
                role,
                username,
                email,
                password
            });
        }
    
    
        return ( 
            <div>
                {alerta? <div>{alerta.msg}</div>  : null}
                <div>
                    <h1>Obtener una Cuenta</h1>
                </div>
    
                <form
                    onSubmit={onSubmit}
                >   
                    <div>
                        <select name="role"
                            onChange={onChange}
                        >
                            <option value="" selected>-Seleccionar-</option> 
                            <option value="Desarrollador" >Desarrollador</option>
                            <option value="Cliente">Cliente</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
            
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm">Repetir Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Repetir Password"
                            value={confirm}
                            onChange={onChange}
                        />
                    </div>
    
                    <div>
                        <input
                            type="submit"
                            value="Registrarse"
                        />
                    </div>
                </form>
    
                <Link to={'/'}>
                    Volver a Login
                </Link>
            </div>
         );
}
 
export default Signup;