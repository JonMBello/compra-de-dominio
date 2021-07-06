let obtenerHosting = (req, res, next) => {
    let id = req.params.id;
    //TODO
    //Buscar hosting en BD
    //Regresar datos al usuario
    res.status(200).json({
        msg : `Get, obtener uno`,
        id
    });
}

let obtenerHostings = (req, res, next) => {
    //TODO
    //Buscar hostings en BD
    //Regresar datos al usuario
    res.status(200).json({
        msg : `Get, obtener todos`,
        obj : []
    });
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
    })
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
    })
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
    })
}

module.exports = {
    obtenerHosting,
    obtenerHostings,
    crearHosting,
    modificarHosting,
    eliminarHosting
}