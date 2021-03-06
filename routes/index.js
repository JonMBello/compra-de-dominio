var router = require('express').Router();

router.get('/', (req, res, next)=>{
  res.send('API del módulo de ventas de dominio y hosting');
});

router.use('/dominio', require('./dominio'));
router.use('/hosting', require('./hosting'));

module.exports = router;