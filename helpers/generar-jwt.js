const jwt = require('jsonwebtoken');

const generarJWT = (uid, mail) =>{
    return new Promise( (resolve, reject) =>{
        const payload = {uid, mail};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '30d'
        }, (err, token)=>{
            if(err) {
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = generarJWT;