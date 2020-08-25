const User = require('../models/User');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authUser = async (req,res) =>{
    //revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()});
    }

    //extraer email y password
    const {email,password} =req.body;

    try {
        //revisar que sea un usuario registrado
        let user = await User.findOne({where: {email}});
        if(!user){
            return res.status(400).json({msg:'El usuario no existe'});
        }
        //revisar password
        if(!user.checkPassword(password)){
            return res.status(400).json({msg:'Password incorrecto'});
        }

        //Si todo es correcto
        //Crear y firmar JWT
        const payload = {
            user:{
                id: user.id
            }
        };

        //firmar el token
        jwt.sign(payload, 'secreto',{
            expiresIn: 3600// 1hora
        }, (error,token) =>{
            if(error) throw error;
            //mensaje de confirmacion
            res.json({token});

        });

    } catch (error) {
        console.log(error);
    }
}


exports.userAuth = async (req,res) =>{
    try {
        const user = await User.findByPk(req.user.id);
        res.json({user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}