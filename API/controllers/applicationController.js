const Application = require('../models/Application');

const multer = require('multer');
const shortid = require('shortid');

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
exports.addApp = async (req,res,next) =>{
  try {
    const image = req.file.filename;
    const {category,name,price} = req.body;
    await Application.create({category,name,price,image});
    res.json({mensaje:'Se agrego nueva app'})
  } catch (error) {
    console.log(error);
    next();
  }
}


exports.getApps = async (req,res,next) =>{
  try {
    const apps = await Application.findAll({});
    res.json(apps);
  } catch (error) {
    console.log(error);
    next();
  }
}

exports.updateApp = async (req,res,next) =>{
  try {
    const image = req.file.filename;
    const {price} = req.body;

    await Application.update(
      {price,image},
      {where: {id: req.params.idApp}}
    );
    res.json({mensaje:'Aplicacion actualizada'})
  } catch (error) {
    console.log(error);
    next();
  }
}

exports.deleteApp = async (req,res,next) =>{
  try {
    await Application.destroy(
      {where: {id:req.params.idApp}}
    );
    
    res.json({mensaje:'Aplicacion eliminada'});

  } catch (error) {
    console.log(error);
    next();
  }
}