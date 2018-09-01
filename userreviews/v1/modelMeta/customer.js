'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true
    },
    email:{
        type:sequelize.STRING,
        unique:{
            args:true,
            msg:"Sorry, that email address is already tied to an account"
        },
        primaryKey:true,
        validate:{
            isEmail: true, 
            // notNull: true
        },
         allowNull:false
    }
};

module.exports = modelMeta;