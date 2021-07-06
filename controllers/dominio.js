let obtenerDominio = (req, res, next) => {
    let id = req.params.id;
    res.status(200).json({
        msg : `Get, obtener uno`,
        id
    });
}

let obtenerDominios = (req, res, next) => {
    res.status(200).json({
        msg : `Get, obtener todos`,
        obj : []
    });
}

let registrarDominio = (req, res, next) => {
    let body = req.body;
    res.status(201).json({
        msg : `Post, crear uno`,
        obj : body
    })
}

let modificarDominio = (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    res.status(200).json({
        msg: `Put, Modificar uno`,
        obj : body,
        id
    })
}

let eliminarDominio = (req, res, next) => {
    let id = req.params.id;
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