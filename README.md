# alkemy-labs-challenge-js
Crear una aplicación web similar a Google Play Store,donde los usuarios puedan ver un listado de Apps, información adicional de una app individual y un carrito y/o lista de deseos donde sea posible agregarlas.

# Requisitos
* Tener instalado MySQL y crear una base de datos con nombre 'playstore'.
* Tener instaldo Nodejs en su version estable (https://nodejs.org/es/).

# Instalacion
* Clonar el repositorio.
* Instalar dependencias dentro de la carpeta API 
    ```
    alkemy-labs-challenge-js/API $npm install
    ```
* Instalar dependenciap dentro de la carpeta cliente

    ```
    alkemy-labs-challenge-js/cliente $npm install
    ```
# Configuracion para conectarser a la base de datos
Ir a la carpeta API/config y colocar sus datos de conexion

```javascript
const Sequelize = require('sequelize');

module.exports = new Sequelize('playstore',USER,PASSWORD,{
    host:'localhost',
    dialect:'mysql',
    define:{
        timestamps:false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorAliases:false
});
```

## Nota:
Hasta el momento se puede crear usuarios,loguearse, mantener la sesion y obtener informacion del usuario por medio. 
Si el usuario es Desarrollador puede publicar aplicaciones y solo puede eliminar y editar las suyas.
Los usuarios clientes solo pueden ver el detalle de las aplicaciones.

Lo que falta implementar es que los cliente puedan crear su lista de diseño. En un futuro proximo se implementara.




