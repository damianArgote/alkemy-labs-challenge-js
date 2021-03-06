const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');

//crea conexion a database
const db = require('./config/database');
//importo modelos para generar las tablas automaticamente
require('./models/Application');
require('./models/User');
db.sync()
.then(() => console.log('DB Conectado'))
.catch(error => console.log(error));

const app = express();

//habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended:true}));

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//habilitar routing
app.use('/api',routes());

//archivos publicos
app.use(express.static('uploads'));

app.listen(5000, () =>{
  console.log('Servidor funcionando en el puerto 5000');
})

