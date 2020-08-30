const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    //leer el token del header
    const token = req.header('x-auth-token');

    //validar
    if(!token){
        return res.status(401).json({mensaje:'No hay token,permiso no valido'});
    }

    try {
        const cifrado = jwt.verify(token,'secreto');
        req.user = cifrado.user;
        next();
    } catch (error) {
        res.status(401).json({mensaje:'Token no valido'});
    }
    
}