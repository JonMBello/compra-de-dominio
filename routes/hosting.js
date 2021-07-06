const router = require('express').Router();
const {
    obtenerHosting,
    obtenerHostings,
    registrarHosting,
    modificarHosting,
    eliminarHosting
} = require('../controllers/dominio');

router.get('/', obtenerHostings);
router.get('/:id', obtenerHosting);
router.post('/', registrarHosting);
router.put('/:id', modificarHosting);
router.delete('/:id', eliminarHosting);

module.exports = router;