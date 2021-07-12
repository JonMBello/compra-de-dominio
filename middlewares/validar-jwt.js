const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('RF-token');
    if(!token){
        return res.status(401).json({
            error : {
                msg: "Falta el token en la petición"
            }
        });
    }
    try {
        const { Usr_ID, Usr_Email } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // req.Usr_ID = Usr_ID;
        // req.Usr_Email = Usr_Email;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error : {
                msg : 'Token no válido'
            }
        });
    }
}

module.exports = {
    validarJWT
}