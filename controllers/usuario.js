const Usuario = require('../models/Usuario');
const generarJWT = require ('../helpers/generar-jwt');

let  crearUsuario = async (req, res, next) => {
    let {body} = req;
    try {
        //Busca el campo de teléfono en BD
        const existeTelefono = await Usuario.findOne({
            where : {
                Usr_Phone : body.Usr_Phone
            }
        });
        //Verifica que no exista un teléfono en la BD
        if(existeTelefono){ 
            return res.status(400).json({
                error: {
                    msg : 'Ya existe un usuario con este telefono',
                    campo : body.Usr_Phone
                }
            });
        }
        //Busca el campo de Email en BD
        const existeEmail = await Usuario.findOne({
            where : {
                Usr_Email : body.Usr_Email
            }
        });
        //Verifica que no exista un email en la BD
        if(existeEmail){ 
            return res.status(400).json({
                error:{
                    msg:'Ya existe un usuario con este correo',
                    campo: body.Usr_Email
                }
            });
        }
        //Guarda el usuario
        const usuario = new Usuario(body);
        await usuario.save();
        //Generar token
        const token = await generarJWT(usuario.dataValues.Usr_ID);
        //Se envían los datos al usuario
        res.status(201).send({usuario, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : {
                msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor'
            }
        });
    }
}

//Login
let iniciarSesion = async (req, res, next) => {
    const {Usr_Email} = req.body;
    if (!Usr_Email) {
        return res.status(422).json({
            error : {
                msg : "El campo de correo no puede estar vacío"
            }
        });
    }
    try {
        //Verifica usuario
        const usuario = await Usuario.findOne({where:{Usr_Email}});
        if (!usuario){
            return res.status(400).json({
                error : {
                    msg : "Usuario o contraseña incorrectos"
                }
            });
        }
        //Genera token
        const token = await generarJWT(usuario.dataValues.Usr_ID);
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
    iniciarSesion,
    crearUsuario
}