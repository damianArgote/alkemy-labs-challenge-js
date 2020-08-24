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

exports.addApp = async (req,res,next) =>{
  try {
    if(req.file.filename){
      application.image = req.file.filename
    }
    const {category,name,price} = req.body;
    const application = await Application.create(category,name,price,application.image);
    res.json({mensaje:'Se agrego nueva app'})
  } catch (error) {
    console.log(error);
    next();
  }
}