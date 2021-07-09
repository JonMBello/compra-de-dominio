let obtenerDominio = async (req, res, next) => {
    //TODO
    //Opción para obtener el ID desde el token y el dominio desde la URL
    let id = req.params.id;
    let domain = req.query.d;
    //Verifica que el ID y el nombre de dominio vengan en la petición
    if(!id || !domain){
        return res.status(400).json({
            error : {
                msg : 'El ID del usuario y el nombre de dominio son necesarios'
            }
        });
    }
    try {
        //Busca el dominio del usuario
        const dominio = await Dominio.findOne({
            where: {
                id_usuario : id,
                domain
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
    //TODO
    //Opción para obtener ID desde el token
    let id = req.query.id;
    let domain = req.query.d;
    //Verifica que el ID y el nombre de dominio vengan en la petición
    if(!id || !domain){
        return res.status(400).json({
            error : {
                msg : 'El ID del usuario y el nombre de dominio son necesarios'
            }
        });
    }
    try {
        //Busca dominios en la BD
        const dominios = await Dominio.findAll({
            where: {
                id_usuario : id,
                domain
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
    let body = req.body;
    //TODO
    //Verificar datos
    //Enviar petición a GoDaddy
    //Evaluar respuesta
    //Sí
        //Guardar datos en BD
        //Cobrar al usuario
        //Regresar datos al usuario
        res.status(201).json({
            msg : `Post, crear uno`,
            obj : body
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