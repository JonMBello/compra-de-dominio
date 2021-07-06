const router = require('express').Router();
const {
    obtenerDominio,
    obtenerDominios,
    registrarDominio,
    modificarDominio,
    eliminarDominio
} = require('../controllers/dominio');

router.get('/', obtenerDominios);
router.get('/:id', obtenerDominio);
router.post('/', registrarDominio);
router.put('/:id', modificarDominio);
router.delete('/:id', eliminarDominio);

module.exports = router;