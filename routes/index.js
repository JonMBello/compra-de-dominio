var router = require('express').Router();

router.get('/', (req, res, next)=>{
  res.send('API del módulo de ventas de dominio y hosting');
});

router.use('/dns', require('./dnsRecord'));
router.use('/dominio', require('./dominio'));
router.use('/instancia', require('./instancia'));
router.use('/transaccion', require('./transaccion'));
router.use('/usuario', require('./usuario'));

module.exports = router;