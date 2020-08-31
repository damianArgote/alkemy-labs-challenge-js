const Application = require('../models/Application');
const multer = require('multer');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');

//Configuracion de multer
const configMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
      cb(null,__dirname+'../../uploads/');
    },
    filename: (req,file,cb) =>{
      const extension = file.mimetype.split('/')[1];
      cb(null,`${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req,file,cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true);
    }else{
      cb(new Error('Formato no valido'))
    }
  }
}

//pasar la configuracion y el campo
const upload = multer(configMulter).single('image');

//Subir un archivo
exports.loadFile = (req,res,next) =>{
  upload(req,res, function(error){
    if(error){
      res.json({mensaje:error})
    }
    return next();
  })
}

//Agregar aplicacion a la BD
exports.addApp = async (req,res) =>{
  try {
    const image = req.file.filename;
    const {category,name,price} = req.body;
    
    //relacionar usuario via jwt
    const userId = req.user.id;
    
    const app = await Application.create({category,name,price,image,userId});
    res.json({app});
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

//Obtener todas las aplicaciones
exports.getAll = async (req,res) =>{
  try {
    const apps = await Application.findAll();
    res.json(apps);
  } catch (error) {
    console.log(error);
    res.status(400).send('No se pudo obtener el array');
  }
}

//obtener aplicaciones del usuario
exports.getUserApp = async (req,res) =>{
  try {
    const userApps = await Application.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.json(userApps);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.getApp = async (req,res,next) =>{
    try {
      const app = await Application.findByPk(req.params.idApp);
      res.json({app});

    } catch (error) {
      console.log(error);
      return next();
    }
}


//Editar aplicacion por id
exports.editApp = async (req,res) =>{
    
  try{
    //revisar id
    let app = await Application.findByPk(req.params.idApp);
    //verificar si la app existe
    if(!app){
      return res.status(404).json({mensaje:'Aplicacion no encontrada'});
    }

    //extraer info app
    const image = req.file.filename;
    const {price} = req.body;
    if(image === undefined){
      //verificar el usuario
      await Application.update(
        { price,
          image:app.image
        },
        {where: {id: req.params.idApp}}
      );
        res.json({mensaje:'Aplicacion actualizada'});
    }

    //verificar el usuario
    await Application.update(
      { price,
        image
      },
      {where: {id: req.params.idApp}}
    );
      res.json({mensaje:'Aplicacion actualizada'});






    
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
}
//Eliminar aplicacion por id

exports.deleteApp = async (req,res,next) =>{
  try {
    //revisar id
    let app = await Application.findByPk(req.params.idApp);
    //verificar si la app existe
    if(!app){
      return res.status(404).json({msg:'Aplicacion no encontrada'});
    }

    //verificar el usuario
    /*
    if(app.userId !== req.user.id){
      return res.status(401).json({msg:'No autorizado'});
    }
    */

    //eliminar la app
    await Application.destroy(
      {where: {id:req.params.idApp}}
    );
    
    res.json({msg:'Aplicacion eliminada'});

  } catch (error) {
    console.log(error);
    next();
  }
}