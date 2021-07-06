let obtenerDominio = (req, res, next) => {
    let id = req.params.id;
    //TODO
    //Buscar dominio en la base de datos
    //Regresar dominio
    res.status(200).json({
        msg : `Get, obtener uno`,
        id
    });
}

let obtenerDominios = (req, res, next) => {
    //TODO
    //Buscar dominios en la BD
    //Regresar dominios
    res.status(200).json({
        msg : `Get, obtener todos`,
        obj : []
    });
}

let registrarDominio = (req, res, next) => {
    let body = req.body;
    //TODO
    //Verificar datos
    //Enviar petición a GoDaddy
    //Evaluar respuesta
    //Cobrar al usuario
    //Regresar datos al usuario
    res.status(201).json({
        msg : `Post, crear uno`,
        obj : body
    })
}

let modificarDominio = (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    //TODO
    //Verificar datos
    //Enviar petición a GoDaddy
    //Evaluar respuesta
    //Regresar datos al usuario
    res.status(200).json({
        msg: `Put, Modificar uno`,
        obj : body,
        id
    })
}

let eliminarDominio = (req, res, next) => {
    let id = req.params.id;
    //TODO
    //Verificar datos
    //Enviar petición a GoDaddy
    //Evaluar respuesta
    //Regresar datos al usuario
    res.status(200).json({
        msg : `Delete, Eliminar uno`,
        id
    })
}

module.exports = {
    obtenerDominio,
    obtenerDominios,
    registrarDominio,
    modificarDominio,
    eliminarDominio
}