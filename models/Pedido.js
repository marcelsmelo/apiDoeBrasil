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
        type: Sequelize.BOOLEAN
    },
    higienePessoal: {
        type: Sequelize.BOOLEAN
    },
    artigoLimpeza: {
        type: Sequelize.BOOLEAN
    },
    mascara: {
        type: Sequelize.BOOLEAN
    },
    observacoes:{
        type: Sequelize.STRING, 
        allowNull: true
    },
    status:{
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    removido:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removida')
        }
    }
}, { sequelize, modelName: 'pedido',  tableName: 'pedidos' });

Pedido.belongsTo(Usuario);


module.exports = Pedido;