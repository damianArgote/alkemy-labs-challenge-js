const express = require('express');
const router = express.Router();
//controllers
const applicationController = require('../controllers/applicationController');
const userController = require('../controllers/userController');

module.exports = function(){
  /**CRUD Aplicaciones */

  router.get('/apps', applicationController.getAll);

  router.post('/apps',
    applicationController.loadFile,
    applicationController.addApp);
  
  router.delete('/apps/:idApp', applicationController.deleteApp);

  router.get('/apps/:idApp',applicationController.getApp);

  router.put('/apps/:idApp', 
    applicationController.loadFile,
    applicationController.editApp);

  /**Usuarios */
  //registrar usuarios
  router.post('/users/register',
    userController.signUp);
  //Autenticar
  router.post('/users/login', userController.authenticate);
  //Iniciar sesion

  return router;
}