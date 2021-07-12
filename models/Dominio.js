let {DataTypes, Deferrable} = require('sequelize');
let {db} = require('../db');
const Usuario = require('./Usuario');

const Dominio = db.define('Dominio',{
    Usr_ID:{
        type : DataTypes.BIGINT,
        references : {
            // This is a reference to Usuario model
            model: Usuario,
            // This is the column name of the referenced model
            key: 'Usr_ID',
            // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Dom_Name:{
        type : DataTypes.STRING
    },
    Dom_Status:{
        type : DataTypes.STRING
    },
    Dom_Expires:{
        type : 'TIMESTAMP'
    },
    Dom_RenewDeadline:{
        type : 'TIMESTAMP'
    },
    Dom_TransferAwayEligibleAt:{
        type : 'TIMESTAMP'
    }
});

module.exports = Dominio;