var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const mercadopago = require("mercadopago");
var routes = require('./routes');
const {conectarBD} = require('./db');

// Objeto global de la app
var app = express();

// configuración de middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuración de mercado pago
mercadopago.configurations.setAccessToken(process.env.MP); 

//Conexión a base datos
conectarBD();

// Agregamos el código de nuestro router (routes/index.js)
app.use('/api/v1', routes);

// Manejando los errores 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Iniciando el servidor...
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Escuchando en el puerto ' + server.address().port);
});
