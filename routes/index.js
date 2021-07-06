var router = require('express').Router();

router.get('/', (req, res, next)=>{
  res.send('API del módulo de ventas de dominio y hosting');
});

router.use('/ruta', require('./dominio'));

module.exports = router;