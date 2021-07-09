const { query } = require("express");

let obtenerInstancia = async (req, res, next) => {
    //TODO
    //Opción para obtener ID desde el token y el host desde la URL
    let id = req.params.id;
    let host = req.query.h;
    //Verifica que el ID del usuario y de la instancia vengan en la petición
    if(!id || !host) {
        return res.status(400).json({
            error : {
                msg : 'El ID del usuario y de la instancia son necesarios'
            }
        });
    }
    try {
        //Busca la instancia del usuario
        const instancia = await Instancia.findOne({
            where : {
                Usr_ID : id,
                Ins_ID : host
            }
        });
        //Verifica que el usuario tenga la instancia registrada
        if(!instancia){
            return res.status(404).json({
                error : {
                    msg : `Este usuario no tiene la instancia ${host} registrada`
                }
            });
        }
        //Regresar instancia
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

let obtenerInstancias = async (req, res, next) => {
    //TODO
    //Opción para obtener ID desde el token
    let id = req.query.id;
    let host = req.query.h;
    //Verificar que el ID del usuario y de la instancia vengan en la petición
    if(!id || !host) {
        return res.status(400).json({
            error : {
                msg : 'El ID del usuario y de la instancia son necesarios'
            }
        });
    }
    try {
        //Busca hosts en la BD
        const instancias = await Instancia.findAll({
            where : {
                Usr_ID : id,
                Ins_ID : host
            }
        });
        //Regrsar dominios
        res.status(200).json({
            instancias
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

let crearInstancia = async (req, res, next) => {
    let body = req.body;
    //TODO
    //Verificar datos
    //Crear instancia en AWS
    //Evaluar respuesta
    //Sí
        //Cobrar al usuario
        //Guardar datos en base de datos
        //Regresar datos al usuario
        res.status(201).json({
            msg : `Post, crear uno`,
            obj : body
        });
    //No
        //Guardar datos en BD en caso de ser necesario
        //Regresar datos del error al usuario
        res.status(500).json({
            error : {
                msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor'
            }
        });
}

let modificarInstancia = async (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    //TODO
    //Verificar datos
    //Cobrar al usuario
    //Editar instancia en AWS
    //Evaluar respuesta
    //Sí
        //Cobrar al usuario en caso de ser necesario
        //Guardar datos en base de datos
        //Regresar datos al usuario
        //Regresar datos al usuario
        res.status(200).json({
            msg: `Put, Modificar uno`,
            obj : body,
            id
        });
    //No
        //Guardar datos en BD en caso de ser necesario
        //Regresar datos del error al usuario
        res.status(500).json({
            error : {
                msg : 'Error del sistema, intente de nuevo más tarde o comuníquese con un asesor'
            }
        });
}

let eliminarInstancia = async (req, res, next) => {
    //TODO
    //Opción para obtener el ID del token
    let id = req.params.id;
    let host = req.query.h;
    //Verifica que el ID del usuario y de la instancia vengan en la petición
    if(!id || !host){
        return res.status(400).json({
            error : {
                msg : 'El ID del usuario y de la instancia son necesarios'
            }
        });
    }
    //Eliminar instancia en AWS
    //Evaluar respuesta
    //Sí
        //Cobrar al usuario en caso de ser necesario
        try {
            //Busca el host del usuario
            const instancia = await Instancia.findOne({
                where: {
                    Usr_ID : id,
                    Ins_ID : host
                }
            });
            //Verifica que el usuario tenga el dominio registrado
            if(!instancia){ 
                return res.status(404).json({
                    error: {
                        msg : `Este usuario no tiene la instancia ${host} registrada`
                    }
                });
            }
            //Opción de eliminar físicamente instancia
            instancia.destroy();
            //TODO
            //Opción de eliminar lógicamente instancia
            //Se envía la respuesta
            res.status(200).send(`Instancia del usuario ${id} eliminada`);
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
    obtenerInstancia,
    obtenerInstancias,
    crearInstancia,
    modificarInstancia,
    eliminarInstancia
}