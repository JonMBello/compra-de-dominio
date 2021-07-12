const router = require('express').Router();
const {
    obtenerInstancia,
    obtenerInstancias,
    crearInstancia,
    modificarInstancia,
    eliminarInstancia
} = require('../controllers/instancia');

router.get('/', obtenerInstancias);
router.get('/:id', obtenerInstancia);
router.post('/', crearInstancia);
router.put('/:id', modificarInstancia);
router.delete('/:id', eliminarInstancia);

module.exports = router;