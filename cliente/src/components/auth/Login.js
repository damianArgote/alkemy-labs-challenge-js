import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {

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


        //pasarlo al action
    }


    return ( 
        <div>
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