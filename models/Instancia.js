//TODO
//Modelo de la Instancia
let {DataTypes, Deferrable} = require('sequelize');
let {db} = require('../db');
const Usuario = require('./Usuario');

const Instancia = db.define('Instancia',{
    Usr_ID:{
        type : DataTypes.BIGINT,
        references : {
            model: Usuario,
            key: 'Usr_ID',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Ins_Name:{
        type : DataTypes.STRING
    },
    Ins_Status:{
        type : DataTypes.STRING
    },
    Ins_Expires:{
        type : 'TIMESTAMP'
    },
    Ins_RenewDeadline:{
        type : 'TIMESTAMP'
    }
});

module.exports = Instancia;