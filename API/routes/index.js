const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//controllers
const applicationController = require('../controllers/applicationController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const {check} = require('express-validator');

module.exports = function(){
  /**CRUD Aplicaciones */

  /**Usuarios */
  router.post('/users/',
    [
      check('role','El rol es obligatorio').not().isEmpty(),
      check('email','Agrega un email valido').isEmail(),
      check('username','El nombre de usuario es obligatorio').not().isEmpty(),
      check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
    ],
    userController.signUp);

  //rutas para autenticar usuarios
  router.post('/auth/',
  [
    check('email','Ingresa un email valido').isEmail(),
    check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
  ],
  authController.authUser
  ); 
  
  router.get('/auth/',
    auth,
    authController.userAuth
  );

  return router;
}