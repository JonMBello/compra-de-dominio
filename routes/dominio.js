const router = require('express').Router();
const {validarJWT} = require('../middlewares/validar-jwt');
const {
    obtenerDominio,
    obtenerDominios,
    registrarDominio,
    modificarDominio,
    eliminarDominio
} = require('../controllers/dominio');

router.get('/', [validarJWT], obtenerDominios);
router.get('/:id', [validarJWT], obtenerDominio);
router.post('/', [validarJWT], registrarDominio);
router.put('/:id', modificarDominio);
router.delete('/:id', eliminarDominio);

module.exports = router;