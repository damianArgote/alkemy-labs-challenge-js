const express = require('express');
const routes = require('./routes');

//crea conexion a database
const db = require('./config/database');
//importo modelos para generar las tablas automaticamente
require('./models/Application');
db.sync()
.then(() => console.log('DB Conectado'))
.catch(error => console.log(error));




const app = express();
//habilitar routing
app.use('/',routes());


app.listen(5000, () =>{
  console.log('Servidor funcionando en el puerto 5000');
})

