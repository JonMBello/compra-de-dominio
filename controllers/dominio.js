const axios = require('axios');
const Dominio = require('../models/Dominio');

let obtenerDominio = async (req, res, next) => {
    //Obtener el id del token
    let Usr_ID = req.usuario.Usr_ID;
    let Dom_ID = req.id;
    try {
        //Busca el dominio del usuario
        const dominio = await Dominio.findOne({
            where: {
                Usr_ID,
                Dom_ID
            }
        });
        //Verifica que el usuario tenga el dominio registrado
        if(!dominio){ 
            return res.status(404).json({
                error: {
                    msg : `Este usuario no tiene el dominio ${domain} registrado`
                }
            });
        }
        //Regresar dominio
        res.status(200).json({
            dominio
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

let obtenerDominios = async (req, res, next) => {
    //Obtener el id del token
    let Usr_ID = req.usuario.Usr_ID;
    try {
        //Busca dominios en la BD
        const dominios = await Dominio.findAll({
            attributes: ['Dom_ID', 'Usr_ID', 'Dom_Name'],
            where: {
                Usr_ID
            }
        });
        //Regresar dominios
        res.status(200).json({
            dominios
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

let registrarDominio = async (req, res, next) => {
    //Obtener el id del token
    let Usr_ID = req.usuario.Usr_ID;
    let { gd, mp } = req.body;
    //Verificar datos
    try {
        const response = await axios ({
            method : 'post',
            url : `${process.env.URL}/v1/domains/purchase/validate`,
            data : gd,
            headers : {
                'Authorization' : process.env.Auth
            }
        });
        console.log(response.status);
    } catch (error) {
        console.log(error.response.status);
        return res.status(error.response.status).json({
            error : error.response.data,
            step : 'Verify GoDaddy data'
        });
    }
    //TODO
    //Cobrar al usuario 
    //Guardar datos de transaccion en BD
    let pago = req.body.pago;
    if(pago){
        //Enviar petición de compra a GoDaddy
        try {
            const response = await axios ({
                method : 'post',
                url : `${process.env.URL}/v1/domains/purchase`,
                data : gd,
                headers : {
                    'Authorization' : process.env.Auth
                }
            });
            console.log(response.status);
        } catch (error) {
            console.log(error.response.status);
            return res.status(error.response.status).json({
                error : error.response.data,
                step : 'Register domain'
            });
        }
        //Guardar datos de dominio en BD
        let dmn = {
            Usr_ID,
            Dom_Name : gd.domain
        }
        try {
            const dominio = new Dominio(dmn);
            await dominio.save();
            //Regresar datos al usuario
            return res.status(200).json({
                dominio
            });
        } catch (error) {
            //Regresar datos de error al usuario
            console.log(error)
            return res.status(500).json({
                error : {
                    msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor'
                },
                step : 'Register domain in database'
            });
        }
    } else {
        return res.status(400).json({
            error : {
                msg : 'No se pudo procesar el pago, intente de nuevo más tarde o comuníquese con un asesor'
            }
        });
    }
}

let modificarDominio = async (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    //TODO
    //Verificar datos
    //Enviar petición a GoDaddy
    //Evaluar respuesta
    //Sí
        //Guardar cambios en la BD
        //Cobrar al usuario en caso de ser necesario
        //Regresar datos al usuario
        res.status(200).json({
            msg: `Put, Modificar uno`,
            obj : body,
            id
        });
    //No
        //Guardar datos en BD en caso de ser necesario
        //Regresar datos de error al usuario
        res.status(500).json({
            error : {
                msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor'
            }
        });
}

let renovarDominio = async (req, res, next) => {}

let eliminarDominio = async (req, res, next) => {
    let id = req.params.id;
    let domain = req.query.d;
    //Verifica que el ID  y el nombre de dominio venga en la petición
    if(!id || !domain){
        return res.status(400).json({
            error : {
                msg : 'El ID del usuario y el nombre de dominio son necesarios'
            }
        });
    }
    //Enviar petición a GoDaddy
    //Evaluar respuesta
    //Sí
        //Cobrar al usuario en caso de ser necesario
        try {
            //Busca el dominio del usuario
            const dominio = await Dominio.findOne({
                where: {
                    id_cuenta : id,
                    domain
                }
            });
            //Verifica que el usuario tenga el dominio registrado
            if(!dominio){ 
                return res.status(404).json({
                    error: {
                        msg : `Este usuario no tiene el dominio ${id} registrado`
                    }
                });
            }
            //Opción de eliminar físicamente dominio
            dominio.destroy();
            //TODO
            //Opción de eliminar lógicamente dominio
            //Se envía la respuesta
            res.status(200).send(`Dominio del usuario ${id} eliminado`);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error : {
                    msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor'
                }
            });
        }   
    //No
        //Cobrar al usuario en caso de ser necesario
        //Guardar datos en BD en caso de ser necesario
        //Regresar datos de error al usuario
        res.status(500).json({
            error : {
                msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor'
            }
        });
}

module.exports = {
    obtenerDominio,
    obtenerDominios,
    registrarDominio,
    modificarDominio,
    renovarDominio,
    eliminarDominio
}