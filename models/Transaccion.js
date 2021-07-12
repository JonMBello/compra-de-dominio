let {DataTypes, Deferrable} = require('sequelize');
let {db} = require('../db');
const Usuario = require('./Usuario');

const Transaccion = db.define('Transaccion',{
    Usr_ID : {
        type : DataTypes.BIGINT,
        references : {
            model: Usuario,
            key: 'Usr_ID',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Tra_Concept : {
        type : DataTypes.STRING
    },
    Tra_PaymentMethod : {
        type : DataTypes.STRING
    },
    Tra_Status : {
        type : DataTypes.STRING
    },
    Tra_Amount : {
        type : DataTypes.DOUBLE
    }
});

module.exports = Dominio;