let {DataTypes} = require('sequelize');
let {db} = require('../db');

const Usuario = db.define('Usuario', {
    Usr_NameFirst : {
        type : DataTypes.STRING
    },
    Usr_NameLast : {
        type : DataTypes.STRING
    },
    Usr_Address1 : {
        type : DataTypes.STRING
    },
    Usr_Address2 : {
        type : DataTypes.STRING
    },
    Usr_City : {
        type : DataTypes.STRING
    },
    Usr_Country : {
        type : DataTypes.STRING
    },
    Usr_PostalCode : {
        type : DataTypes.STRING
    },
    Usr_State : {
        type : DataTypes.STRING
    },
    Usr_Email : {
        type : DataTypes.STRING
    },
    Usr_Phone : {
        type : DataTypes.STRING
    }
});

module.exports = Usuario;