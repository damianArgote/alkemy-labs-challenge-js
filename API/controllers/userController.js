const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.signUp = async (req,res) =>{
    //revisar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }
    
    try {
        //extraer datos
        const {role,username,email,password} = req.body;
        //verificar si existe el usuario
        let user = await User.findOne({where: {email}});

        if(user){
            return res.status(400).json({msg:'El usuario ya existe'});
        }
        
        const newUser = await User.create({role,username,email,password});

        //crear y firmar jwt
        const payload = {
            user:{
                id:newUser.id
            }
        };

        jwt.sign(payload,'secreto',{
            expiresIn:3600 //1hora
        }, (error,token) =>{
            if(error) throw error;

            res.json({token});
        });


    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Hubo un error'});
    }
}
//autenticar usuario
exports.authenticate = async (req,res,next) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }
    
    try {
        const {email,password} = req.body;
        //buscar usuario
        const user = await User.findOne({where: {email}});

        if(!user){
            return res.status(401).json({msg:'El usuario no existe'});
            
            
        }
        //revisar password
        if(!user.checkPassword(password)){
            return res.status(401).json({msg:'Password incorrecto'});
        
        }
         //Si todo es correcto
        //Crear y firmar JWT
        const payload = {
            user:{
                id:user.id
            }
        };

        jwt.sign(payload,'secreto',{
            expiresIn:3600 //1hora
        }, (error,token) =>{
            if(error) throw error;

            res.json({token});
        });
 
    } catch (error) {
        console.log(error);
        next();
    }
}

//obtiene que usuario esta autenticado
exports.getUser =  async (req,res,next) =>{
    
    try {
        const user = await User.findByPk(req.user.id);
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
 

}