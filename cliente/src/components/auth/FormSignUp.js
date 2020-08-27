import React,{Fragment} from 'react';

const FormSignUp = () => {
    return ( 
        <Fragment>
            <div>Crea tu cuenta en PlayStore</div>

            <form
                method="POST"
            >
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Tu Username"
                    />
                </div>

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
                    <label htmlFor="confirm">Repetir Password</label>
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Confirma tu Password"
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value="Registrarse"
                    />
                </div>


            </form>
        </Fragment>
     );
}
 
export default FormSignUp;