const axios = require('axios');
const mercadopago = require('mercadopago');
const Dominio = require('../models/Dominio');

let obtenerDominio = async (req, res, next) => {
    //Obtener el id del token
    let Usr_ID = req.usuario.Usr_ID;
    let Dom_Name = req.params.id;
    let dominio;
    try {
        //Busca el dominio del usuario
        dominio = await Dominio.findOne({
            where: {
                Usr_ID,
                Dom_Name
            }
        });
        //Verifica que el usuario tenga el dominio registrado
        if(!dominio){ 
            return res.status(404).json({
                error: {
                    msg : `Este usuario no tiene el dominio ${Dom_Name} registrado`
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error : {
                msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor',
                step : 'Database search'
            }
        });
    }
    //Busca el dominio en GoDaddy
    let response;
    try {
        response = await axios ({
            method : 'get',
            url : `${process.env.URL}/v1/domains/${Dom_Name}`,
            headers : {
                'Authorization' : process.env.Auth
            }
        });
        console.log(response.status);
    } catch (error) {
        console.log(error.response.status);
        return res.status(error.response.status).json({
            error : error.response.data,
            step : 'GoDaddy search'
        });
    }
    let data = {};
    let modificado = false;
    if(dominio.Dom_Status != response.data.status) {
        data.Dom_Status = response.data.status;
        modificado = true;
    }
    if(dominio.Dom_Expires != response.data.expires) {
        data.Dom_Expires = response.data.expires;
        modificado = true;
    }
    if(dominio.Dom_RenewDeadline != response.data.renewDeadline) {
        data.Dom_RenewDeadline = response.data.renewDeadline;
        modificado = true;
    }
    if(dominio.Dom_TransferAwayEligibleAt != response.data.transferAwayEligibleAt) {
        data.Dom_TransferAwayEligibleAt = response.data.transferAwayEligibleAt;
        modificado = true;
    }
    //Verifica si hay cambios de la BD de GD con la de RF
    if(modificado) {
        //Guardar cambios de GoDaddy en BD
        try {
            console.log('Actualizando BD');
            await dominio.update(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error : {
                    msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor',
                    step : 'Database update'
                }
            });
        }
    }
    //Regresar datos al usuario
    return res.status(200).json({
        dominio
    });
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

let crearPedido = async (req, res, next) => {
    let { gd, mp } = req.body;
    //Verificar datos GoDaddy
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
    //Crear pedido
    let preference = {
        items : [{
            title : mp.title,
            unit_price : Number(mp.price),
            quantity : Number(mp.quantity)
        }],
        back_urls : {
            "success" : mp.pageSuccess,
            "failure" : mp.pageFailure,
            "pending" : mp.PagePending
        },
        auto_return : 'approved'
    }
    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({id :response.body.id})
        })
        .catch(function (error) {
            console.log(error);
            return res.status(500).json({
                error,
                step : 'Create MercadoPago preference'
            });
        });

}

let registrarDominio = async (req, res, next) => {
    //TODO
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
        //TODO
        //Apuntar registros DNS a servidor de AWS
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
    crearPedido,
    registrarDominio,
    modificarDominio,
    renovarDominio,
    eliminarDominio
}