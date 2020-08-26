import React, {useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, login} = authContext;

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
        email: '',
        password:''
    });

    //extraer
    const {email, password} = user;

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
        if(email.trim()==='' || password.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        //pasarlo al action
        login({email,password});
    }


    return ( 
        <div>
            {alerta? <div>{alerta.msg}</div>  : null}
            <div>
                <h1>Iniciar Sesion</h1>
            </div>

            <form
                onSubmit={onSubmit}
            >
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
                    <input
                        type="submit"
                        value="Iniciar Sesion"
                    />
                </div>
            </form>

            <Link to={'/signup'}>
                Registrarse
            </Link>
        </div>
     );
}
 
export default Login;