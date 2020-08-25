const User = require('../models/User');
const {validationResult} =require('express-validator');
const jwt = require('jsonwebtoken')

exports.signUp = async (req,res) =>{

    //revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()});
    }
    
    try {
        //extraer datos
        const {role,email,username,password} = req.body;
        //revisar el usuario si ya esta registrado
        let user = await User.findOne({where: {email}});
        if(user){
           return res.status(400).json({msg:'El usuario ya existe'}); 
        }
        //Si no existe crearlo
        const newUser = await User.create({role,email,username,password});

        //Crear y firmar JWT
        const payload = {
            user:{
                id: newUser.id
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
        res.status(400).send('Hubo un error');
    }
}