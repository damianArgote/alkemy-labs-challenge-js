const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
//controllers
const applicationController = require('../controllers/applicationController');
const userController = require('../controllers/userController');

//middleware para proteger rutas
const auth = require('../middleware/auth');

module.exports = function(){
  /**CRUD Aplicaciones */
  router.get('/apps',applicationController.getAll);

  router.get('/me/apps', 
    auth,
    applicationController.getUserApp
  );
  router.post('/apps',
    auth,
    applicationController.loadFile,
    applicationController.addApp);

  router.put('/apps/:idApp', 
    auth,
    applicationController.loadFile,
    applicationController.editApp);
    
  router.delete('/apps/:idApp', 
    applicationController.deleteApp);

  /**Usuarios */
  //registrar usuarios
  router.post('/users/register',
    [
      check('role','Elige un tipo de usuario').not().isEmpty(),
      check('username','El nombre de usuario es obligatorios').not().isEmpty(),
      check('email','Agrega un email valido').isEmail()
    ],
    userController.signUp);
  //Iniciar sesion
  router.post('/users/login', 
  userController.authenticate);

  //obtener usuario autenticado
  router.get('/users',
    auth,
    userController.getUser
  );
  


  return router;
}