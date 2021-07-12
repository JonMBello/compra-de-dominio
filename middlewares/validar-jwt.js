const { request, response } = require('express');
const jwt = require('jsonwebtoken');
//Importar modelo

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('RF-token');
    if(!token){
        return res.status(401).json({
            error : {
                msg: "Falta el token en la petición"
            }
        });
    }
    try {
        const { Usr_ID } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findByID(Usr_ID);
        if(!usuario) {
            return res.status(404).json({
                error: {
                    msg : `No existe un usuario con este token`
                }
            });
        }
        req.usuario = usuario;
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