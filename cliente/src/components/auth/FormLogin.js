import React,{Fragment} from 'react';

const FormLogin = () => {
    return ( 

        <Fragment>
            <div>Inicia Sesion en PlayStore</div>

            <form
                method="POST"
            >
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Tu Email"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Tu Password"
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value="Iniciar Sesion"
                    />
                </div>


            </form>
        </Fragment>

     );
}
 
export default FormLogin;