const { query } = require("express");

let obtenerHosting = (req, res, next) => {
    //TODO
    //Opción para obtener ID desde el token y el host desde la URL
    let id = req.params.id;
    let host = req.query.h;
    //Verifica que el ID del usuario y del host vengan en la petición
    if(!id || !host) {
        return res.status(400).json({
            error : {
                msg : 'El ID del usuario y del host son necesarios'
            }
        });
    }
    try {
        //Busca el host del usuario
        const hosting = await Host.findOne({
            where : {
                id_usuario : id,
                id_host : host
            }
        });
        //Verifica que el usuario tenga el host registrado
        if(!hosting){
            return res.status(404).json({
                error : {
                    msg : `Este usuario no tiene el host ${host} registrado`
                }
            });
        }
        //Regresar host
        res.status(200).json({
            hosting
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

let obtenerHostings = (req, res, next) => {
    //TODO
    //Opción para obtener ID desde el token
    let id = req.query.id;
    let host = req.query.h;
    //Verificar que el ID del usuario y del host vengan en la petición
    if(!id || !host) {
        return res.status(400).json({
            error : {
                msg : 'El ID del usuario y del host son necesarios'
            }
        });
    }
    try {
        //Busca hosts en la BD
        const hosting = await Host.findAll({
            where : {
                id_usuario : id,
                id_host : host
            }
        });
        //Regrsar dominios
        res.status(200).json({
            hosting
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : {
                msg : 'Error del sistema, intenta de nuevo más tarde o comuníquese con un asesor'
            }
        });
    }
}

let crearHosting = (req, res, next) => {
    let body = req.body;
    //TODO
    //Verificar datos
    //Cobrar al usuario
    //Crear instancia en AWS
    //Regresar datos al usuario
    res.status(201).json({
        msg : `Post, crear uno`,
        obj : body
    });
}

let modificarHosting = (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    //TODO
    //Verificar datos
    //Cobrar al usuario
    //Editar instancia en AWS
    //Regresar datos al usuario
    res.status(200).json({
        msg: `Put, Modificar uno`,
        obj : body,
        id
    });
}

let eliminarHosting = (req, res, next) => {
    let id = req.params.id;
    //TODO
    //Verificar datos
    //Eliminar instancia en AWS
    //Regresar datos al usuario
    res.status(200).json({
        msg : `Delete, Eliminar uno`,
        id
    });
}

module.exports = {
    obtenerHosting,
    obtenerHostings,
    crearHosting,
    modificarHosting,
    eliminarHosting
}