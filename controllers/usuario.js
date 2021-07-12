const {generarJWT} = require ('../helpers/generar-jwt');

//Login
let iniciarSesion = async (req, res, next) => {
    const {email} = req.body;
    if (!email) {
        return res.status(422).json({
            error : {
                msg : "El campo de correo no puede estar vacío"
            }
        });
    }
    try {
        //Verifica usuario
        const usuario = await Usuario.findOne({where:{email}});
        if (!usuario){
            return res.status(400).json({
                error : {
                    msg : "Usuario o contraseña incorrectos"
                }
            });
        }
        //Genera token
        const token = await generarJWT(usuario.dataValues.email);
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : {
                msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor'
            }
        });
    }
}

module.exports = {
    iniciarSesion
}