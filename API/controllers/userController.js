const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signUp = async (req,res) =>{
    
    try {
        //extraer datos
        const {role,username,email,password} = req.body;
        //verificar si existe el usuario
        let user = await User.findOne({where: {email}});

        if(user){
            return res.status(400).json({mensaje:'El usuario ya existe'});
        }
        
        await User.create({role,username,email,password});
        
        res.json({mensaje:'Usuario registrado'});

    } catch (error) {
        console.log(error);
        res.status(400).json({mensaje:'Hubo un error'});
    }
}

exports.authenticate = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        //buscar usuario
        const user = await User.findOne({where: {email}});

        if(!user){
            await res.status(401).json({mensaje:'El usuario no existe'});
            next();
            
        }
        //revisar password
        if(!user.checkPassword(password)){
            await res.status(401).json({mensaje:'Password incorrecto'});
            next();
        }
         //Si todo es correcto
        //Crear y firmar JWT
        const payload = {
           email:user.email,
           username:user.username,
           role:user.role,
           id:user.id
        };

        const token = jwt.sign(payload, 'secreto',{
            expiresIn: 3600// 1hora
        });

        res.json({token});
 
    } catch (error) {
        console.log(error);
        next();
    }
}