const router = require('express').Router();
const {
    obtenerHosting,
    obtenerHostings,
    crearHosting,
    modificarHosting,
    eliminarHosting
} = require('../controllers/hosting');

router.get('/', obtenerHostings);
router.get('/:id', obtenerHosting);
router.post('/', crearHosting);
router.put('/:id', modificarHosting);
router.delete('/:id', eliminarHosting);

module.exports = router;