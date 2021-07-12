//TODO
//Modelo del Registro DNS
let {DataTypes, Deferrable} = require('sequelize');
let {db} = require('../db');
const Dominio = require('./Dominio');

const DnsRecord = db.define('DnsRecord',{
    Dom_ID:{
        type : DataTypes.BIGINT,
        references : {
            model: Dominio,
            key: 'Dom_ID',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Dns_Name:{
        type : DataTypes.STRING
    },
    Dns_Data:{
        type : DataTypes.STRING
    },
    Dns_Type:{
        type : DataTypes.STRING
    }
});

module.exports = DnsRecord;