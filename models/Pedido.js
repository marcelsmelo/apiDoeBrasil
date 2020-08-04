const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');

const Pedido = sequelize.define('pedido', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    generoAlimenticio: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    higienePessoal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    artigoLimpeza: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    outros: {
        type: Sequelize.STRING,
        defaultValue: false
    },
    observacoes:{
        type: Sequelize.STRING, 
        allowNull: true
    },
    status:{
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    createdBy:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    finishedAt:{
        type: Sequelize.DATE,
        defaultValue: null
    },
    removed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removed')
        }
    }
}, { sequelize, modelName: 'pedido',  tableName: 'pedidos' });

Pedido.belongsTo(Usuario);

Pedido.belongsTo(Usuario,{
    as: 'parceiro',
    defaultValue: null
})


module.exports = Pedido;