const router = require('express').Router();
const {
    crearUsuario,
    iniciarSesion
} = require('../controllers/usuario');

router.post('/', crearUsuario);
router.post('/login', iniciarSesion);

module.exports = router;